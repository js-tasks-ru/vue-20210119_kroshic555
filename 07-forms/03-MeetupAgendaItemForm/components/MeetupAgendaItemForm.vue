<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select
        class="form-control"
        title="Тип"
        v-model="agendaItem_.type"
      >
        <option
          v-for="item in agendaItemTypes"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            :value="agendaItem_.startsAt"
            @input="onStartChange($event.target.value)"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            :value="agendaItem_.endsAt"
            @input="onEndChange($event.target.value)"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ title }}</label>
      <input
        class="form-control"
        v-model="agendaItem_.title"
      />
    </div>
    <div v-if="isTalk" class="form-group">
      <label class="form-label">Докладчик</label>
      <input
        class="form-control"
        v-model="agendaItem_.speaker"
      />
    </div>
    <div v-if="isTalk || isOther" class="form-group">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="agendaItem_.description"
      ></textarea>
    </div>
    <div v-if="isTalk" class="form-group">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="agendaItem_.language">
        <option
          v-for="item in talkLanguages"
          :value="item.value"
          :key="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  data() {
    return {
      agendaItem_: null,
      agendaItemTypes: getAgendaItemTypes(),
      talkLanguages: getTalkLanguages(),
    };
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onStartChange(value) {
      let startsAtMinutes = parseInt(this.agendaItem_.startsAt.split(':')[0]) * 60 + parseInt(this.agendaItem_.startsAt.split(':')[1]);
      let endsAtMinutes = parseInt(this.agendaItem_.endsAt.split(':')[0]) * 60 + parseInt(this.agendaItem_.endsAt.split(':')[1]);
      let valueMinutes = parseInt(value.split(':')[0]) * 60 + parseInt(value.split(':')[1]);
      let interval = endsAtMinutes - startsAtMinutes;

      let newEndsAtMinites = valueMinutes + interval;

      let hours = (newEndsAtMinites / 60) % 24;
      let minutes = newEndsAtMinites % 60;

      let hoursString = hours.toString().length < 2 ? '0' + hours : hours;
      let minutesString = minutes.toString().length < 2 ? '0' + minutes : minutes;

      this.agendaItem_.startsAt = value;
      this.agendaItem_.endsAt = hoursString + ':' + minutesString;
    },
    onEndChange(newValue) {
      this.agendaItem_.endsAt = newValue;
    },
    deepEqual(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    },
  },

  computed: {
    title() {
      return this.isTalk
        ? 'Тема'
        : this.isOther
        ? 'Заголовок'
        : 'Нестандартный текст (необязательно)';
    },
    isTalk() {
      return this.agendaItem_.type === 'talk';
    },
    isOther() {
      return this.agendaItem_.type === 'other';
    },
    isRest() {
      return !this.isTalk && !this.isOther;
    },
  },

  watch: {
    agendaItem: {
      deep: true,
      immediate: true,
      handler(newValue) {
        let newValCopy = { ...newValue };
        if (!this.deepEqual(newValCopy, this.agendaItem_)) {
          this.agendaItem_ = newValCopy;
        }
      },
    },
    agendaItem_: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', { ...newValue });
      },
    },
  },
};
</script>

<style></style>
