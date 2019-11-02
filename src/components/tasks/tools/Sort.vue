<template>
  <q-select
    filled
    v-model="sortBy"
    class="col q-ml-sm"
    :options="options"
    label="Sort by"
    stack-label
    map-options
    emit-value
  />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    options: [
      {
        label: "Name",
        value: "name"
      },
      {
        label: "Date",
        value: "dueDate"
      }
    ]
  }),
  methods: {
    ...mapActions("tasks", ["setSort"])
  },
  computed: {
    // Access via tasks namespace, target state.sort
    ...mapState("tasks", ["sort"]),
    sortBy: {
      get() {
        return this.sort;
      },
      set(value) {
        this.setSort(value);
      }
    }
  }
};
</script>

<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>