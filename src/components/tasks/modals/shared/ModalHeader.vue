<template>
  <q-card-section class="row">
    <div class="text-h6">{{title}}</div>
    <q-space />
    <q-btn flat round dense icon="mdi-close" v-close-popup />
  </q-card-section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Add Todo"
    }
  }
};
</script>

<style>
</style>