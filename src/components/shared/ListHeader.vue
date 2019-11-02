<template>
  <q-banner dense inline-actions :class="color" class="list-header text-white text-center">
    <span class="text-bold text-subtitle1">
      <slot />
    </span>
  </q-banner>
</template>

<script>
export default {
  props: {
    color: String
  }
};
</script>

<style>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>