<template>
<div>
     <v-app-bar
      color="blue darken-4"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>OutOfMilk</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
         
          <v-list-item @click="goHome">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
        

           <v-list-item @click="goProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
             <v-list-item @click="logOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>LogOut</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
    name: "Menu",
     data: () => ({
      drawer: false,
      group: null,
    }),

    methods: {
      goHome(){
        this.$router.push({ name: 'Store' })
      },
      goProfile(){
        this.$router.push({ name: 'Profile' })
      },
      logOut(){
        localStorage.removeItem('user_access_token')
         this.$store.dispatch("storeItems/emptyItems");
          this.$store.dispatch("userStore/emptyStore");
         this.$router.push({ name: 'Login' })
      }
    }
}
</script>

<style>

</style>