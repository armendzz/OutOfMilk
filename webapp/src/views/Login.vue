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
                  v-model="user.email"
                  class="ml-4 mb-2 mr-4"
                  label="E-mail"
                  prepend-icon="mdi-email"
                ></v-text-field>

                <v-text-field
                v-model="user.password"
                  class="ml-4 mb-2 mr-4"
                  type="password"
                  label="Password"
                  prepend-icon="mdi-lock"
                ></v-text-field>
              </v-form>
              <v-row>
                <v-col>
                  <v-btn class="ma-2" @click="login1" color="success" dark>
                    Login
                    <v-icon dark right>
                      mdi-checkbox-marked-circle
                    </v-icon>
                  </v-btn>
                </v-col>

                <v-col>
                  <router-link to="/register">
                    <v-btn class="ma-2" color="primary" dark>
                      Register
                      <v-icon dark right>
                        mdi-login
                      </v-icon>
                    </v-btn>
                  </router-link>
                </v-col>
              </v-row>

              <p class="mt-3">Password forgot?</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  
  data: () => ({
    user: {
      email : '',
      password : '',

    }
  }),
    methods: {
    login() {
      
      this.$store.dispatch("currentUser/loginUser", this.user)
        
                  //  this.$router.push({name: "Store"})
                 
             
    },
     login1(){
                this.$store.dispatch("currentUser/login",{
                    email: this.user.email,
                    password: this.user.password,
                }).then(response =>{
                    this.$router.push({name: "Store"})
                    console.log(response)
                }).catch(function (error) {
                  console.log(error)
      })
            }
  },
};
</script>

<style></style>
