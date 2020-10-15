<template>
	<Page>
		<FlexboxLayout class="page">
            <StackLayout class="form">
				<Label class="header" text="OutOfMilk" />
                <StackLayout class="input-field" marginBottom="25">
					<TextField class="input" hint="name" keyboardType="name" v-model="user.name" autocorrect="false" autocapitalizationType="none"  fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>
            	<StackLayout class="input-field" marginBottom="25">
					<TextField class="input" hint="Email" keyboardType="email" v-model="user.email" autocorrect="false" autocapitalizationType="none"  fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>
               	<StackLayout class="input-field" marginBottom="25">
					<TextField ref="password" class="input" hint="Password" v-model="user.password" secure="true" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>
                <StackLayout class="input-field" marginBottom="25">
					<TextField ref="password" class="input" hint="password_confirmation" v-model="user.password_confirmation" secure="true" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>
                <Button text="Register" class="btn btn-primary m-t-20" @tap="register" />
            </StackLayout>
		</FlexboxLayout>
	</Page>
</template>

<script>
const dialogs = require('tns-core-modules/ui/dialogs')
import * as http from "http";
const httpModule = require("tns-core-modules/http");
import Login from './Login'
const appSettings = require("tns-core-modules/application-settings");


export default {
    components: {
       Login,
   }, 
   data() {
       return {
           user: {
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
			},
			access_token: '',
			isLoggedIn: ''
       }
   },
     
   methods: {
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
                    }, (e) => {
                        console.log(e);
                    });               
        }
   },
};
</script>

<style scoped>
	.page {
		align-items: center;
		flex-direction: column;
	}

	.form {
		margin-left: 30;
		margin-right: 30;
		flex-grow: 2;
		vertical-align: middle;
	}

	.logo {
		margin-bottom: 12;
		height: 90;
		font-weight: bold;
	}

	.header {
		horizontal-align: center;
		font-size: 25;
		font-weight: 600;
		margin-bottom: 70;
		text-align: center;
		color: #1a3cd5;
	}

	.input-field {
		margin-bottom: 25;
	}

	.input {
		font-size: 18;
		placeholder-color: #A8A8A8;
	}

	.input-field .input {
		font-size: 54;
	}

	.btn-primary {
		height: 50;
		margin: 30 5 15 5;
		background-color: #D51A1A;
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}

	.login-label {
		horizontal-align: center;
		color: #A8A8A8;
		font-size: 16;
	}

	.sign-up-label {
		margin-bottom: 20;
	}

	.bold {
		color: #000000;
	}
</style>