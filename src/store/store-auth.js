import { firebaseauth } from "boot/firebase";
import { LocalStorage, Loading } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  loggedIn: false
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  }
};

const actions = {
  //
  handleAuthStateChange({ commit, dispatch }) {
    firebaseauth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        commit("setLoggedIn", true);
        // if (this.$route.name !== "Home")
        LocalStorage.set("loggedIn", true);
        this.$router.push("/");

        // Allows dispatch from different store file:
        dispatch("tasks/fbReadData", null, { root: true });
      } else {
        commit("setLoggedIn", false);
        // if (this.$route.name !== "Auth")
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth");
      }
    });
  },
  registerUser({}, payload) {
    Loading.show();
    firebaseauth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  loginUser({}, payload) {
    Loading.show();
    firebaseauth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  logOutUser() {
    firebaseauth.signOut();
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
