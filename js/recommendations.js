// Алгоритм подбора блюд по ответам опросника.
// Работает по таблице правил из ТЗ.

const Recommendations = {
  // Группировка вариантов q2 по типу предпочтения
  q2Groups: {
    hot:      ['A3', 'B1', 'C3', 'D3'], // горячая еда
    familiar: ['A1', 'B3', 'D1'],       // привычный вариант
    hearty:   ['A2', 'B2', 'C1', 'C2', 'D2'], // сытный обед
    free:     ['A4', 'B4', 'C4', 'D4']  // свободный выбор
  },

  // Блюда-кандидаты по группе предпочтения (приоритетные)
  candidatesByGroup: {
    hot:      [1, 4, 2],   // Куриный суп, Борщ, Харчо
    familiar: [7, 5],      // Курица с гречкой, Плов с курицей
    hearty:   [6, 10, 8],  // Говядина с гречкой, Говядина с гороховой, Свинина с гречкой
    free:     [5, 1, 8, 4, 7, 6] // разнообразная подборка
  },

  /**
   * Подбирает 3 блюда по ответам пользователя.
   * @param {Object} answers - { q1: 'A', q2: 'A1', q3: 'A' }
   * @returns {Array} массив из 3 объектов блюд
   */
  compute(answers) {
    const { q1, q2, q3 } = answers;

    // 1. Определяем группу предпочтения по q2
    let group = 'free';
    for (const [grp, keys] of Object.entries(this.q2Groups)) {
      if (keys.includes(q2)) { group = grp; break; }
    }

    // 2. Берём кандидатов
    let pool = this.candidatesByGroup[group].map(id => MenuData.getById(id)).filter(Boolean);

    // 3. Корректировка по q3
    pool = this.adjustByQ3(pool, q3);

    // 4. Убираем блюда с неподтверждёнными характеристиками,
    // если они критичны для данной рекомендации
    pool = this.filterUnconfirmed(pool, q3);

    // 5. Если кандидатов меньше 3 — дополняем из общего меню
    if (pool.length < 3) {
      pool = this.fillFromMenu(pool, 3);
    }

    // 6. Берём первые 3
    return pool.slice(0, 3);
  },

  /**
   * Корректирует порядок/состав списка в зависимости от q3.
   */
  adjustByQ3(pool, q3) {
    const arr = [...pool];

    switch (q3) {
      case 'A': // полноценная еда — предпочитаем вторые блюда
        arr.sort((a, b) => {
          const aMain = a.category === 'mains' ? 0 : 1;
          const bMain = b.category === 'mains' ? 0 : 1;
          return aMain - bMain;
        });
        break;

      case 'B': // белок — сортируем по убыванию белка
        arr.sort((a, b) => (b.proteins || 0) - (a.proteins || 0));
        break;

      case 'C': // сытость — предпочитаем вторые с гарниром (mains)
        arr.sort((a, b) => {
          const aMain = a.category === 'mains' ? 0 : 1;
          const bMain = b.category === 'mains' ? 0 : 1;
          return aMain - bMain;
        });
        break;

      case 'D': // экономия — сортируем по цене
        arr.sort((a, b) => a.price - b.price);
        break;
    }

    return arr;
  },

  /**
   * Фильтрует блюда с неподтверждёнными характеристиками,
   * если они критичны для текущей рекомендации.
   */
  filterUnconfirmed(pool, q3) {
    if (q3 === 'B') {
      // Для белковой рекомендации убираем блюда без подтверждённого белка
      return pool.filter(item => item.proteins !== null);
    }
    // Для остальных — не исключаем жёстко, но отдаём приоритет подтверждённым
    return pool;
  },

  /**
   * Дополняет подборку блюдами из общего меню, если кандидатов мало.
   */
  fillFromMenu(pool, targetCount) {
    const usedIds = new Set(pool.map(item => item.id));
    const all = MenuData.getAll();

    // Сортируем по цене, чтобы добирать бюджетными вариантами
    const extras = all
      .filter(item => !usedIds.has(item.id))
      .sort((a, b) => a.price - b.price);

    return [...pool, ...extras].slice(0, targetCount);
  }
};