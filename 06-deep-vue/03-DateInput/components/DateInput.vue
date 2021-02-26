<template>
  <AppInput :value="getValue" :type="type" @change="onChange($event)">
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
      this.$emit('update:valueAsDate', event.target.valueAsDate);
      this.$emit('update:valueAsNumber', event.target.valueAsNumber);
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
      return date.getUTCHours() + ':' + date.getUTCMinutes();
    },
    dateFormat(date) {
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    },
    dateLocalFormat(date) {
      return (
        date.getFullYear() +
        '-' +
        date.getMonth() +
        '-' +
        date.getDate() +
        'T' +
        date.getUTCHours() +
        ':' +
        date.getUTCMonth()
      );
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
          return this.dateLocalConvert(this.valueAsNumber);
      }
    },
  },

  computed: {
    getValue() {
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
