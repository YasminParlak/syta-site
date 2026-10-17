// Корзина: добавление, удаление, изменение количества, подсчёт суммы.
// Данные хранятся в localStorage, чтобы пережить перезагрузку.

const Cart = {
  STORAGE_KEY: 'bk_cart',
  items: {}, // { itemId: quantity }

  init() {
    this.load();
    this.render();
  },

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.items = raw ? JSON.parse(raw) : {};
    } catch (e) {
      this.items = {};
    }
  },

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
  },

  add(itemId) {
    this.items[itemId] = (this.items[itemId] || 0) + 1;
    this.save();
    this.render();
  },

  remove(itemId) {
    delete this.items[itemId];
    this.save();
    this.render();
  },

  changeQty(itemId, delta) {
    const newQty = (this.items[itemId] || 0) + delta;
    if (newQty <= 0) {
      this.remove(itemId);
      return;
    }
    this.items[itemId] = newQty;
    this.save();
    this.render();
  },

  clear() {
    this.items = {};
    this.save();
    this.render();
  },

  getTotalCount() {
    return Object.values(this.items).reduce((sum, q) => sum + q, 0);
  },

  getTotalPrice() {
    return Object.entries(this.items).reduce((sum, [id, qty]) => {
      const item = MenuData.getById(Number(id));
      return sum + (item ? item.price * qty : 0);
    }, 0);
  },

    render() {
    // Счётчик в навигации
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = this.getTotalCount();

    const container = document.getElementById('cartContainer');
    const ids = Object.keys(this.items);

    if (ids.length === 0) {
      container.innerHTML = '<p class="cart__empty">Корзина пуста. Выберите блюда в меню.</p>';
      return;
    }

    const rows = ids.map(id => {
      const item = MenuData.getById(Number(id));
      if (!item) return '';
      const qty = this.items[id];
      return `
        <div class="cart-item">
          <img class="cart-item__image" src="${item.image}" alt="${item.name}">
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__price">${MenuData.formatPrice(item.price)} × ${qty} = ${MenuData.formatPrice(item.price * qty)}</div>
            <div class="cart-item__controls">
              <button class="cart-item__qty-btn" data-action="dec" data-id="${item.id}">−</button>
              <span class="cart-item__qty">${qty}</span>
              <button class="cart-item__qty-btn" data-action="inc" data-id="${item.id}">+</button>
              <button class="cart-item__remove" data-action="remove" data-id="${item.id}" aria-label="Удалить">×</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const total = this.getTotalPrice();

    container.innerHTML = `
      <div class="cart-list">${rows}</div>
      <div class="cart-summary">
        <div class="cart-summary__row">
          <span>Позиций</span>
          <span>${this.getTotalCount()}</span>
        </div>
        <div class="cart-summary__row cart-summary__row--total">
          <span>Итого</span>
          <span>${MenuData.formatPrice(total)}</span>
        </div>
        <button class="btn btn--primary btn--block" id="checkoutBtn">Оформить заказ</button>
        <p style="font-size:12px;color:var(--color-text-muted);text-align:center;margin-top:10px;">
          Демонстрационный режим. Оплата не производится.
        </p>
      </div>
    `;

    // Обработчики
    container.querySelectorAll('[data-action="inc"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.changeQty(Number(btn.dataset.id), +1);
        Menu.renderGrid(); // Обновляем меню
      });
    });
    container.querySelectorAll('[data-action="dec"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.changeQty(Number(btn.dataset.id), -1);
        Menu.renderGrid();
      });
    });
    container.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.remove(Number(btn.dataset.id));
        Menu.renderGrid();
      });
    });
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      alert('Заказ оформлен (демонстрационный режим).\n\nСпасибо! В реальной версии здесь будет переход к оплате.');
      this.clear();
      Menu.renderGrid();
    });
  },
};