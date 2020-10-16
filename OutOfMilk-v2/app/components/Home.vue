<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!--
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
            <!--
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://menu"
                        android:visibility="collapsed"
                        @tap="onDrawerButtonTap"
                        ios.position="left"/>
            <Label class="action-bar-title" text="Home"/>
        </ActionBar>
         <ScrollView orientation="vertical">
        <StackLayout orientation="vertical">
        
          <DockLayout v-for="store in listOfStores" class="store-list"  stretchLastChild="true" >
            <Label :text="store.name" :id="store.id" :name="store.name" @tap="onStoreTap($event)" class="storeName" width="65%"  />
            <Label text="15/34" width="20%" />
             <Label text.decode="&#xf142;" class="nt-icon fas menuIcon"/>
          </DockLayout>
        
      </StackLayout>
       </ScrollView>
     
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import Items from "./Items";
  import Login from "./Login"
  const appSettings = require("tns-core-modules/application-settings");
  import * as http from "http";

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
      this.access_token = appSettings.getString('access_token');
      this.isLoggedIn = appSettings.hasKey('access_token');
      console.log(this.isLoggedIn);
      if (this.isLoggedIn == false){ this.$navigateTo(Login, {})} 
    },
    mounted() {
     
      

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
      onStoreTap(args){
          this.$navigateTo(Items, { 
            props: {
                    storeId: args.object.id,
                    storeName: args.object.name,
            } });
        utils.closeDrawer();
      }
     
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables
  .menuIcon {
    vertical-align: center;
    horizontal-align: center;
    font-size: 25;
  }
  
  .store-list {
    separator-color: white;
    font-size: 25;
    font-family: SansitaSwashed-Bold;
    border-width: 0 0 3 0;
    padding: 0 0 10 10;
    color: cornflowerblue;
    border-color: rgba(114, 216, 241, 0.767);
  }
 

    // Custom styles
</style>
