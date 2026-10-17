// Главный файл: инициализация, навигация, обработка URL-параметров.

const App = {
  init() {
    // Инициализируем модули
    Modal.init();
    Menu.init();
    Quiz.init();
    Cart.init();
    Reviews.init();
    Map.init();

    // Мобильное меню
    this.initNav();

    // Плавная прокрутка + закрытие меню
    this.initSmoothScroll();

    // Читаем ?machine= из URL (подготовка под QR)
    this.readMachineParam();

    console.log('Business Key: сайт инициализирован');
  },

 initNav() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    burger.addEventListener('click', () => nav.classList.toggle('nav--open'));
    // Меню НЕ закрывается при клике по ссылкам — только по повторному клику на бургер
  },

   initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        
        // Закрываем меню, если оно открыто
        const nav = document.getElementById('nav');
        const menuWasOpen = nav.classList.contains('nav--open');
        if (menuWasOpen) {
          nav.classList.remove('nav--open');
        }
        
        // Прокручиваем с задержкой, чтобы меню успело закрыться
        setTimeout(() => {
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }, menuWasOpen ? 300 : 0);
      });
    });
  },

  /**
   * Читаем ?machine=001 из URL.
   * В будущей версии это будет идентификатор автомата из QR-кода.
   */
  readMachineParam() {
    const params = new URLSearchParams(window.location.search);
    const machine = params.get('machine');
    if (machine) {
      console.log(`Сайт открыт с автомата: ${machine}`);
      // В будущем: показать пользователю, какой автомат он сканировал,
      // и ограничить меню блюдами, доступными именно в этом автомате.
    }
  }
};

// Запуск
document.addEventListener('DOMContentLoaded', () => App.init());