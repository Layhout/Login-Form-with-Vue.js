<template>
  <nav>
    <v-app-bar elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">
        Welcome, {{ User.username }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        depressed
        color="error"
        @click="handleLogout"
        :to="{ name: 'Login' }"
        >sign out <v-icon small right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app color="primary" v-model="drawer">
      <v-list>
        <v-list-item v-for="link in links" :key="link.icon" :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-home", text: "Home", route: { name: "Home" } },
        { icon: "mdi-account", text: "Profile", route: { name: "Profile" } },
      ],
    };
  },
  computed: {
    ...mapGetters(["User"]),
  },
  methods: {
    ...mapActions(["handleLogout"]),
  },
};
</script>

<style>
</style>