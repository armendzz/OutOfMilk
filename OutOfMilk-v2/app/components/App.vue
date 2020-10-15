<template lang="html">
    <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
        <StackLayout ~drawerContent backgroundColor="#ffffff">
            <slot name="drawerContent"/>
        </StackLayout>
        <Frame v-if="isLoggedIn === true" ~mainContent ref="drawerMainContent">
           <slot name="mainContent"/> 
        </Frame>
        <Frame v-else ~mainContent ref="drawerMainContent">
            <slot name="loginContent"/>
        </Frame> 
    </RadSideDrawer>
</template>

<script>
  import {SlideInOnTopTransition} from 'nativescript-ui-sidedrawer';
  const appSettings = require("tns-core-modules/application-settings");
  export default {

    data() {
      return {
      transition: new SlideInOnTopTransition(),
      access_token: '',
      isLoggedIn: Boolean,
       
      }
    },
    
    mounted(){
      this.access_token = appSettings.getString('access_token');
      this.isLoggedIn = appSettings.hasKey('access_token');
      console.log(this.isLoggedIn)
    },

    
  }
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
