<template>
    <Page class="page">
        <ActionBar class="action-bar" >
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
            <Label class="action-bar-title" :text="storeName"/>
        </ActionBar>

          <ScrollView orientation="vertical">
        <StackLayout orientation="vertical">
     
        
          <DockLayout v-for="item in listOfItems" class="store-list"  stretchLastChild="true" >
            <check-box :checked="isChecked" :text="item.title" width="75%" class="storename" @checkedChange="isChecked = $event.value" />
            <!-- <Label :text="item.title" :id="item.id" :name="item.title"  class="storeName" width="65%"  /> -->
            <Label text.decode="&#xf142;" class="nt-icon fas menuIcon"/>
          </DockLayout>
        
      </StackLayout>
       </ScrollView>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import * as http from "http";
  const appSettings = require("tns-core-modules/application-settings");

  export default {
    props: ['storeId', 'storeName',],
     data() {
      return {
        listOfItems: [],
        access_token: ''
      }
    },
    beforeMount(){
     
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
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
       
  
    },
   
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      },
      itemList(){
        
        
               
      }
    },
    methods: {
      onDrawerButtonTap() {
        utils.showDrawer();
      },
      onItemTap(){
        console.log(this.$troniglobal)
      }
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables
  .itemStore {
    separator-color: white;
    font-size: 20;
    font-family: SansitaSwashed-Bold;
   
  }
    // Custom styles

     .menuIcon {
    vertical-align: center;
    horizontal-align: center;
    font-size: 25;
  }
  .storename {
     separator-color: white;
    font-size: 25;
    font-family: SansitaSwashed-Bold;
 
    padding: 0 0 10 10;
    color: cornflowerblue !important;
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

</style>
