// Данные меню — единый источник правды.
// Все цены пересчитаны: закупочная × 1.15, округлено до целого.
// Если характеристика неизвестна — null (на фронте отображается как «Уточняется»).

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Куриный суп',
    category: 'soups', // soups | mains | snacks
    weight: 300,
    kcal: 270,
    proteins: 12,
    fats: 18,
    carbs: 15,
    purchasePrice: 215,
    price: 247,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
    description: 'Классический куриный суп с овощами и зеленью.'
  },
  {
    id: 2,
    name: 'Харчо',
    category: 'soups',
    weight: 300,
    kcal: 318,
    proteins: 15,
    fats: 18,
    carbs: 24,
    purchasePrice: 220,
    price: 253,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600',
    description: 'Густой мясной суп с рисом и специями.'
  },
  {
    id: 3,
    name: 'Солянка',
    category: 'soups',
    weight: 300,
    kcal: 309,
    proteins: 15,
    fats: 21,
    carbs: 15,
    purchasePrice: 235,
    price: 270,
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4f6be00?w=600',
    description: 'Солянка с мясным ассорти, оливками и лимоном.'
  },
  {
    id: 4,
    name: 'Борщ',
    category: 'soups',
    weight: 300,
    kcal: 189,
    proteins: 12,
    fats: 9,
    carbs: 15,
    purchasePrice: 220,
    price: 253,
    image: 'https://images.unsplash.com/photo-1583608564779-89ec0d3b29c9?w=600',
    description: 'Традиционный борщ со свёклой и говядиной.'
  },
  {
    id: 5,
    name: 'Плов с курицей',
    category: 'mains',
    weight: 250,
    kcal: 425,
    proteins: 15,
    fats: 15,
    carbs: 52,
    purchasePrice: 210,
    price: 242,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600',
    description: 'Рассыпчатый плов с курицей и специями.'
  },
  {
    id: 6,
    name: 'Говядина с гречкой',
    category: 'mains',
    weight: 250,
    kcal: 375,
    proteins: 20,
    fats: 15,
    carbs: 42,
    purchasePrice: 230,
    price: 265,
    image: 'https://images.unsplash.com/photo-1604908177021-29e7e0a3f2f6?w=600',
    description: 'Тушёная говядина с рассыпчатой гречкой.'
  },
  {
    id: 7,
    name: 'Курица с гречкой',
    category: 'mains',
    weight: null, // Уточняется
    kcal: 385,
    proteins: 17.5,
    fats: 15,
    carbs: 45,
    purchasePrice: 229,
    price: 263,
    image: 'https://images.unsplash.com/photo-1598515213692-d01e7a087c10?w=600',
    description: 'Куриное филе с гречневой кашей.'
  },
  {
    id: 8,
    name: 'Свинина с гречкой',
    category: 'mains',
    weight: 250,
    kcal: 395,
    proteins: 17.5,
    fats: 17.5,
    carbs: 42,
    purchasePrice: 224,
    price: 258,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
    description: 'Свинина с гречневой кашей.'
  },
  {
    id: 9,
    name: 'Макароны по-флотски',
    category: 'mains',
    weight: null, // Уточняется
    kcal: null,   // Уточняется (расчётное 526 ккал не подтверждено)
    proteins: 20,
    fats: 22,
    carbs: 62,
    purchasePrice: 240,
    price: 276,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600',
    description: 'Макароны с мясным фаршем.'
  },
  {
    id: 10,
    name: 'Говядина с гороховой кашей',
    category: 'mains',
    weight: null, // Уточняется
    kcal: 355,
    proteins: 22,
    fats: 15,
    carbs: 32,
    purchasePrice: 220,
    price: 253,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600',
    description: 'Тушёная говядина с гороховой кашей.'
  },
  {
    id: 11,
    name: 'Мясные чипсы',
    category: 'snacks',
    weight: 50,
    kcal: null,   // Уточняется
    proteins: 15,
    fats: null,   // Уточняется
    carbs: null,  // Уточняется
    purchasePrice: 200,
    price: 230,
    image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600',
    description: 'Запечённые мясные чипсы.'
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