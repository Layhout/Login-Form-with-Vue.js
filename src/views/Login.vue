<template>
  <v-container pa-0 ma-0 class="fill-height">
    <v-snackbar v-model="snackbarSuc" color="success" top :timeout="5000">
      <span>Sign up success. Please login with your new account</span>
      <template v-slot:action="{ attrs }">
        <v-btn text color="white" v-bind="attrs" @click="snackbarSuc = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFail" color="error" top :timeout="5000">
      <span>Sign up fail. The email has already been used to sign up.</span>
      <template v-slot:action="{ attrs }">
        <v-btn text color="white" v-bind="attrs" @click="snackbarFail = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-row class="fill-height">
      <v-col
        cols="5"
        class="blue d-flex align-center"
        align="center"
        style="box-shadow: 5px 0px 20px grey"
      >
        <div style="width: 100%">
          <h1 class="display-4 white--text font-weight-bold">Welcome</h1>
          <p
            class="caption white--text font-weight-light mt-1"
            style="width: 65%"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-card width="400" outlined class="pa-1" align="center">
          <v-card-title>
            <h1 class="text-h4 font-weight-bold">Login</h1></v-card-title
          >
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Email"
                type="text"
                prepend-icon="mdi-email"
                :rules="[inputRules.required, inputRules.email]"
                :error-messages="errMsg"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Password"
                :type="show ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="show = !show"
                :error-messages="errMsg"
                :rules="[inputRules.required]"
                v-model="password"
              ></v-text-field>
              <p>
                Don't have an account yet?
                <RegisterPopup
                  @sign-up-success="snackbarSuc = true"
                  @sign-up-fail="snackbarFail = true"
                />
              </p>
              <v-btn
                color="success"
                depressed
                width="200"
                large
                @click="handleLogin"
                :loading="isLoading"
                >login <v-icon right>mdi-login</v-icon>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RegisterPopup from "../components/RegisterPopup.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  components: { RegisterPopup },
  data() {
    return {
      show: false,
      email: "",
      password: "",
      snackbarSuc: false,
      snackbarFail: false,
      errMsg: "",
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
  computed: {
    ...mapGetters(["User"]),
  },
  methods: {
    ...mapActions(["handleCheckUser"]),

    async handleLogin() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        await this.handleCheckUser({
          email: this.email,
          password: this.password,
        });
        console.log(this.User);
        if (this.User.notFound) {
          this.isLoading = false;
          this.errMsg = "This email and password are not match!";
        } else if (this.User.serverFail) {
          this.isLoading = false;
          this.errMsg = "Server failure!";
        } else {
          this.$router.push({ name: "Home" });
        }
      }
    },
  },
};
</script>
