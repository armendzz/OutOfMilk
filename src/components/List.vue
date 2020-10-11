<template>
    <Page actionBarHidden="true">
        <StackLayout height="100%">
            <FlexboxLayout  height="90%" flexDirection="column">
      
<ListView for="item in listOfItems" @itemTap="page1BtnTap">
  <v-template>
    <!-- Shows the list item label in the default color and style. -->
    <Label class="google-font" :text="item" />
        <check-box text:"test" checked="false" />


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
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { Frame } from '@nativescript/core';

export default {
     data() {
       return {
           listOfItems: ["molla", "dardha", "qumsht", "ice tee", "dicka", "tjeter"]
       }
   },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@500&display=swap');


</style>