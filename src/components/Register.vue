<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    :prepend-icon="person"
                    name="register"
                    label="Email"
                    type="email"
                    v-model="form.email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    :prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    counter
                    v-model="form.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register(form)">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
 
 <script>
import { mdiAccount, mdiLock } from "@mdi/js";
export default {
  name: "Register",
  data: () => ({
    person: mdiAccount,
    lock: mdiLock,
    form: {
      email: "",
      password: "",
    },
  }),
  computed: {
    user_email() {
      return self.$store.getters.user_email;
    },
    user_password() {
      return self.$store.getters.user_password;
    },
  },
  methods: {
    register(form) {
      this.$store.commit("register", form);
    },
  },
};
</script>
 
 <style scoped></style>
 