<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner dense class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No tasks for today
      <template v-slot:action>
        <q-btn flat color="primary" label="Add Task" @click="$root.$emit('showAddTask')" />
      </template>
    </q-banner>
  </transition>
</template>

<script>
export default {};
</script>

<style>
</style>