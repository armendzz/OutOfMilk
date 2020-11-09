<template>
    <Page class="" >
        <ActionBar class="action-bar" >
          
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
          
            <ActionItem icon="res://menu"
                        android:visibility="collapsed"
                        @tap="onDrawerButtonTap"
                        ios.position="left"/>
            <Label class="action-bar-title" :text="storeName"/>
        </ActionBar>

        <StackLayout  orientation="vertical">
       <RadListView height="90%" ref="listView" pullToRefresh="true" @pullToRefreshInitiated="onPullToRefreshInitiated" 
                   for="item in listOfItems"
                   :groupingFunction="myGroupFunction" >
        <v-template>
         <DockLayout class="item-list"  stretchLastChild="true" >
          <Label v-if="item.completed === 0" :id="item.id" text.decode="&#xf14a;" @tap="completeItem($event)" class="nt-icon far menuIcon" width="10%"/> 
          <Label v-else text.decode="&#xf14a;" :id="item.id" class="nt-icon fas menuIcon" width="10%" @tap="uncompleteItem($event)" /> 
          <Label :text="item.title" :id="item.id" :name="item.title"  class="storeName" width="65%"  /> 
          <Label text.decode="&#xf142;" class="nt-icon fas menuIcon"/>
         </DockLayout> 
        </v-template>
      </RadListView>
         <DockLayout height="10%" stretchLastChild="true" >
              <Button dock="right" class="addItem -primary -rounded-lg" width="35%" @tap="addItem" text="+ITEM" /> 
        </DockLayout>
       </StackLayout>   

     

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import * as http from "http";
  const appSettings = require("tns-core-modules/application-settings");
  const httpModule = require("tns-core-modules/http");
  const dialogs = require('tns-core-modules/ui/dialogs')
  import RadListView from 'nativescript-ui-listview/vue';

  export default {
    props: ['storeId', 'storeName'],
     data() {
      return {
        listOfItems: [],
        access_token: '',
      }
    },
    mounted() {
      
       http.request({
                    url: "http://10.0.2.2:8000/api/store/" + this.storeId,
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                }).then(response => {
                  console.log(response)
                    var result = response.content.toJSON();
                    this.listOfItems = result.data;
                }, error => {
                    console.error(error);
            });

    },
    created: function() {
       http.request({
                    url: "http://10.0.2.2:8000/api/store/" + this.storeId,
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                }).then(response => {
                  console.log(response)
                    var result = response.content.toJSON();
                    this.listOfItems = result.data;
                }, error => {
                    console.error(error);
            });
    },
    methods: {
       myGroupFunction(item) { 
         
         if(item.completed === 0) { 
           return '- Get'
            } 

            return 'Completed'

         },

      onNavigationButtonTap() {
      Frame.topmost().goBack();
    },
      onDrawerButtonTap() {
       utils.showDrawer();
      },
      completeItem(args){
          console.log(args.object.id)

            http.request({
                    url: "http://10.0.2.2:8000/api/list/" + args.object.id,
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                    content: JSON.stringify({
                            completed: 1
                        })
               }).then(response => {
                    http.request({
                    url: "http://10.0.2.2:8000/api/store/" + this.storeId,
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                }).then(response => {
                  console.log(response)
                    var result = response.content.toJSON();
                    this.listOfItems = result.data;
                }, error => {
                    console.error(error);
            });
             
                }, error => {
                    console.error(error);
            });
      },
      uncompleteItem(args){
          console.log(args.object.id)

            http.request({
                    url: "http://10.0.2.2:8000/api/list/" + args.object.id,
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                    content: JSON.stringify({
                            completed: 0
                        })
               }).then(response => {
                    http.request({
                    url: "http://10.0.2.2:8000/api/store/" + this.storeId,
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                }).then(response => {
                  console.log(response)
                    var result = response.content.toJSON();
                    this.listOfItems = result.data;
                }, error => {
                    console.error(error);
            });
             
                }, error => {
                    console.error(error);
            });
      },
      addItem(){
        
            prompt({
                title: "Add Store",
                message: "Name Of Store:",
                okButtonText: "ADD",
                cancelButtonText: "Cancel",
                defaultText: "",
                inputType: dialogs.inputType.text
                }).then(result => {
                  http.request({
                        url: "http://10.0.2.2:8000/api/list",
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                        content: JSON.stringify({
                            title: result.text,
                            store_id: + this.storeId
                        })
                    }).then((response) => {
                     http.request({
                    url: "http://10.0.2.2:8000/api/store/" + this.storeId,
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.listOfItems = result.data;
                }, error => {
                    console.error(error);
            });
                    }, (e) => {
                    });        
                    
                });
        
     
      },

      onPullToRefreshInitiated ({ object }) {
         http.request({
                    url: "http://10.0.2.2:8000/api/store/" + this.storeId,
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.$nextTick(() => {
                  this.listOfItems = result.data
                  object.notifyPullToRefreshFinished();
                });
             
                }, error => {
                    console.error(error);
            });
            

    },
      
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables
  .addItem {
    font-size: 22;
  }

</style>
