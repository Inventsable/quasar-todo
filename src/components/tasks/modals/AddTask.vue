<template>
  <q-card>
    <modal-header />
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
  mixins: [mixinAddEditTask],
  name: "AddTask",
  data: () => ({
    text: "",
    taskToSubmit: {
      name: "",
      dueDate: "",
      dueTime: "",
      completed: false
    }
  }),

  methods: {
    ...mapActions("tasks", ["addTask"]),
    
    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>