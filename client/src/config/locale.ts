export const ruLocaleRelative = {
  name: "ru",
  weekdays:
    "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split("_"),
  weekdaysShort: "Вск_Пнд_Втр_Срд_Чтв_Птн_Сбт".split("_"),
  weekdaysMin: "Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
  months:
    "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split(
      "_",
    ),
  monthsShort: "Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек".split("_"),
  ordinal: (n) => `${n}-е`,
  relativeTime: {
    future: "через %s",
    past: "%s назад",
    s: "несколько секунд",
    m: "минуту",
    mm: "%d минут",
    h: "час",
    hh: "%d часов",
    d: "день",
    dd: "%d дней",
    M: "месяц",
    MM: "%d месяцев",
    y: "год",
    yy: "%d лет",
  },
  weekStart: 1,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY г.",
    LLL: "D MMMM YYYY г., HH:mm",
    LLLL: "dddd, D MMMM YYYY г., HH:mm",
  },
};
