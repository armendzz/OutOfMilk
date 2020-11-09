<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

        <StackLayout class="background">
		    <RadListView for="data in items" :groupingFunction="myGroupFunction">
			    <v-template name="groupview">
				    <Label text="MY CUSTOM GROUP TEMPLATE"/>
	            </v-template>
	            <v-template>
	                <StackLayout>
	                    <Label :text="data.title"/>
	                </StackLayout>
	            </v-template>
	        </RadListView>
	    </StackLayout>
    </Page>
</template>

<script>
  export default {
     data() { 
         return { 
             items: [
                 {
            "id": 31,
            "title": "fdas",
            "completed": 0
        },
        {
            "id": 32,
            "title": "asgasgf",
            "completed": 1
        },
        {
            "id": 33,
            "title": "fsa",
            "completed": 1
        },
        {
            "id": 35,
            "title": "fsafsd",
            "completed": 0
        },
        {
            "id": 36,
            "title": "faf",
            "completed": 1
        },
        {
            "id": 37,
            "title": "nje titull",
            "completed": 1
        },
        {
            "id": 59,
            "title": "gfasd",
            "completed": 1
        },
        {
            "id": 65,
            "title": "buk",
            "completed": 0
        },
        {
            "id": 66,
            "title": "sdssd",
            "completed": 1
        }
                  ] 
        }; 
    }, 
    methods: {
         myGroupFunction(item) { return item.completed; }
          }
}
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
