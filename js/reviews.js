// Демо-отзывы. Помечены как примеры.

const Reviews = {
  items: [
    {
      author: 'Анна К.',
      date: '12 октября 2026',
      rating: 5,
      text: 'Удобно, что можно быстро взять горячий обед между встречами. Борщ — как у бабушки!'
    },
    {
      author: 'Дмитрий П.',
      date: '8 октября 2026',
      rating: 5,
      text: 'Плов с курицей — сытно и вкусно. Автомат стоит прямо в бизнес-центре, очень удобно.'
    },
    {
      author: 'Мария С.',
      date: '3 октября 2026',
      rating: 4,
      text: 'Харчо понравился, порция хорошая. Хотелось бы больше вариантов вегетарианских блюд.'
    }
  ],

  init() {
    const grid = document.getElementById('reviewsGrid');
    grid.innerHTML = this.items.map(r => `
      <article class="review-card">
        <div class="review-card__header">
          <span class="review-card__author">${r.author}</span>
          <span class="review-card__date">${r.date}</span>
        </div>
        <div class="review-card__rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <p class="review-card__text">${r.text}</p>
      </article>
    `).join('');
  }
};