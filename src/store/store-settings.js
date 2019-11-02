import Vue from "vue";
import { LocalStorage } from "quasar";

const state = {
  settings: {
    show12HourTimeFormat: false,
    showTasksInOneList: false
  }
};

const mutations = {
  setShow12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value;
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value;
  },
  setSettings(state, value) {
    Object.assign(state.settings, value);
  }
};

const actions = {
  // Dispatch is needed for an action to act on another action
  setShow12HourTimeFormat({ commit, dispatch }, value) {
    commit("setShow12HourTimeFormat", value);
    dispatch("saveSettings");
  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit("setShowTasksInOneList", value);
    dispatch("saveSettings");
  },
  saveSettings({ state }) {
    // Object.keys(state).forEach
    LocalStorage.set("settings", state.settings);
  },
  getSettings({ commit }) {
    let settings = LocalStorage.getItem("settings");
    if (settings) commit("setSettings", settings);
  }
};

const getters = {
  settings: state => {
    return state.settings;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
