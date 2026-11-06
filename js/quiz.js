// Опросник: 3 вопроса с ветвлением второго.
// Карточки в результате = копия карточек меню (Menu.renderCard) + модалка (Menu.openModal).

const Quiz = {
  step: 0,             // 0 = q1, 1 = q2, 2 = q3, 3 = результат
  answers: {},         // { q1: 'A', q2: 'A1', q3: 'A' }
  container: null,

  init() {
    this.container = document.getElementById('quizContainer');
    this.bindDelegation();   // одно делегирование на весь срок жизни контейнера
    this.render();
  },

  // Ловит клики по кнопкам с data-action внутри контейнера опроса.
  bindDelegation() {
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      const id = Number(btn.dataset.id);
      let cartChanged = false;

      switch (action) {
        case 'details':
          Menu.openModal(id);          // открывает модалку со слайдером
          return;                      // корзину не меняли — перерисовка не нужна

        case 'add-to-cart':
          Cart.add(id);
          cartChanged = true;
          break;

        case 'inc':
          Cart.changeQty(id, 1);       // используем твой метод из cart.js
          cartChanged = true;
          break;

        case 'dec':
          Cart.changeQty(id, -1);      // используем твой метод из cart.js
          cartChanged = true;
          break;

        case 'restart':
          this.restart();
          return;

        default:
          return;
      }

      // Если корзину изменили, перерисовываем результат, 
      // чтобы контроллер «− 1 +» обновился (как в главном меню)
      if (cartChanged && this.step === 3) {
        this.renderResult();
      }
    });
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

  // Результат: карточки рисует Menu.renderCard — 1:1 как в меню
  renderResult() {
    const result = QUIZ.results[this.answers.q1];
    const items = Recommendations.compute(this.answers);

    this.container.innerHTML = `
      <div class="quiz-result">
        <h3 class="quiz-result__title">${result.title}</h3>
        <p class="quiz-result__text">${result.text}</p>
        <div class="quiz-result__items">
          ${items.map(item => Menu.renderCard(item)).join('')}
        </div>
        <button class="btn btn--primary btn--block" data-action="restart">Пройти ещё раз</button>
      </div>
    `;

    // Оживляем слайдеры внутри карточек результата (свайп + точки)
    initSliders(this.container);
  },

  bindOptions(callback) {
    this.container.querySelectorAll('.quiz__option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.quiz__option').forEach(b => b.classList.remove('quiz__option--selected'));
        btn.classList.add('quiz__option--selected');
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
