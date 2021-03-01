<template>
  <AppInput :value="value_" :type="type" @change="onChange($event)">
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => {
        return ['date', 'time', 'datetime-local'].indexOf(value) !== -1;
      },
    },
    valueAsNumber: Number,
    valueAsDate: Date,
    value: {},
  },

  methods: {
    onChange(event) {
      if (event.target.type !== 'datetime-local') {
        this.$emit('update:valueAsDate', event.target.valueAsDate);
        this.$emit('update:valueAsNumber', event.target.valueAsNumber);
      } else {
        this.$emit('update:valueAsDate', this.dateLocalConvert(event.target.valueAsNumber));
        this.$emit('update:valueAsNumber', event.target.valueAsNumber);
      }
    },
    timeConvert(num) {
      let date = new Date(num);
      return this.dateToTimeFormat(date);
    },
    dateConvert(num) {
      let date = new Date(num);
      return this.dateFormat(date);
    },
    dateLocalConvert(num) {
      let date = new Date(num);
      return this.dateLocalFormat(date);
    },
    dateToTimeFormat(date) {
      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();
      let seconds = date.getUTCSeconds();
      let hoursFormat = hours < 10 ? '0' + hours : hours;
      let minutesFormat = minutes < 10 ? '0' + minutes : minutes;
      let secondsFormat = seconds < 10 ? '0' + seconds : seconds;
      if (this.$attrs.step && this.$attrs.step % 60 !== 0) {
        return hoursFormat + ':' + minutesFormat + ':' + secondsFormat;
      } else {
        return hoursFormat + ':' + minutesFormat;
      }
    },
    dateFormat(date) {
      let year = date.getUTCFullYear();
      let month = date.getUTCMonth() + 1;
      let day = date.getUTCDate();
      let monthFormat = month < 10 ? '0' + month : month;
      let dayFormat = day < 10 ? '0' + day : day;
      return [year, monthFormat, dayFormat].join('-');
    },
    dateLocalFormat(date) {
      return this.dateFormat(date) + 'T' + this.dateToTimeFormat(date);
    },
    handleNumber() {
      switch (this.type) {
        case 'time':
          return this.timeConvert(this.valueAsNumber);
        case 'date':
          return this.dateConvert(this.valueAsNumber);
        case 'datetime-local':
          return this.dateLocalConvert(this.valueAsNumber);
      }
    },
    handleDate() {
      switch (this.type) {
        case 'time':
          return this.dateToTimeFormat(this.valueAsDate);
        case 'date':
          return this.dateFormat(this.valueAsDate);
        case 'datetime-local':
          return this.dateLocalConvert(this.valueAsDate);
      }
    },
  },

  computed: {
    value_() {
      if (this.valueAsNumber && this.valueAsDate) {
        return this.handleNumber();
      } else if (this.valueAsNumber) {
        return this.handleNumber();
      } else if (this.valueAsDate) {
        return this.handleDate();
      } else {
        return this.value;
      }
    },
  },
};
</script>

<style scoped></style>
