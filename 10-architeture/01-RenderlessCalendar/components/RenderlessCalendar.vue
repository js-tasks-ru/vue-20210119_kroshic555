<script>
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default {
  name: 'RenderlessCalendar',

  render(h) {
    const content = this.$scopedSlots.default({
      list: this.list,
      first: this.first,
      last: this.last,
      localDate: this.localDate,
      next: this.next,
      prev: this.prev,
    });
    return Array.isArray(content) ? h('span', content) : content;
  },

  data: () => ({
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
</script>
