import Vue from "./vue.esm.browser.js";

/** URL адрес API */
const API_URL = "https://course-vue.javascript.ru/api";

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

function getMeetupByIDLink(id) {
  return `${API_URL}/meetups/${id}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: "Регистрация",
  opening: "Открытие",
  break: "Перерыв",
  coffee: "Coffee Break",
  closing: "Закрытие",
  afterparty: "Afterparty",
  talk: "Доклад",
  other: "Другое"
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: "key",
  opening: "cal-sm",
  talk: "tv",
  break: "clock",
  coffee: "coffee",
  closing: "key",
  afterparty: "cal-sm",
  other: "cal-sm"
};

export const app = new Vue({
  el: "#app",

  data() {
    return {
      rawMeetup: null
    };
  },

  mounted() {
    this.getMeetupData();
  },

  computed: {
    meetup() {
      if (!this.rawMeetup) {
        return null;
      }

      return {
        ...this.rawMeetup,
        localDate: new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        dateOnlyString: new Date(this.rawMeetup.date).toISOString().split("T")[0],
        coverStyle: this.rawMeetup.imageId
          ? {
            "--bg-url": `url(${getMeetupCoverLink(this.rawMeetup)})`
          }
          : undefined,
        agenda: this.rawMeetup.agenda.map((agenda) => ({
          ...agenda,
          imageSrc: `/assets/icons/icon-${this.getAgendaItemIcons(agenda.type)}.svg`
        }))
      };
    }
  },

  methods: {
    getMeetupData() {
      fetch(getMeetupByIDLink(MEETUP_ID))
        .then((response) => response.json())
        .then((data) => (this.rawMeetup = data))
        .catch(this.errorHandler);
    },
    errorHandler(e) {
      console.log(e);
    },
    getAgendaItemTitles(type) {
      return agendaItemTitles[type];
    },
    getAgendaItemIcons(type) {
      return agendaItemIcons[type];
    }
  }
});
