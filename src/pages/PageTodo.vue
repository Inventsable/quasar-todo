<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <div class="row q-mb-lg">
        <search />
        <sort />
      </div>
      <p
        v-if="search && !Object.keys(tasksToDo).length && !Object.keys(tasksCompleted).length"
      >No search results</p>
      <q-scroll-area class="q-scroll-area-tasks">
        <no-tasks v-if="!Object.keys(tasksToDo).length && !search && !settings.showTasksInOneList" />
        <tasks-to-do v-else-if="Object.keys(tasksToDo).length" :tasksToDo="tasksToDo" />
        <tasks-completed
          class="q-mb-xl"
          v-if="Object.keys(tasksCompleted).length"
          :tasksCompleted="tasksCompleted"
        />
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          @click="showAddTask = true;"
          round
          color="primary"
          size="24px"
          icon="mdi-plus"
          class="all-pointer-events"
        />
      </div>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task-dialog @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "PageIndex",
  data: () => ({
    showAddTask: false
  }),
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  },
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("tasks", ["tasksToDo", "tasksCompleted"]),
    ...mapGetters("settings", ["settings"])

    // ----- manual -----
    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
  },
  components: {
    "add-task-dialog": require("components/tasks/modals/AddTask.vue").default,
    "no-tasks": require("components/tasks/NoTasks.vue").default,
    "tasks-to-do": require("components/tasks/TasksToDo.vue").default,
    search: require("components/tasks/tools/Search.vue").default,
    sort: require("components/tasks/tools/Sort.vue").default,

    "tasks-completed": require("components/tasks/TasksCompleted.vue").default
  }
};
</script>

<style>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>