<template>
  <v-container>
    <v-snackbar v-model="snackbarSuc" color="success" top :timeout="5000">
      <span>Successfully Update</span>
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text color="white" @click="snackbarSuc = false"
          >close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFail" color="error" top :timeout="5000">
      <span>{{ failMsg }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text color="white" @click="snackbarFail = false"
          >close</v-btn
        >
      </template>
    </v-snackbar>
    <v-row no-gutters>
      <v-col cols="3" class="d-flex justify-end mt-8">
        <div>
          <v-avatar size="200">
            <img src="/profile.png" />
          </v-avatar>
          <h4 class="text-center mt-4 display-1 font-weight-bold">
            {{ User.username }}
          </h4>
        </div>
      </v-col>
      <v-col cols="1" class="text-center py-5">
        <v-divider vertical> </v-divider>
      </v-col>
      <v-col class="py-12" cols="2">
        <h4 class="text-h5 font-weight-bold d-inline ml-6">First name:</h4>
        <v-divider class="mb-12"></v-divider>
        <h4 class="text-h5 font-weight-bold d-inline ml-6">Last name:</h4>
        <v-divider class="mb-12"></v-divider>

        <h4 class="text-h5 font-weight-bold d-inline ml-6">Username:</h4>
        <v-divider class="mb-12"></v-divider>

        <h4 class="text-h5 font-weight-bold d-inline ml-6">Email:</h4>
        <v-divider class="mb-12"></v-divider>

        <h4 class="text-h5 font-weight-bold d-inline ml-6">Gender:</h4>
        <v-divider class="mb-12"></v-divider>

        <h4 class="text-h5 font-weight-bold d-inline ml-6">Birthday:</h4>
        <v-divider class="mb-12"></v-divider>
      </v-col>
      <v-col class="py-12">
        <span class="text-h5 font-weight-light ml-12">
          {{ User.firstName }}</span
        >
        <v-divider class="mb-12"></v-divider>
        <span class="text-h5 font-weight-light ml-12">
          {{ User.lastName }}</span
        >
        <v-divider class="mb-12"></v-divider>
        <span class="text-h5 font-weight-light ml-12">
          {{ User.username }}</span
        >
        <v-divider class="mb-12"></v-divider>
        <span class="text-h5 font-weight-light ml-12"> {{ User.email }}</span>
        <v-divider class="mb-12"></v-divider>
        <span class="text-h5 font-weight-light ml-12"> {{ User.gender }}</span>
        <v-divider class="mb-12"></v-divider>
        <span class="text-h5 font-weight-light ml-12"> {{ formattedDOB }}</span>
        <v-divider class="mb-12"></v-divider>
        <div class="d-flex justify-end">
          <EditPopup
            @update-success="snackbarSuc = true"
            @update-fail="updateFail"
            @server-fail="updateFail"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditPopup from "../components/EditPopup.vue";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  components: { EditPopup },
  data() {
    return {
      pickedDate: null,
      failMsg: "",
      snackbarSuc: false,
      snackbarFail: false,
    };
  },
  computed: {
    ...mapGetters(["User"]),

    formattedDOB() {
      return this.pickedDate
        ? format(parseISO(this.pickedDate), "do MMM yyyy")
        : "";
    },
  },
  created() {
    this.pickedDate = this.User.dob;
  },
  methods: {
    updateFail(info) {
      this.failMsg = info;
      this.snackbarFail = true;
    },
  },
};
</script>