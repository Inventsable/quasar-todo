<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">{{this.$route.name}}</q-toolbar-title>

        <q-btn
          flat
          v-if="!loggedIn && $route.name !== 'Auth'"
          class="absolute-right"
          to="/auth"
          icon-right="mdi-account"
          label="Login"
        />
        <q-btn
          flat
          v-else-if="loggedIn"
          class="absolute-right"
          icon-right="mdi-account"
          @click="logOutUser"
          label="Log out"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="(tab, i) in tabs"
          :key="i"
          :icon="tab.icon"
          :label="tab.label"
          :to="tab.route"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      show-if-above
      bordered
      content-class="bg-primary"
      :width="250"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          class="text-grey-4"
          clickable
          v-for="(tab, i) in tabs"
          :key="i"
          :to="tab.route"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="tab.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{tab.label}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MyLayout",
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["logOutUser"])
  },
  data: () => ({
    leftDrawerOpen: false,
    tabs: [
      {
        label: "Todo",
        icon: "list",
        route: "/"
      },
      {
        label: "Settings",
        icon: "settings",
        route: "/settings"
      },
      // {
      //   label: "Help",
      //   icon: "mdi-comment",
      //   route: "/settings/help"
      // },
      {
        label: "Joystick",
        icon: "mdi-gamepad-variant",
        route: "/joystick"
      }
    ]
  })
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>