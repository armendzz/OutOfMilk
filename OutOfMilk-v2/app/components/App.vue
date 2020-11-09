<template lang="html">
    <RadSideDrawer  ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
        <StackLayout ~drawerContent   backgroundColor="#ffffff">
      <!--       <slot name="drawerContent"/>   -->
        </StackLayout>
        <Frame ~mainContent ref="drawerMainContent">
           <slot :name="sloti"/> 
        </Frame>
    </RadSideDrawer>
</template>

<script>
  import {SlideInOnTopTransition} from 'nativescript-ui-sidedrawer';
  const appSettings = require("tns-core-modules/application-settings");
  const SecureStorage = require("nativescript-secure-storage").SecureStorage;
  const secureStorage = new SecureStorage();


  export default {

    data() {
      return {
      transition: new SlideInOnTopTransition(),
      sloti: '',
      isLoggedIn: Boolean,
      
      }
    },
     beforeMount() {
      this.isLoggedIn = appSettings.hasKey('access_token');
      console.log(this.isLoggedIn);
      if (this.isLoggedIn == false){ 
        this.sloti = 'loginContent' 
        } else {
          this.sloti = 'mainContent'
        } 
    },
    
    mounted(){
      
    },
        
  }
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
