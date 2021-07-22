<template>
  <v-app>
    <Login v-if="!IsLogged" />
    <v-main v-else>
      <Navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./views/Login.vue";
import Navbar from "./components/Navbar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  data() {
    return {
      loggedUser: null,
    };
  },
  computed: {
    ...mapGetters(["IsLogged"]),
  },
  components: { Login, Navbar },
  methods: {
    ...mapActions(["handleLoggedUser"]),
  },
  created() {
    console.log("hello");
    this.handleLoggedUser();
  },
};
</script>
