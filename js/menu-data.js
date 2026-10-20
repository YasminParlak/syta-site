// Данные меню — единый источник правды.
// Все цены пересчитаны: закупочная × 1.15, округлено до целого.
// Если характеристика неизвестна — null (на фронте отображается как «Уточняется»).

const MENU_ITEMS = [
    {
    id: 1,
    name: "Суп-лапша с курицей",
    category: "soups",
    weight: 300,
    kcal: 270,
    proteins: 12,
    fats: 18,
    carbs: 15,
    purchasePrice: 215,
    price: 320,
    images: ["assets/images/soup-chicken-1.jpg", "assets/images/soup-chicken-2.jpg"],
    description: "Наваристый куриный суп с домашней лапшой, картофелем и морковью."
  },
  {
    id: 2,
    name: "Харчо",
    category: "soups",
    weight: 300,
    kcal: 318,
    proteins: 15,
    fats: 18,
    carbs: 24,
    purchasePrice: 220,
    price: 320,
    images: ["assets/images/kharcho-1.jpg", "assets/images/kharcho-2.jpg"],
    description: "Острая грузинская харчо с говядиной, рисом и чесноком."
  },
  {
    id: 3,
    name: "Солянка сборная мясная",
    category: "soups",
    weight: 300,
    kcal: 309,
    proteins: 15,
    fats: 21,
    carbs: 15,
    purchasePrice: 235,
    price: 320,
    images: ["assets/images/solyanka-1.jpg", "assets/images/solyanka-2.jpg"],
    description: "Классическая мясная солянка с солёными огурцами, беконом и оливками."
  },
  {
    id: 4,
    name: "Борщ кубанский",
    category: "soups",
    weight: 300,
    kcal: 189,
    proteins: 12,
    fats: 9,
    carbs: 15,
    purchasePrice: 220,
    price: 320,
    images: ["assets/images/borsch-1.jpg", "assets/images/borsch-2.jpg"],
    description: "Традиционный кубанский борщ со свёклой, капустой и говядиной."
  },
  {
    id: 5,
    name: "Плов с курицей",
    category: "mains",
    weight: 250,
    kcal: 428,
    proteins: 15,
    fats: 18,
    carbs: 53,
    purchasePrice: 210,
    price: 320,
    images: ["assets/images/plov-chicken-1.jpg", "assets/images/plov-chicken-2.jpg"],
    description: "Рассыпчатый плов с курицей, морковью и специями."
  },
  {
    id: 6,
    name: "Говядина с гречкой",
    category: "mains",
    weight: 250,
    kcal: 385,
    proteins: 20,
    fats: 15,
    carbs: 43,
    purchasePrice: 230,
    price: 320,
    images: ["assets/images/beef-buckwheat-1.jpg", "assets/images/beef-buckwheat-2.jpg"],
    description: "Тушёная говядина с гречневой кашей, луком и морковью."
  },
  {
    id: 7,
    name: "Курица с гречкой",
    category: "mains",
    weight: 250,
    kcal: 385,
    proteins: 18,
    fats: 15,
    carbs: 45,
    purchasePrice: 195,
    price: 320,
    images: ["assets/images/chicken-buckwheat-1.jpg", "assets/images/chicken-buckwheat-2.jpg"],
    description: "Нежная курица с гречкой в насыщенном бульоне."
  },
  {
    id: 8,
    name: "Свинина с гречкой",
    category: "mains",
    weight: 250,
    kcal: 398,
    proteins: 18,
    fats: 18,
    carbs: 43,
    purchasePrice: 190,
    price: 320,
    images: ["assets/images/pork-buckwheat-1.jpg", "assets/images/pork-buckwheat-2.jpg"],
    description: "Сочная свинина с гречневой кашей и овощами."
  },
  {
    id: 9,
    name: "Макароны по-флотски с курицей",
    category: "mains",
    weight: 250,
    kcal: 520,
    proteins: 20,
    fats: 20,
    carbs: 65,
    purchasePrice: 220,
    price: 320,
    images: ["assets/images/pasta-flotski-1.jpg", "assets/images/pasta-flotski-2.jpg"],
    description: "Любимые макароны по-флотски с кусочками курицы."
  },
  {
    id: 10,
    name: "Говядина с гороховой кашей",
    category: "mains",
    weight: 250,
    kcal: 355,
    proteins: 23,
    fats: 15,
    carbs: 33,
    purchasePrice: 180,
    price: 320,
    images: ["assets/images/beef-pea-1.jpg", "assets/images/beef-pea-2.jpg"],
    description: "Тушёная говядина с нежной гороховой кашей."
  },
  {
    id: 11,
    name: "Чипсы свиные классические",
    category: "snacks",
    weight: 50,
    kcal: 160,
    proteins: 22,
    fats: 15,
    carbs: 0,
    purchasePrice: 200,
    price: 320,
    images: ["assets/images/chips-1.jpg", "assets/images/chips-2.jpg"],
    description: "Хрустящие вяленые чипсы из нежирной свинины."
  }
];

// Справочник категорий
const CATEGORIES = {
  soups:  { id: 'soups',  title: 'Супы' },
  mains:  { id: 'mains',  title: 'Вторые блюда' },
  snacks: { id: 'snacks', title: 'Перекусы' }
};

// Вспомогательные функции для работы с данными меню
const MenuData = {
  getAll: () => MENU_ITEMS,
  getById: (id) => MENU_ITEMS.find(item => item.id === id),
  getByCategory: (category) => MENU_ITEMS.filter(item => item.category === category),
  formatValue: (value, unit = '') => {
    if (value === null || value === undefined) return 'Уточняется';
    return value + (unit ? ' ' + unit : '');
  },
  formatPrice: (price) => price + ' ₽'
};