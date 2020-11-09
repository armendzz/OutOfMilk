<template>
  <v-container fill-height>
    <v-row no-gutters>
      <v-col align="center">
        <v-card max-width="500" class="mb-9">
          <v-app-bar dark color="blue">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-app-bar>

          <v-row dense>
            <v-col cols="12 mt-3">
              <v-form ref="form" lazy-validation>
                <v-text-field
                  class="ml-4 mb-2 mr-4"
                  label="Full Name"
                  prepend-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                  class="ml-4 mb-2 mr-4"
                  label="E-mail"
                  prepend-icon="mdi-email"
                ></v-text-field>

                <v-text-field
                  class="ml-4 mb-2 mr-4"
                  type="password"
                  label="Password"
                  prepend-icon="mdi-lock"
                ></v-text-field>
                <v-text-field
                  class="ml-4 mb-2 mr-4"
                  type="password"
                  label="Confirm Password"
                  prepend-icon="mdi-lock"
                ></v-text-field>
              </v-form>
              <v-row>
                <v-col>
                  <v-btn class="ma-2" color="primary" dark>
                    Register
                    <v-icon dark right>
                      mdi-login
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <span>
                Alerdy Registered?
                <router-link to="/login">
                  Login Here
                </router-link></span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
