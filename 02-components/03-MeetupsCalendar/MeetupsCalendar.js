function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const MeetupsCalendar = {
  name: "MeetupsCalendar",

  template: `
    <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prev"></button>
          <div>{{ localDate }}</div>
          <button class="rangepicker__selector-control-right" @click="next"></button>
        </div>
      </div>
      <div v-for="row in list" class="rangepicker__date-grid">
        <template v-for="item in row">
          <div v-if="item.date < first || item.date > last" class="rangepicker__cell rangepicker__cell_inactive">
            {{ item.date.getDate() }}
            <a v-for="meetup in item.meetups" class="rangepicker__event">{{ meetup.title }}</a>
          </div>
          <div v-else class="rangepicker__cell">
            {{ item.date.getDate() }}
            <a v-for="meetup in item.meetups" class="rangepicker__event">{{ meetup.title }}</a>
          </div>
        </template>
      </div>
    </div>
    </div>`,

  data: () => ({
    date: new Date(),
  }),

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    localDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        month: "long",
        year: "numeric"
      });
    },

    first() {
      return new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    },

    last() {
      return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    },

    list() {
      let calendarStartDate = addDays(this.first, -((this.first.getDay() + 6) % 7));
      let calendarEndDate = addDays(this.last, 6 - (this.last.getDay() + 6) % 7);

      let allDates = [];
      let rowDates = [];
      let dayNum = 0;
      for (let date = calendarStartDate; date <= calendarEndDate; date = addDays(date, 1)) {
        let meetupsList = this.meetups.filter(
          (x) => new Date(x.date).setHours(0, 0, 0, 0) === date.getTime(),
        );
        rowDates.push({date: date, meetups: meetupsList});
        ++dayNum;
        if (dayNum === 7) {
          allDates.push(rowDates);
          rowDates = [];
          dayNum = 0;
        }
      }
      return allDates;
    },
  },

  methods: {
    next() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    },
    prev() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    },
  },
};
