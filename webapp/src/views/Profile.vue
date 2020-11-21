<template>
  <div>
      <Menu />
       <v-container>
    <v-row justify="space-around">
      <v-card class="col-8">
       
        

          <v-card-title class=" mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              >
            </v-avatar>
            <p class="ml-3">
             {{ $store.state.currentUser.user.name }}
            </p>
          </v-card-title>
       

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Info
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
             
            > 
              <div>
                <div class="font-weight-normal">
                  <strong>E-mail: {{ $store.state.currentUser.user.email }} </strong> 
                </div>
               
              </div>
              
            </v-timeline-item>
               <v-timeline-item
             
            > 
              <div>
                <div class="font-weight-normal">
                  <strong>E-mail: {{ $store.state.currentUser.user.created_at }} </strong> 
                </div>
               
              </div>
             
            </v-timeline-item>
            
          </v-timeline>
          
        </v-card-text>
        <div class="d-flex justify-center mb-6">
         <v-btn color="red" @click="logOut" class="col-4" dark>LogOut</v-btn>
         </div>
      </v-card>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import Menu from "../components/Menu";
export default {
     components: {
    Menu,
  },
  mounted(){
      this.$store.dispatch("currentUser/getUser");
  },
  methods: {
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