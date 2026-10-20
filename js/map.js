// Демо-карта: SVG-макет с условными точками.

const Map = {
  points: [
    { id: 1, x: 20, y: 30, label: 'БЦ «Центральный», автомат №001' },
    { id: 2, x: 55, y: 20, label: 'ТЦ «Галерея», автомат №002' },
    { id: 3, x: 75, y: 55, label: 'БЦ «Северный», автомат №003' },
    { id: 4, x: 35, y: 70, label: 'Университет, автомат №004' }
  ],

  init() {
    const container = document.getElementById('map');
    container.innerHTML = `
      <svg class="map__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Схема расположения автоматов">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" stroke-width="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)"/>
        <path d="M 5 50 Q 30 30 50 50 T 95 50" stroke="#82ad51" stroke-width="0.8" fill="none" opacity="0.4"/>
        <path d="M 50 5 Q 40 40 50 60 T 50 95" stroke="#82ad51" stroke-width="0.8" fill="none" opacity="0.4"/> 
        ${this.points.map(p => `
        <g class="map__point" data-id="${p.id}" data-label="${p.label}">
          <circle cx="${p.x}" cy="${p.y}" r="3" fill="#82ad51" opacity="0.25"/>
          <circle cx="${p.x}" cy="${p.y}" r="1.6" fill="#82ad51"/>
          <circle cx="${p.x}" cy="${p.y}" r="0.6" fill="white"/>
        </g>
       `).join('')}
      </svg>
      <div class="map__legend" id="mapLegend">Нажмите на точку, чтобы увидеть адрес</div>
    `;

    container.querySelectorAll('.map__point').forEach(g => {
      g.addEventListener('click', () => {
        document.getElementById('mapLegend').textContent = g.dataset.label;
      });
    });
  }
};