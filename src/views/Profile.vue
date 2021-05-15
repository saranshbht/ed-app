<template>
  <v-container fluid>
    <v-row v-if="error">
      <v-col sm="6" offset-sm="3">
        <app-alert
          @close-alert="onDismissed"
          :text="error.message"
          :type="'success'"
        ></app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6" offset-sm="3">
        <v-card fill-height flat>
          <v-card-text>
            <v-row justify="space-around" class="my-5">
              <v-avatar color="orange" size="96">
                <span class="white--text">Profile Picture</span>
              </v-avatar>
            </v-row>

            <v-row justify="space-around" class="mb-3">
              <v-btn dark>Change Avatar</v-btn>
            </v-row>

            <v-textarea
              auto-grow
              clearable
              :rows="1"
              :row-height="24"
              v-model="userData.about"
              label="About"
            >
            </v-textarea>

            <v-text-field
              clearable
              v-model="userData.firstName"
              label="First Name"
            >
            </v-text-field>

            <v-text-field
              clearable
              v-model="userData.lastName"
              label="Last Name"
            >
            </v-text-field>

            <v-text-field
              clearable
              v-model="userData.mobile"
              label="Mobile Number"
              :rules="[rules.mobileNumber]"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="indigo darken-4 white--text"
              :loading="loading"
              :disabled="loading"
              @click="onSave"
            >
              <v-icon left dark>mdi-check</v-icon>
              Save Changes
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { cloneDeep } from "lodash";

export default {
  name: "Profile",
  data() {
    return {
      // show: false,
      rules: {
        mobileNumber: (value) => {
          const pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
          return pattern.test(value) || "Invalid Mobile Number";
        },
      },
    };
  },
  computed: {
    ...mapGetters(["user", "loading", "error"]),
    userData() {
      // console.log(this.user);
      return cloneDeep(this.user);
    },
  },
  methods: {
    ...mapActions(["updateUser", "clearError"]),
    onSave() {
      this.updateUser({
        userData: this.userData,
        message: "Data updated successfully!",
      });
    },
    onDismissed() {
      this.clearError();
    },
  },
};
</script>

<style scoped>
@import "../assets/styles.css";
</style>
