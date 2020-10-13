<template>
    <Page>
       
<FlexboxLayout flexDirection="column" justifyContent="space-around">
  <Frame alignItems="baseline" id="home-page">
  <HomePage/>
  </Frame>
</FlexboxLayout>

    </Page>
</template>

<script >
    import HomePage from './HomePage';
    import { screen } from 'tns-core-modules/platform'
  export default {
      components: {
          HomePage,
      },
      methods: {
          actionFrameLoaded(args){
              const frame = args.object;

          }      
    },
  }
</script>
