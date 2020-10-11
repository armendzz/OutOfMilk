<template>
    <Page actionBarHidden="true">
        <StackLayout height="100%">
            <FlexboxLayout  height="90%" flexDirection="column">
      
<ListView for="item in listOfItems" @itemTap="page1BtnTap">
  <v-template>
    <!-- Shows the list item label in the default color and style. -->
    <Label class="google-font" :text="item" />
  </v-template>
</ListView>



        </FlexboxLayout>
        <DockLayout height="10%" backgroundColor="#3c495e">
            <Button id="tap" dock="right" text="+ADD" />
        </DockLayout>
       
           
       
        </StackLayout>
     
    </Page>
          

</template>

<script>
import List from './List'
export default {
   components: {
       List
   },
   data() {
       return {
           listOfItems: ["Perime", "Dyqan", "Kozmetik"]
       }
   },
   methods: {
       page1BtnTap(args){
           this.$navigateTo(List, { frame: "home-page"});
       }
   },
};
</script>

<style>
</style>