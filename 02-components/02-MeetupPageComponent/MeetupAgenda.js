import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <div class="meetup-agenda__item" v-for="item in agenda">
        <meetup-agenda-item :agenda-item="item"></meetup-agenda-item>
      </div>
    </div>`,

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
