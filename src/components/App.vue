<template>
    <Page>
       
<FlexboxLayout flexDirection="column" justifyContent="space-around">
 <Frame alignItems="baseline" id="home-page">
  <HomePage/>
  </Frame> 
 <!--    <Frame alignItems="baseline" id="login-page">
  <Login/>
  </Frame> -->
</FlexboxLayout>

    </Page>
</template>

<script >
    import HomePage from './HomePage';
    import Login from './Login';
    import Register from './Register';
    import { screen } from 'tns-core-modules/platform'
  export default {
      components: {
          HomePage,
          Login,
          Register
      },
      methods: {
          actionFrameLoaded(args){
              const frame = args.object;

          }      
    },
  }
</script>
