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

        <GridLayout class="page__content">
            <ListView for="item in listOfItems" @itemTap="onItemTap">
            <v-template>
              <Label class="itemStore" :text="item" />
            </v-template>
          </ListView>
        </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import Items from "./Items";


  export default {
    components: {
      Items
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
    },
    data() {
      return {
        listOfItems: ['asd', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas', 'asfdfas']
      }
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
      onItemTap(){
          this.$navigateTo(Items, { 
        });
        utils.closeDrawer();
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
</style>
