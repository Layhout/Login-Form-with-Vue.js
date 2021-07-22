<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="info" text small v-on="on">
        Sign up here
        <v-icon small right>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-1">Create a New Account</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog"> <v-icon>mdi-close</v-icon> </v-btn>
      </v-card-title>
      <v-card-subtitle> it's quick and easy! </v-card-subtitle>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="First name"
                  :rules="[inputRules.required]"
                  v-model="firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Last name"
                  :rules="[inputRules.required]"
                  v-model="lastName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              label="Username"
              :rules="[inputRules.required]"
              v-model="username"
            ></v-text-field>
            <v-text-field
              label="Email"
              :rules="[inputRules.required, inputRules.email]"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="Password"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="showPass = !showPass"
              :rules="[inputRules.required]"
              v-model="password"
            ></v-text-field>
            <!-- <v-menu
              min-width="auto"
              offset-y
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on }"> -->
            <v-text-field
              v-model="pickedDate"
              type="date"
              label="Birthday"
              :rules="[inputRules.required]"
            ></v-text-field>
            <!-- </template>
              <v-date-picker
                no-title
                scrollable
                v-model="pickedDate"
                :active-picker.sync="activePicker"
                @change="save"
              ></v-date-picker>
            </v-menu> -->
            <v-row>
              <v-col cols="3"><h1 class="text-body-1 mt-1">Gender:</h1></v-col>
              <v-col>
                <v-radio-group row v-model="rbGender" mandatory>
                  <v-radio
                    v-for="choice in ['Male', 'Female', 'Other']"
                    :key="choice"
                    :label="choice"
                    :value="choice"
                    class="mt-n4 mx-3"
                  >
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row class="text-center">
              <p class="px-3">
                By clicking below to signup, you're agreeing to our
                <span style="color: #1976d2; cursor: pointer"
                  >terms of service.</span
                >
              </p>
              <v-col>
                <v-btn
                  color="info"
                  width="200"
                  depressed
                  class="mt-n6"
                  @click="handleSignup"
                  :loading="isLoading"
                  >Sign Up</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["thisFormFor"],
  data() {
    return {
      rbGender: "Male",
      pickedDate: null,
      menu: null,
      activePicker: null,
      showPass: false,
      dialog: false,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isLoading: false,
      inputRules: {
        required: (value) => !!value || "This field is required!",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  // watch: {
  //   menu(val) {
  //     val && setTimeout(() => (this.activePicker = "YEAR"));
  //   },
  // },
  methods: {
    ...mapActions(["handleRegister"]),

    // save(date) {
    //   this.$refs.menu.save(date);
    // },
    closeDialog() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    handleSignup() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.handleRegister({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
          gender: this.rbGender,
          dob: this.pickedDate,
        })
          .then(() => {
            this.isLoading = false;
            this.$emit("sign-up-success");
            this.dialog = false;
            this.$refs.form.reset();
          })
          .catch((err) => {
            this.isLoading = false;
            this.dialog = false;
            this.$refs.form.reset();
            err.response.status === 409
              ? this.$emit("sign-up-fail")
              : console.log(err.message);
          });
      }
    },
  },
};
</script>

<style>
</style>