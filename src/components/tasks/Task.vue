<template>
  <q-item
    v-ripple
    @click="updateTask({ id: id, updates: { completed: !task.completed }})"
    clickable
    v-touch-hold:1000.mouse="openEdit"
    v-touch-swipe.mouse.right="openDelete"
    :class="`bg-${task.completed ? 'green' : 'orange'}-1`"
  >
    <q-item-section side top>
      <q-checkbox class="no-pointer-events" :value="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough' : task.completed }"
        style="user-select: none;"
        v-html="$options.filters.searchHighlight(task.name, search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate && task.dueDate.length">
      <div class="row">
        <div class="column q-pr-sm">
          <q-item-label class="row justify-end" caption>{{task.dueDate | niceDate}}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{taskDueTime}}</small>
          </q-item-label>
        </div>
        <div class="column justify-center">
          <q-icon name="event" size="18px" />
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn dense flat round color="primary" @click.stop="openEdit" icon="edit" />
        <q-btn dense flat round color="red" @click.stop="promptToDelete(id)" icon="mdi-delete" />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task-dialog :task="task" :id="id" @close="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { date } from "quasar";
// destructuring to keep only what is needed
const { formatDate } = date;

export default {
  props: {
    task: Object,
    id: String
  },
  data: () => ({
    showEditTask: false
  }),
  components: {
    "edit-task-dialog": require("./modals/EditTask").default
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMM D");
    },
    searchHighlight(value, search) {
      if (search) {
        let searchrx = new RegExp(search, "igm");
        return value.replace(searchrx, match => {
          return `<span class="bg-yellow-6">${match}</span>`;
        });
      }
      return value;
    }
  },
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("settings", ["settings"]),
    taskDueTime() {
      if (this.settings.show12HourTimeFormat) {
        return date.formatDate(`${this.task.dueDate} ${this.task.dueTime}`, "h:mm A");
      } else {
        return this.task.dueTime;
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    openDelete() {
      this.promptToDelete(this.id);
    },
    openEdit() {
      this.showEditTask = true;
    },
    // Means map to "tasks", calling upon store's "updateTask" action
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    }
  }
};
</script>

<style>
</style>