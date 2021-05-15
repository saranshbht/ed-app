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
          <v-card-title primary-title>
            <h3>Welcome Back! &#x1F607;</h3>
          </v-card-title>
          <v-form @submit.prevent="onSubmit" v-model="formValid">
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

            <v-card-actions>
              <v-btn
                color="primary"
                large
                block
                type="submit"
                :disabled="!formValid || loading"
                :loading="loading"
              >
                Sign In
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-footer class="justify-center my-6">
          Don't have an account yet?{{ "\xa0" }}
          <strong><router-link to="/signup">Sign up</router-link></strong>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SignIn",
  data() {
    return {
      formValid: false,
      email: "",
      password: "",
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
    ...mapGetters(["user", "error", "loading"]),
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style scoped>
@import "../assets/styles.css";
</style>
