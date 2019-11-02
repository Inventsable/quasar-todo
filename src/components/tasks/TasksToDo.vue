<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header v-if="!settings.showTasksInOneList" color="bg-orange-5">Todo</list-header>
      <q-list bordered separator v-if="Object.keys(tasksToDo).length">
        <task v-for="(task, key) in tasksToDo" :key="key" :task="task" :id="key" />
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    tasksToDo: Object
  },
  components: {
    task: require("components/tasks/Task.vue").default,
    "list-header": require("components/shared/ListHeader.vue").default
  },
  computed: {
    ...mapGetters("settings", ["settings"])
  }
};
</script>

<style>
</style>