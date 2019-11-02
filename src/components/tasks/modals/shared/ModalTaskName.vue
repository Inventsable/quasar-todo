<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      class="col"
      ref="name"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      v-select-all
      clearable
      clear-icon="close"
    />
  </div>
</template>

<script>
import { selectAll } from "src/directives/Directive-Select-All";

export default {
  props: {
    name: {
      type: String
    }
  },
  directives: {
    selectAll
  }
};
</script>

<style>
</style>