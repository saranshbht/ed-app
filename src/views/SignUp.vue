<template>
  <v-container fill-height fluid>
    <v-row v-if="error">
      <v-col sm="6" offset-sm="3">
        <app-alert
          @close-alert="onDismissed"
          :text="error.message"
          :type="'error'"
        ></app-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="6" offset-sm="3">
        <v-card flat>
          <v-card-title class="font-weight-black text-h4 justify-center">
            Register
          </v-card-title>
          <v-form @submit.prevent="onSubmit" v-model="formValid">
            <v-text-field
              prepend-inner-icon="mdi-account"
              name="firstName"
              label="First Name"
              v-model="firstName"
              :rules="[rules.required]"
            >
            </v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-account"
              name="lastName"
              label="Last Name"
              v-model="lastName"
            >
            </v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-email"
              name="email"
              label="Email"
              id="email"
              v-model="email"
              :rules="[rules.required, rules.email]"
            >
            </v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
              :rules="[rules.required]"
            >
            </v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              :rules="[comparePasswords]"
            >
            </v-text-field>
            <v-radio-group
              row
              :rules="[(v) => !!v || 'Item is required']"
              v-model="gender"
            >
              <v-radio on-icon="mdi-gender-male" label="Male" value="Male">
              </v-radio>
              <v-radio
                on-icon="mdi-gender-female"
                label="Female"
                value="Female"
              >
              </v-radio>
            </v-radio-group>
            <v-checkbox :rules="[(v) => !!v || 'You must agree to continue!']">
              <template v-slot:label>
                <div>I agree to the <a href="">Terms and Conditions</a></div>
              </template>
            </v-checkbox>
            <v-card-actions>
              <v-btn
                color="primary"
                large
                block
                type="submit"
                :disabled="!formValid || loading"
                :loading="loading"
              >
                Sign Up
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-card-actions>
          </v-form>

          <!-- <div class="my-6">
            <h2>OR</h2>
            <h3>Continue with...</h3>
          </div>
          <v-row justify="space-around" class="my-6">
            <v-icon color="red" large>mdi-google</v-icon>
            <v-icon color="indigo" large>mdi-facebook</v-icon>
            <v-icon color="black" large>mdi-apple</v-icon>
          </v-row> -->
        </v-card>
        <v-footer class="justify-center my-6">
          Already have an account?{{ "\xa0" }}
          <strong><router-link to="/signin">Sign in</router-link></strong>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      formValid: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  computed: {
    ...mapGetters(["error", "loading"]),
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
  },
  methods: {
    ...mapActions(["signUserUp", "clearError"]),
    onSubmit() {
      // console.log('submitted');
      this.signUserUp({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
      });
    },
    onDismissed() {
      // console.log('Dismissed alert');
      this.clearError();
    },
  },
};
</script>

<style scoped>
@import "../assets/styles.css";
</style>
