<template>
  <q-card>
    <modal-header title="Edit Task" />
    <q-form ref="form">
      <q-card-section>
        <modal-task-name :name.sync="taskToSubmit.name" />
        <modal-task-date :dueDate.sync="taskToSubmit.dueDate" />
        <modal-task-time :dueTime.sync="taskToSubmit.dueTime" v-if="taskToSubmit.dueDate" />
      </q-card-section>
      <modal-buttons @validate="validateForm" />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/Mixin-Add-Edit-Task";

export default {
  name: "EditTask",
  mixins: [mixinAddEditTask],
  props: {
    task: Object,
    id: String
  },
  data: () => ({
    text: "",
    taskToSubmit: {}
  }),
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),

    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>