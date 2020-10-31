<template>
    <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
   
  
        <GridLayout orientation="vertical" rows="auto, *">
          <RadListView for="item in itemList">
            <v-template>
              <StackLayout class="item red" orientation="vertical">
                <Label :text="item.name + ' if template'" class="nameLabel"></Label>
              </StackLayout>
            </v-template>
          </RadListView>
        </GridLayout>
    
  </Page>

</template>

<script>
import List from './List'
const dialogs = require('tns-core-modules/ui/dialogs')
import * as http from "http";
const httpModule = require("tns-core-modules/http");
import RadListView from 'nativescript-ui-listview/vue';

export default {
   components: {
       List
   },
   data() {
       return {
           title: 'Multiple Templates',
           listOfStore: [],
            itemList: [
        {name: 'Item 1', type: 'red'},
        {name: 'Item 2', type: 'green'},
        {name: 'Item 3', type: 'blue'},
        {name: 'Item 4', type: 'red'},
        {name: 'Item 5', type: 'green'},
        {name: 'Item 6', type: 'blue'},
      ],
       }
   },
     mounted() {
             http.request({
                    url: "http://10.0.2.2:8000/api/store",
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZThiODk0OTA0MzM5MGFlYjkxYzdjZjVlN2U3ZTA2OGQ0ODEyYmM2ZGE2ZDg2N2MzYTcxYWI5ZDQ5ZjVkZjkyZjI1MmIyMWRkNTFiMTU0MzgiLCJpYXQiOjE2MDI2MzM2NDAsIm5iZiI6MTYwMjYzMzY0MCwiZXhwIjoxNjM0MTY5NjQwLCJzdWIiOiIyNiIsInNjb3BlcyI6W119.cVvi68iegX_-hJs4atdgt3-Kw5zLEE4H4iIdLHtYJUh90P0_ZIk8ikFgmpbARZV9K4rgAzNIZogeusWS2uIYM4a9WfYVq3-bx0ncdkY5NeIGCG3PE6EbhNWNx9YWWmMaUpMW79rn8tsn48q13K0_Esj_oUb9cKk4Urx9h9NUoT_wFbOiWAOjN4oRaOJ8G_nzxGAVXfo6iNFGSiqFGXsIeHIbYsf7II0BCOT1AtPUCXCFkeqIXrnY1Guuiibh62HxOAe7RunjaExYzNnTrcrbPUVZTqyXY16IM9WRbMEuf0qCwEvQXX9v0ZSbA_smcymrwwVJgkERJTv2lq2mXDNthzRAzUxKSekfR9TRbxaKN0ZDqw6KoJ81_ayPhIvGHAPaoT7YpWkhfzWyzUk-pbEacuBRxvNWGbgxLdpQ1G7ua382BsIYnWp0lUI01xxxxh9jJUm1-Bf-eKnGKkOmA-R1udwEJ5_0UllfRIC92QAQML0utP5K_GCKdSaDltqznXRQr8IffkflQ8BpuZrswyAlBdvKaIT_3GePVOva2F4GFQBlmSCasIMdTww270xtume0PAgJpldZQdLPW2eck0IBcogc86_gQtbMn96TnPDEvKUtGy8zqVo0JC2-2csFHotLWU-KWeqtyM05oruK2FpLtTEQxSoAqKJKFO_ym-zGKUk" },
                }).then(response => {
                    var result = response.content.toJSON();
                    this.listOfStore = result.data;
                }, error => {
                    console.error(error);
                });
  },
  
   methods: {
       page1BtnTap(args){
         this.$navigateTo(List, {
                props: {
                    storeId: args.item.id,
                    storeName: args.item.name
                }
            });
      //   this.$navigateTo(List, { frame: "home-page"});
       },
        templateSelector(item, index, items) {
      return {
        red: 'red',
        green: 'green',
        blue: 'blue',
      }[item.type];
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
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({
                            name: result.text,
                        })
                    }).then((response) => {
                        const result = response.content.toJSON();
                        http.getJSON("http://10.0.2.2:8000/api/store").then(result => {
                            this.listOfStore = result.data;
                                }, error => {
                                    console.log(error);
                                });
                    }, (e) => {
                    });                
                });
        }
   },
};
</script>

<style>
</style>