// Рендер меню: карточки, табы, модалка.

const Menu = {
  currentCategory: 'all',

  init() {
    this.renderTabs();
    this.renderGrid();
    this.bindTabs();
  },

  renderTabs() {
    // Табы уже в HTML — ничего не делаем
  },

  bindTabs() {
    const tabs = document.querySelectorAll('#categoryTabs .tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('tab--active'));
        tab.classList.add('tab--active');
        this.currentCategory = tab.dataset.category;
        this.renderGrid();
      });
    });
  },

 renderGrid() {
    const grid = document.getElementById('menuGrid');
    const items = this.currentCategory === 'all'
      ? MenuData.getAll()
      : MenuData.getByCategory(this.currentCategory);

    grid.innerHTML = items.map(item => this.renderCard(item)).join('');

    // Навешиваем обработчики
    grid.querySelectorAll('[data-action="details"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(btn.dataset.id);
        this.openModal(id);
      });
    });

    grid.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        Cart.add(id);
        this.renderGrid(); // Перерисовываем меню после добавления
      });
    });

    grid.querySelectorAll('[data-action="inc"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        Cart.add(id);
        this.renderGrid();
      });
    });

    grid.querySelectorAll('[data-action="dec"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        Cart.changeQty(id, -1);
        this.renderGrid();
      });
    });
  },

   renderCard(item) {
    const fmt = MenuData.formatValue;
    const inCart = Cart.items[item.id] || 0;
    
    const actionsHtml = inCart > 0 ? `
      <div class="menu-card__qty-controls">
        <button class="menu-card__qty-btn" data-action="dec" data-id="${item.id}">−</button>
        <span class="menu-card__qty">${inCart}</span>
        <button class="menu-card__qty-btn" data-action="inc" data-id="${item.id}">+</button>
      </div>
    ` : `
      <button class="btn btn--primary btn--sm" data-action="add-to-cart" data-id="${item.id}">В корзину</button>
    `;
    
    return `
      <article class="menu-card">
        <img class="menu-card__image" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="menu-card__body">
          <h3 class="menu-card__title">${item.name}</h3>
          <div class="menu-card__kpi">
            <span class="menu-card__kpi-item">${fmt(item.weight, 'г')}</span>
            <span class="menu-card__kpi-item">${fmt(item.kcal, 'ккал')}</span>
            <span class="menu-card__kpi-item">Б ${fmt(item.proteins, 'г')}</span>
            <span class="menu-card__kpi-item">Ж ${fmt(item.fats, 'г')}</span>
            <span class="menu-card__kpi-item">У ${fmt(item.carbs, 'г')}</span>
          </div>
          <div class="menu-card__footer">
            <span class="menu-card__price">${MenuData.formatPrice(item.price)}</span>
            <div class="menu-card__actions">
              <button class="btn btn--ghost btn--sm" data-action="details" data-id="${item.id}">Подробнее</button>
              ${actionsHtml}
            </div>
          </div>
        </div>
      </article>
    `;
  },

  openModal(id) {
    const item = MenuData.getById(id);
    if (!item) return;

    const fmt = MenuData.formatValue;
    const body = document.getElementById('modalBody');
    body.innerHTML = `
      <img class="modal__image" src="${item.image}" alt="${item.name}">
      <h3 class="modal__title">${item.name}</h3>
      <p class="modal__desc">${item.description}</p>
      <div class="modal__kpi">
        <div class="modal__kpi-item">
          <span class="modal__kpi-label">Вес</span>
          <span class="modal__kpi-value">${fmt(item.weight, 'г')}</span>
        </div>
        <div class="modal__kpi-item">
          <span class="modal__kpi-label">Калорийность</span>
          <span class="modal__kpi-value">${fmt(item.kcal, 'ккал')}</span>
        </div>
        <div class="modal__kpi-item">
          <span class="modal__kpi-label">Белки</span>
          <span class="modal__kpi-value">${fmt(item.proteins, 'г')}</span>
        </div>
        <div class="modal__kpi-item">
          <span class="modal__kpi-label">Жиры</span>
          <span class="modal__kpi-value">${fmt(item.fats, 'г')}</span>
        </div>
        <div class="modal__kpi-item">
          <span class="modal__kpi-label">Углеводы</span>
          <span class="modal__kpi-value">${fmt(item.carbs, 'г')}</span>
        </div>
        <div class="modal__kpi-item">
          <span class="modal__kpi-label">Цена</span>
          <span class="modal__kpi-value">${MenuData.formatPrice(item.price)}</span>
        </div>
      </div>
      <button class="btn btn--primary btn--block" data-action="add-to-cart" data-id="${item.id}">
        Добавить в корзину
      </button>
    `;

    body.querySelector('[data-action="add-to-cart"]').addEventListener('click', () => {
      Cart.add(id);
      this.renderGrid(); // Обновляем меню
      Modal.close();
    });

   const nav = document.getElementById('nav');
    this.menuWasOpen = nav.classList.contains('nav--open');
    if (this.menuWasOpen) {
      nav.classList.remove('nav--open');
    }

    // Настраиваем восстановление меню при закрытии модалки
    Modal.onBeforeClose = () => {
      if (this.menuWasOpen) {
        nav.classList.add('nav--open');
      }
    };

    Modal.open();
  }
};

// Простая модалка
const Modal = {
  el: document.getElementById('itemModal'),
  onBeforeClose: null, // хук для восстановления состояния меню

  open() {
    this.el.hidden = false;
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (this.onBeforeClose) this.onBeforeClose();
    this.el.hidden = true;
    document.body.style.overflow = '';
  },

  init() {
    this.el.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => this.close());
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.el.hidden) this.close();
    });
  }
};