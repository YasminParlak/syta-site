// Опросник: 3 вопроса с ветвлением второго.

const Quiz = {
  step: 0,             // текущий шаг: 0 = q1, 1 = q2, 2 = q3, 3 = результат
  answers: {},         // { q1: 'A', q2: 'A1', q3: 'A' }
  container: null,

  init() {
    this.container = document.getElementById('quizContainer');
    this.render();
  },

  render() {
    if (this.step === 0) return this.renderQ1();
    if (this.step === 1) return this.renderQ2();
    if (this.step === 2) return this.renderQ3();
    if (this.step === 3) return this.renderResult();
  },

  renderProgress() {
    const active = this.step; // 0,1,2
    return `
      <div class="quiz__progress">
        <div class="quiz__progress-step ${active >= 0 ? 'quiz__progress-step--active' : ''}"></div>
        <div class="quiz__progress-step ${active >= 1 ? 'quiz__progress-step--active' : ''}"></div>
        <div class="quiz__progress-step ${active >= 2 ? 'quiz__progress-step--active' : ''}"></div>
      </div>
    `;
  },

  renderQ1() {
    const q = QUIZ.q1;
    this.container.innerHTML = `
      ${this.renderProgress()}
      <h3 class="quiz__question">${q.text}</h3>
      <div class="quiz__options">
        ${q.options.map(opt => `
          <button class="quiz__option" data-value="${opt.key}">${opt.text}</button>
        `).join('')}
      </div>
    `;
    this.bindOptions((value) => {
      this.answers.q1 = value;
      this.step = 1;
      this.render();
    });
  },

  renderQ2() {
    const q = QUIZ.q2[this.answers.q1];
    this.container.innerHTML = `
      ${this.renderProgress()}
      <h3 class="quiz__question">${q.text}</h3>
      <div class="quiz__options">
        ${q.options.map(opt => `
          <button class="quiz__option" data-value="${opt.key}">${opt.text}</button>
        `).join('')}
      </div>
      <div class="quiz__nav">
        <button class="btn btn--ghost" id="quizBack">← Назад</button>
      </div>
    `;
    this.bindOptions((value) => {
      this.answers.q2 = value;
      this.step = 2;
      this.render();
    });
    document.getElementById('quizBack').addEventListener('click', () => {
      this.step = 0;
      this.render();
    });
  },

  renderQ3() {
    const q = QUIZ.q3;
    this.container.innerHTML = `
      ${this.renderProgress()}
      <h3 class="quiz__question">${q.text}</h3>
      <div class="quiz__options">
        ${q.options.map(opt => `
          <button class="quiz__option" data-value="${opt.key}">${opt.text}</button>
        `).join('')}
      </div>
      <div class="quiz__nav">
        <button class="btn btn--ghost" id="quizBack">← Назад</button>
      </div>
    `;
    this.bindOptions((value) => {
      this.answers.q3 = value;
      this.step = 3;
      this.render();
    });
    document.getElementById('quizBack').addEventListener('click', () => {
      this.step = 1;
      this.render();
    });
  },

  renderResult() {
    const result = QUIZ.results[this.answers.q1];
    const items = Recommendations.compute(this.answers);

    this.container.innerHTML = `
      <div class="quiz-result">
        <h3 class="quiz-result__title">${result.title}</h3>
        <p class="quiz-result__text">${result.text}</p>
        <div class="quiz-result__items">
          ${items.map(item => this.renderResultCard(item)).join('')}
        </div>
        <button class="btn btn--primary btn--block" id="quizRestart">Пройти ещё раз</button>
      </div>
    `;

    document.getElementById('quizRestart').addEventListener('click', () => {
      this.restart();
    });

    // Кнопки «В корзину» в карточках рекомендаций
    this.container.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener('click', () => {
        Cart.add(Number(btn.dataset.id));
      });
    });
  },

  renderResultCard(item) {
    const fmt = MenuData.formatValue;
    return `
      <article class="menu-card">
        <img class="menu-card__image" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="menu-card__body">
          <h3 class="menu-card__title">${item.name}</h3>
          <div class="menu-card__kpi">
            <span class="menu-card__kpi-item">${fmt(item.weight, 'г')}</span>
            <span class="menu-card__kpi-item">${fmt(item.kcal, 'ккал')}</span>
            <span class="menu-card__kpi-item">Б ${fmt(item.proteins, 'г')}</span>
          </div>
          <div class="menu-card__footer">
            <span class="menu-card__price">${MenuData.formatPrice(item.price)}</span>
            <button class="btn btn--primary btn--sm" data-action="add-to-cart" data-id="${item.id}">В корзину</button>
          </div>
        </div>
      </article>
    `;
  },

  bindOptions(callback) {
    this.container.querySelectorAll('.quiz__option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.quiz__option').forEach(b => b.classList.remove('quiz__option--selected'));
        btn.classList.add('quiz__option--selected');
        // Небольшая задержка для визуального отклика
        setTimeout(() => callback(btn.dataset.value), 180);
      });
    });
  },

  restart() {
    this.step = 0;
    this.answers = {};
    this.render();
  }
};