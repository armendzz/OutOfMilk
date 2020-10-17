<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Login" >Login</ActionBar>
        <GridLayout class="page__content">
         
            <DockLayout height="100%"  stretchLastChild="false">
                 <FlexboxLayout height="80%" dock="top" class="margin-top"  flexDirection="column" justifyContent="center">
                 <TextField class="loginInput" v-model="user.name" height="40" hint="Your Name" />
                 <TextField class="loginInput" v-model="user.email" height="40" hint="Your E-mail" />
                 <TextField class="loginInput" v-model="user.password" ref="password" height="40" secure="true" hint="Your Password" />
                 <TextField class="loginInput" v-model="user.password_confirmation" ref="password" height="40" secure="true" hint="Confirm Password" />
                 <Button class="loginButton -primary -rounded" text="Register" @tap="register" />
                 <Label class="forgot-pass" text="Alerdy have a account?" textWrap="true" @tap="goToLogin" />
                 <Label class="offline-use" text="Use This APP OFFLINE" textWrap="true" />
               </FlexboxLayout>
            </DockLayout>
        </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import Login from "./Login";
  import Home from "./Home";
  const appSettings = require("tns-core-modules/application-settings");
  import * as http from "http";
  const httpModule = require("tns-core-modules/http");

  export default {
    components: {
      Login,
      Home
    },
     data() {
       return {
           user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
			},
			access_token: ''
       }
   },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      onDrawerButtonTap() {
        utils.showDrawer();
      },
      goToLogin(){
        this.$navigateTo(Login, { clearHistory: true
        });
        utils.closeDrawer();
      },
        register(){
             httpModule.request({
                        url: "http://10.0.2.2:8000/api/apiregister",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            name: this.user.name,
                            email: this.user.email,
                            password: this.user.password,
                            password_confirmation: this.user.password_confirmation
                        })
                    }).then((response) => {
                        const result = response.content.toJSON();
                       appSettings.setString('access_token', result.access_token);
                       appSettings.setBoolean("isLoggedIn", true);
                      this.$root.$refs.drawerContent.reload();
                       this.$navigateTo(Home, {})
                    }, (e) => {
                        console.log(e);
                    });        
        }
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables
    .loginInput {
        font-size: 20;
        max-width: 30;
        margin-top: 10;
    }
    
    .loginButton {
        font-size: 20;
        margin-top: 20;
     
    }
    .margin-top{
        
        
        width: 80%;
    }

    .forgot-pass {
        color: gray;
        text-align: center;
        font-size: 15;
        margin-top: 15;
    }
    .offline-use{
        margin-top: 20;
        font-size: 17;
        text-align: center;
    }
    .signup-button {
         text-align: center;
         font-size: 17;
         color: black;
    }
    .signup-text {
         color: gray;
         text-align: center;
         font-size: 17;
    }
    // Custom styles
</style>
