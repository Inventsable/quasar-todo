<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="dueTime"
      @input="$emit('update:dueTime', $event)"
      label="Due Time"
      clearable
      clear-icon="close"
      class="col"
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time :value="dueTime" @input="sendData" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: {
    dueTime: {
      type: String
    }
  },
  methods: {
    sendData(data) {
      this.$emit("update:dueTime", data);
      // this.$refs.qDateProxy.hide();
    }
  }
};
</script>

<style>
</style>