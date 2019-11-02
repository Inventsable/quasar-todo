<template>
  <q-input
    @keyup.esc="searchField = ''"
    v-select-all
    outlined
    v-model="searchField"
    clearable
    clear-icon="close"
    label="Search"
    class="col"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>

    <template v-slot:hint>Field hint</template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { selectAll } from "src/directives/Directive-Select-All";

export default {
  // data: () => ({
  //   searchField: ""
  // }),
  directives: {
    selectAll
  },
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["setSearch"])
  }
};
</script>

<style>
</style>