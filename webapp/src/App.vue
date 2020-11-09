<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    //
  }),
  mounted(){
    this.$store.dispatch("userStore/getStore");
  }
 
};
</script>
