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
        @change="handleChange"
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
        @change="handleChange"
      />
    </div>
    <div v-if="isTalk()" class="form-group">
      <label class="form-label">Докладчик</label>
      <input
        class="form-control"
        v-model="agendaItem_.speaker"
        @change="handleChange"
      />
    </div>
    <div v-if="isTalk() || isOther()" class="form-group">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="agendaItem_.description"
        @change="handleChange"
      ></textarea>
    </div>
    <div v-if="isTalk()" class="form-group">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="agendaItem_.language">
        <option
          v-for="item in talkLanguages"
          :value="item.value"
          :key="item.value"
          @change="handleChange"
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
      agendaItem_: this.agendaItem,
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
    handleChange() {
      this.$emit('update:agendaItem', this.agendaItem_);
    },
    isTalk() {
      return this.agendaItem_.type === 'talk';
    },
    isOther() {
      return this.agendaItem_.type === 'other';
    },
    isRest() {
      return !this.isTalk() && !this.isOther();
    },
    onStartChange(value) {
      let startsAtMinutes = parseInt(this.agendaItem.startsAt.split(':')[0]) * 60 + parseInt(this.agendaItem.startsAt.split(':')[1]);
      let endsAtMinutes = parseInt(this.agendaItem.endsAt.split(':')[0]) * 60 + parseInt(this.agendaItem.endsAt.split(':')[1]);
      let valueMinutes = parseInt(value.split(':')[0]) * 60 + parseInt(value.split(':')[1]);
      let interval = endsAtMinutes - startsAtMinutes;

      let newEndsAtMinites = valueMinutes + interval;

      let hours = (newEndsAtMinites / 60) % 24;
      let minutes = newEndsAtMinites % 60;

      let hoursString = hours.toString().length < 2 ? '0' + hours : hours;
      let minutesString = minutes.toString().length < 2 ? '0' + minutes : minutes;

      this.agendaItem_.startsAt = value;
      this.agendaItem_.endsAt = hoursString + ':' + minutesString;

      this.handleChange();
    },
    onEndChange(newValue) {
      this.agendaItem_.endsAt = newValue;
      this.handleChange();
    },
  },

  computed: {
    title() {
      return this.isTalk()
        ? 'Тема'
        : this.isOther()
        ? 'Заголовок'
        : 'Нестандартный текст (необязательно)';
    },
  },

};
</script>

<style></style>
