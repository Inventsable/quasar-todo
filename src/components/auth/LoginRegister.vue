<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="mdi-account-circle" color="primary" />
        </template>
        {{tab | titleCase}} to access your Todos anywhere
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        ref="email"
        class="col"
        v-model="formData.email"
        label="Email"
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']"
        lazy-rules
        stack-label
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        ref="password"
        class="col"
        type="password"
        v-model="formData.password"
        label="Password"
        stack-label
        lazy-rules
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
      />
    </div>
    <div class="row">
      <q-space></q-space>
      <q-btn type="submit" color="primary" :label="tab" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    formData: {
      email: "",
      password: ""
    }
  }),
  props: {
    tab: String
  },
  filters: {
    titleCase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") this.loginUser(this.formData);
        else this.registerUser(this.formData);
      } else {
        console.log("Nope");
      }
    },
    isValidEmailAddress(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
};
</script>