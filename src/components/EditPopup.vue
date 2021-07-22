<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="info" large width="100" v-on="on"
        >Edit <v-icon right>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-1">Editing Your Account</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="First name"
                  :rules="[inputRules.required]"
                  v-model="firstName"
                  value="hello"
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
              v-model="pickedDate"
              type="date"
              label="Birthday"
              :rules="[inputRules.required]"
            ></v-text-field>
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
              <v-col>
                <v-btn
                  color="success"
                  width="200"
                  depressed
                  :loading="isLoading"
                  @click="handleSave"
                  >Save</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
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
    ...mapActions(["handleEdit"]),

    async handleSave() {
      this.isLoading = true;
      await this.handleEdit({
        id: this.User._id,
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password,
        gender: this.rbGender,
        dob: this.pickedDate,
      });
      this.dialog = false;
      console.log(this.User);
      if (this.User.updFail) {
        this.isLoading = false;
        this.$emit("update-fail", "Update fail due to unknown reason");
      } else if (this.User.serverFail) {
        this.isLoading = false;
        this.$emit("server-fail", "Update fail due to server failure");
      } else {
        this.isLoading = false;
        this.$emit("update-success");
      }
    },
  },
  created() {
    this.firstName = this.User.firstName;
    this.lastName = this.User.lastName;
    this.username = this.User.username;
    this.email = this.User.email;
    this.pickedDate = this.User.dob;
    this.rbGender = this.User.gender;
  },
};
</script>

<style>
</style>