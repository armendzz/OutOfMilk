<template lang="html">
    <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
        <StackLayout ~drawerContent backgroundColor="#ffffff">
            <slot name="drawerContent"/>
        </StackLayout>
        <Frame ~mainContent ref="drawerMainContent">
           <slot name="mainContent"/> 
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
