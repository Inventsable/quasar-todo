export default {
  components: {
    "modal-header": require("components/tasks/modals/shared/ModalHeader.vue")
      .default,
    "modal-task-name": require("components/tasks/modals/shared/ModalTaskName.vue")
      .default,
    "modal-task-date": require("components/tasks/modals/shared/ModalTaskDate.vue")
      .default,
    "modal-task-time": require("components/tasks/modals/shared/ModalTaskTime.vue")
      .default,
    "modal-buttons": require("components/tasks/modals/shared/ModalButtons.vue")
      .default
  },
  methods: {
    validateForm() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.submitTask();
        } else {
          console.log("ERROR");
        }
      });
    }
  }
};
