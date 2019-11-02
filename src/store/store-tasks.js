import Vue from "vue";
import leylo from "leylo";
import { firebaseauth } from "boot/firebase";

// Quasar has native uid util that can be imported
import { uid } from "quasar";

const state = {
  tasks: {
    // ID1: {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: "2019/04/12",
    //   dueTime: "18:30"
    // },
    // ID2: {
    //   name: "Get bananas",
    //   completed: false,
    //   dueDate: "2019/05/13",
    //   dueTime: "18:30"
    // },
    // ID3: {
    //   name: "Go to store",
    //   completed: true,
    //   dueDate: "2019/07/13",
    //   dueTime: "18:30"
    // }
  },
  search: "",
  sort: "name"

  // tasks: [
  //   {
  //     id: 1,
  //     name: "Go to shop",
  //     completed: false,
  //     dueDate: "2019/05/12",
  //     dueTime: "18:30"
  //   },
  //   {
  //     id: 2,
  //     name: "Get bananas",
  //     completed: false,
  //     dueDate: "2019/05/13",
  //     dueTime: "18:30"
  //   }
  // ]
};

const mutations = {
  mutateTask(state, payload) {
    payload.updates["userId"] = firebaseauth.currentUser.uid;
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  murderTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  newTask(state, payload) {
    payload.task["userId"] = firebaseauth.currentUser.uid;
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  }
};

// Must call mutation, don't update state in action directly.
const actions = {
  // Action expects object as first parameter
  // Payload is object from component's mapAction 2nd param
  updateTask({ commit }, payload) {
    commit("mutateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("murderTask", id);
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    commit("newTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },
  fbReadData({ commit }) {
    let userTasks = leylo.streamDocChangesByQuery(
      "tasks",
      "userId",
      "==",
      firebaseauth.currentUser.uid,
      doc => {
        let payload = {
          id: doc.id,
          task: doc.data()
        };

        commit("newTask", payload);
      },
      "added",
      false
    );

    let modifiedTasks = leylo.streamDocChangesByQuery(
      "tasks",
      "userId",
      "==",
      firebaseauth.currentUser.uid,
      doc => {
        let payload = {
          id: doc.id,
          updates: doc.data()
        };
        commit("mutateTask", payload);
      },
      "modified",
      false
    );

    // console.log(userTasks);
  }
};

const getters = {
  // Always pass in state as first param
  tasksSorted: state => {
    // Instead of using arrays, must use Object/Keys per above structure
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks);
    // Sort by alphabetical value of name prop
    keysOrdered.sort((a, b) => {
      // Manually search via name prop
      // let taskAProp = state.tasks[a].name.toLowerCase(),
      //   taskBProp = state.tasks[b].name.toLowerCase();

      // Allows sort prop to be configurable (sort by any prop)
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
        taskBProp = state.tasks[b][state.sort].toLowerCase();

      return taskAProp > taskBProp ? 1 : taskAProp < taskBProp ? -1 : 0;
    });

    // Assign sorted value to empty object above
    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });

    return tasksSorted;
  },
  // Call sibling getter to filter through above sort
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted;
    let tasksFiltered = {};

    // If state's search prop has value (we are searching)
    if (state.search) {
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key];
        let rx = new RegExp(state.search, "i");
        if (rx.test(task.name)) {
          tasksFiltered[key] = task;
        }
      });

      return tasksFiltered;
    } else {
      return tasksSorted;
    }
  },
  tasks: state => {
    return state.tasks;
  },
  tasksToDo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    // Simple grab certain tasks
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      !task.completed ? (tasks[key] = task) : null;
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      task.completed ? (tasks[key] = task) : null;
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
