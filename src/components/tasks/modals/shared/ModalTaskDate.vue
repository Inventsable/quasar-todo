<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="dueDate"
      @input="$emit('update:dueDate', $event)"
      label="Due Date"
      clearable
      clear-icon="close"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :value="dueDate" @input="sendData" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: {
    dueDate: {
      type: String
    }
  },
  methods: {
    sendData(data) {
      console.log(data);
      this.$emit("update:dueDate", data);
      this.$refs.qDateProxy.hide();
    }
  }
};
</script>

<style>
</style>