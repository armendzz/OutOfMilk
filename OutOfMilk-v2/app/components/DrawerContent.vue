<template lang="html">
    <GridLayout rows="auto, *" class="nt-drawer__content">
        <StackLayout row="0" class="nt-drawer__header">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;"/>
            <Label class="nt-drawer__header-brand" :text="userName"/>
            <Label class="nt-drawer__header-footnote" :text="userEmail"/>
        </StackLayout>

        <ScrollView row="1" class="nt-drawer__body">
            <StackLayout>
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Home)">
                    <Label col="0" text.decode="&#xf015;" class="nt-icon fas"/>
                    <Label col="1" text="Home" class="p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Browse' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Browse)">
                    <Label col="0" text.decode="&#xf1ea;" class="nt-icon far"/>
                    <Label col="1" text="Browse" class="p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Search' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Search)">
                    <Label col="0" text.decode="&#xf002;" class="nt-icon fas"/>
                    <Label col="1" text="Search" class="p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Featured' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Featured)">
                    <Label col="0" text.decode="&#xf005;" class="nt-icon fas"/>
                    <Label col="1" text="Featured" class="p-r-10"/>
                </GridLayout>
              <StackLayout class="hr"/>
               <Button class="logoutButton -primary -rounded" text="LogOut" @tap="logOut" />

            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
  import Home from "./Home";
  import Browse from "./Browse";
  import Login from "./Login";
  import Featured from "./Featured";
  import * as http from "http";
  import app from "../app.js";
  import Search from "./Search";
  import * as utils from "~/shared/utils";
  import SelectedPageService from "~/shared/selected-page-service";
  const appSettings = require("tns-core-modules/application-settings");

  export default {
      data() {
      return {
        Home: Home,
        Browse: Browse,
        Featured: Featured,
        Search: Search,
        selectedPage: "",
        userName: '',
        userEmail: '',
        access_token: '',
      };
    },
    mounted() {
      SelectedPageService.getInstance().selectedPage$
        .subscribe((selectedPage) => this.selectedPage = selectedPage);

         this.access_token = appSettings.getString('access_token'); 
                  http.request({
                    url: "http://10.0.2.2:8000/api/user/",
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + this.access_token },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.userName = result.name
                    this.userEmail = result.email                    
                }, error => {
                    console.error(error);
                });
               console.log('u bona reload')
    },
      components: {
      Home,
      Login,
      Browse,
      Featured,
      Search,
    },
    created() {
        this.$root.$refs.drawerContent = this;
    },
    methods: {
      onNavigationItemTap(component) {
        this.$navigateTo(component, {
          clearHistory: true
        });
        utils.closeDrawer();
      },
       logOut(){
        appSettings.remove('access_token')
        this.isLoggedIn = appSettings.hasKey('access_token')
        this.$navigateTo(Login, {
          clearHistory: true
        });
        utils.closeDrawer();
      },
      reload() {
         this.access_token = appSettings.getString('access_token'); 
                  http.request({
                    url: "http://10.0.2.2:8000/api/user/",
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + this.access_token },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.userName = result.name
                    this.userEmail = result.email                    
                }, error => {
                    console.error(error);
                });
      this.$forceUpdate();

      }
    },

  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles

    .logoutButton {
      font-size: 20;
    }
</style>
