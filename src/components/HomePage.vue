<template>
    <Page actionBarHidden="true">
        <StackLayout height="100%">
            <FlexboxLayout  height="90%" flexDirection="column">
      
<ListView for="store in listOfStore" @itemTap="page1BtnTap">
  <v-template>
    <!-- Shows the list item label in the default color and style. -->
    <Label class="google-font" :text="store.name" />
  </v-template>
</ListView>

        </FlexboxLayout>
      <DockLayout height="10%" backgroundColor="#3c495e">
            <Button id="tap" dock="right" text="+ADD STORE"  @tap="addStore" />
        </DockLayout> 
       
           
       
        </StackLayout>
     
    </Page>
          

</template>

<script>
import List from './List'
const dialogs = require('tns-core-modules/ui/dialogs')
import * as http from "http";
const httpModule = require("tns-core-modules/http");

export default {
   components: {
       List
   },
   data() {
       return {
           listOfStore: []
       }
   },
     mounted() {
         http.getJSON("http://10.0.2.2:8000/api/store").then(result => {
          this.listOfStore = result.data;
            }, error => {
                console.log(error);
            });
  },
   methods: {
       page1BtnTap(args){
         
           console.log(args);
         // this.$navigateTo(List, { frame: "home-page"});
       },
       addStore(){
            prompt({
                title: "Add Store",
                message: "Name Of Store:",
                okButtonText: "ADD",
                cancelButtonText: "Cancel",
                defaultText: "",
                inputType: dialogs.inputType.text
                }).then(result => {
                            httpModule.request({
                        url: "http://10.0.2.2:8000/api/store",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            name: result.text,
                        })
                    }).then((response) => {
                        const result = response.content.toJSON();
                        http.getJSON("http://10.0.2.2:8000/api/store").then(result => {
                            this.listOfStore = result.data;
                                }, error => {
                                    console.log(error);
                                });
                    }, (e) => {
                    });                
                });
        }
   },
};
</script>

<style>
</style>