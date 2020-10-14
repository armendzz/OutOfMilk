<template>
    <Page>
        <ActionBar :title="storeName" />
        <StackLayout height="100%">
            <FlexboxLayout  height="90%" flexDirection="column">
      
<ListView for="item in listOfItems">
  <v-template>
    <!-- Shows the list item label in the default color and style. -->
    <Label class="google-font" :text="item.title" />
        <check-box text:"test" checked="false" />


  </v-template>
</ListView>

        </FlexboxLayout>
        <DockLayout height="10%" backgroundColor="#3c495e">
            <Button id="tap" dock="right" text="+ADD" @tap="addItmess" />
        </DockLayout>
       
           
       
        </StackLayout>
    </Page>

</template>

<script>
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { Frame } from '@nativescript/core';
import axios from 'axios';
import * as http from "http";
const httpModule = require("tns-core-modules/http");
const dialogs = require('tns-core-modules/ui/dialogs')
const appSettings = require("tns-core-modules/application-settings");



export default {
      props: ['storeId', 'storeName'],
     data() {
       return {
           listOfItems: [],
            access_token: '',
       }
   },


   mounted() {

                this.access_token = appSettings.getString('access_token');
                  http.request({
                    url: "http://10.0.2.2:8000/api/store/" + this.storeId,
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + this.access_token },
                }).then(response => {
                    var result = response.content.toJSON();
                    console.log(result);
                    this.listOfItems = result.data;
                }, error => {
                    console.error(error);
                });
  }, 
  methods: {
      addItmess(){
            prompt({
                title: "Add Store",
                message: "Name Of Store:",
                okButtonText: "ADD",
                cancelButtonText: "Cancel",
                defaultText: "",
                inputType: dialogs.inputType.text
                }).then(result => {
                            httpModule.request({
                        url: "http://10.0.2.2:8000/api/list",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            title: result.text,
                            store_id: this.storeId
                        })
                    }).then((response) => {
                        const result = response.content.toJSON();
                        http.getJSON("http://10.0.2.2:8000/api/store/" + this.storeId).then(result => {
                            this.listOfItems = result.data;
                                }, error => {
                                    console.log(error);
                                });
                    }, (e) => {
                    });                
                });
        }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@500&display=swap');


</style>