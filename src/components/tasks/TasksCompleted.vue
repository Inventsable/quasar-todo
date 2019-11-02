<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div :class="!settings.showTasksInOneList ? 'q-mt-lg' : ''">
      <list-header v-if="!settings.showTasksInOneList" color="bg-green-5">Completed</list-header>
      <q-list bordered separator v-if="Object.keys(tasksCompleted).length">
        <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key" />
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    tasksCompleted: Object
  },
  computed: {
    ...mapGetters("settings", ["settings"])
  },
  components: {
    task: require("components/tasks/Task.vue").default,
    "list-header": require("components/shared/ListHeader.vue").default
  }
};
</script>

<style>
</style>