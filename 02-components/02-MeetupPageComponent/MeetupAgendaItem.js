import { agendaItemIcons, agendaItemTitles } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="imageSrc" />
      </div>
      <div class="meetup-agenda__item-col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <p v-if="agendaItem.speaker">
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imageSrc() {
      return `/assets/icons/icon-${this.getAgendaItemIcons(
        this.agendaItem.type,
      )}.svg`;
    },
    title() {
      if (this.agendaItem.title) {
        return this.agendaItem.title;
      } else {
        return this.getAgendaItemTitleByDefault(this.agendaItem.type);
      }
    },
  },

  methods: {
    getAgendaItemIcons(type) {
      return agendaItemIcons[type];
    },
    getAgendaItemTitleByDefault(type) {
      return agendaItemTitles[type];
    },
  },
};
