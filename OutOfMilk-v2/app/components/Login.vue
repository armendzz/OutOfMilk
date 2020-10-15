<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Login" >Login</ActionBar>
        <GridLayout class="page__content">
         
            <DockLayout height="100%"  stretchLastChild="false">
                 <FlexboxLayout height="80%" dock="top" class="margin-top"  flexDirection="column" justifyContent="center">
                 <TextField class="loginInput" v-model="user.email" keyboardType="email" height="40" hint="Your E-mail" />
                 <TextField class="loginInput"  v-model="user.password" height="40" secure="true" hint="Your Password" />
                 <Button class="loginButton -primary -rounded" text="Login" @tap="logIn" />               
                 <Label class="forgot-pass" text="Forgot Your Password?" textWrap="true" />
                 <Label class="offline-use" text="Use This APP OFFLINE" textWrap="true" />
               </FlexboxLayout>
                 
                 <FlexboxLayout height="20%" dock="bottom" class="margin-top" flexDirection="row" justifyContent="center">
                         <Label class="signup-text" text="Dont have an account? " textWrap="true" />
                         <Label class="signup-button" text="Signup" textWrap="true" @tap="signUp" />
                 </FlexboxLayout>
        
        </DockLayout>
       
          
        </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import Register from "./Register";
  import * as http from "http";
  import Home from "./Home";
  const httpModule = require("tns-core-modules/http");
  const appSettings = require("tns-core-modules/application-settings");


  export default {
    components: {
      Register,
      Home,
    },
    data() {
       return {
         user: {
                name: "",
                email: "",
			},
      access_token: '',
      isLoggedIn: ''
       }
   },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
      this.access_token = appSettings.getString('access_token');
      this.isLoggedIn = appSettings.hasKey('access_token');
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
      signUp() {
        this.$navigateTo(Register, {
        });
        utils.closeDrawer();
      },
      logIn(){
         httpModule.request({
                        url: "http://10.0.2.2:8000/api/apilogin",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            email: this.user.email,
                            password: this.user.password,
                        })
                    }).then((response) => {
                        const result = response.content.toJSON();
                       appSettings.setString('access_token', result.access_token);
                       appSettings.setBoolean("isLoggedIn", true);
                       this.$navigateTo(Home, {})
                    }, (e) => {
                        console.log(e);
                    });      
      },

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
