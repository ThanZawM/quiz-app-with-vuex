<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="#cf34eb">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                :prepend-icon="person"
                name="login"
                label="Email"
                type="email"
                v-model="form.email"
              ></v-text-field>
              <v-text-field
              autocomplete="off"
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
            <v-btn
              color="#cf34eb"
              class="white--text"
              @click.prevent="login(form)"
              to="/"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
 
 <script>
import { mdiAccount, mdiLock } from "@mdi/js";
export default {
  name: "Login",
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
    login(form) {
      this.$store.commit("login", form);
    },
  },
};
</script>
 
 <style scoped>
</style>
 