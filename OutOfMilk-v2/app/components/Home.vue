<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
            <ActionItem icon="res://menu"
                        android:visibility="collapsed"
                        @tap="onDrawerButtonTap"
                        ios.position="left"/>
            <Label class="action-bar-title" text="Home"/>
        </ActionBar>
      <StackLayout orientation="vertical">
        
         
       <RadListView ref="listView" pullToRefresh="true" @pullToRefreshInitiated="onPullToRefreshInitiated" height="90%"
                   for="store in listOfStores"
                   
                   >
        <v-template>
         <DockLayout class="item-list"  stretchLastChild="true">
             <Label :text="store.name" :id="store.id" :name="store.name" class="storeName" @tap="onStoreTap" width="65%"  />
             <Label :text="store.unCompleted" width="7%" />
             <Label text="/" class="font-si" width="5%" />
             <Label :text="store.lista.length" width="7%" />
             <Label text.decode="&#xf142;" :id="store.id" class="nt-icon fas menuIcon" @tap="editOrDestroy"/>
          </DockLayout> 
        </v-template>
      </RadListView>
      <DockLayout  stretchLastChild="true" >
             <Button dock="right" class="addStore -primary -rounded-lg" width="35%" @tap="addStore" text="+STORE" /> 
      </DockLayout>
     </StackLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import Items from "./Items";
  import Login from "./Login"
  const dialogs = require('tns-core-modules/ui/dialogs')
  const appSettings = require("tns-core-modules/application-settings");
  import * as http from "http";
  const httpModule = require("tns-core-modules/http");
  import * as Toast from 'nativescript-toast';

  export default {
    components: {
      Items,
      Login
    },
      

     data() {
      return {
        listOfStores: [],
         access_token: '',
         isLoggedIn: Boolean,
      }
    },
    beforeMount() {
     
    
    },
    mounted() {

        this.access_token = appSettings.getString('access_token');
      this.isLoggedIn = appSettings.hasKey('access_token');
      console.log(this.isLoggedIn);
      if (this.isLoggedIn == false){ this.$navigateTo(Login, {})} 

    /*   http.request({
                    url: "http://10.0.2.2:8000/api/store",
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + this.access_token },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.listOfStores = result.data;
                }, error => {
                    console.error(error);
            }); */
            this.getStores()

      
       SelectedPageService.getInstance().updateSelectedPage("Home");
      
            
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      getStores(){
          http.request({
                    url: "http://10.0.2.2:8000/api/store",
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + this.access_token },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.listOfStores = result.data;
                }, error => {
                    console.error(error);
            });
      },
         onPullToRefreshInitiated ({ object }) {
         http.request({
                    url: "http://10.0.2.2:8000/api/store/",
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.$nextTick(() => {
                  this.listOfStores = result.data
                  object.notifyPullToRefreshFinished();
                });
             
                }, error => {
                    console.error(error);
            });

    },
    editOrDestroy(args){
      action("Choose your action", "OR CANCEL", ["Edit", "Delete"])
      .then(result => {
        if(result == "Delete"){
          confirm('Are You Sure')
            .then(result => {
              if(result == true){
                 http.request({
                        url: "http://10.0.2.2:8000/api/store/" + args.object.id,
                        method: "DELETE",
                        headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Bearer " + appSettings.getString('access_token') },
                    }).then((response) => {
                      var result = response.content.toJSON();
                      var toast = Toast.makeText(result.message);
                      toast.show();
                       this.getStores()
                    }, (e) => {
                    }); 
              }
            });
        }
        if(result == "Edit"){
          prompt({
                title: "Edit Store",
                message: "Chose Name Of Store:",
                okButtonText: "EDIT",
                cancelButtonText: "Cancel",
                defaultText: "",
                inputType: dialogs.inputType.text
                }).then(result => {
                  httpModule.request({
                        url: "http://10.0.2.2:8000/api/store/" + args.object.id,
                        method: "PUT",
                        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                        content: JSON.stringify({
                            name: result.text
                        })
                    }).then((response) => {
                      this.getStores()
                    }, (e) => {
                    });        
                    
                });
        }
      });
    },
      onDrawerButtonTap() {
        utils.showDrawer();
      },
      onStoreTap(args){
       this.$navigateTo(Items, { 
            props: {
                    storeId: args.object.id,
                    storeName: args.object.name,
            } }); 
        utils.closeDrawer();
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
                        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + appSettings.getString('access_token') },
                        content: JSON.stringify({
                            name: result.text
                        })
                    }).then((response) => {
                       /*  http.request({
                    url: "http://10.0.2.2:8000/api/store",
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + this.access_token },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.listOfStores = result.data;
                }, error => {
                    console.error(error);
            }); */ this.getStores()
                    }, (e) => {
                    });        
                    
                });
        }
     
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables
  .addStore {
    font-size: 22;
  }
  .font-si {
    font-size: 17;
  }
    // Custom styles
</style>
