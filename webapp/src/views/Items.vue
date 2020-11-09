<template>
  <div>
    <Menu />

    <v-container class="d-flex justify-center ">
      <v-card class="col-md-8 com-sm-auto" tile>
        <v-toolbar color="blue" dark class="mb-2">
          <v-toolbar-title>{{ storeName.name }}</v-toolbar-title>
        </v-toolbar>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item v-for="item in unCompletedItems" :key="item.id">
                <v-text-field
              v-show="editing"
                :placeholder="item.title"
                v-model="newTitle"
                label="ADD NEW ITEM"
                @keyup.enter="addItem"
                append-outer-icon="mdi-plus-circle-outline"
                @click:append-outer="addItem"
              ></v-text-field>
              <v-checkbox v-if="!editing"
                v-model="item.completed"
                @click="complete(item.id)"
              ></v-checkbox>
              <v-list-item-content>
                <v-list-item-title v-if="!editing" v-text="item.title"></v-list-item-title>
               
              </v-list-item-content>
              
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon> mdi-menu</v-icon>
                  </v-btn>
                  
                </template>

                <v-list-item-group style="background-color: white">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Edit </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Delete </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-list-item-icon>
                    
                  </v-list-item>
                  
                </v-list-item-group>
              </v-menu>
            
            </v-list-item>
            
          </v-list-item-group>
        </v-list>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item v-for="item in completedItems" :key="item.id">
              <v-checkbox
                v-model="item.completed"
                @click="unComplete(item.id)"
              ></v-checkbox>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon> mdi-menu</v-icon>
                  </v-btn>
                </template>

                <v-list-item-group style="background-color: white">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Edit </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Delete </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-menu>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-text-field
          v-model="item"
          label="ADD NEW ITEM"
          @keyup.enter="addItem"
          append-outer-icon="mdi-plus-circle-outline"
          @click:append-outer="addItem"
        ></v-text-field>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Menu from "../components/Menu";
export default {
  methods: {
    complete(id) {
      this.$store.dispatch("storeItems/completeItem", id);
      this.$store.dispatch("storeItems/getItems", this.$route.params.id);
    },
    unComplete(id) {
      this.$store.dispatch("storeItems/unCompleteItem", id);
      this.$store.dispatch("storeItems/getItems", this.$route.params.id);
    },
    addItem() {
      let obj = {
        title: this.item,
        store: this.$route.params.id,
      };
      this.$store.dispatch("storeItems/addItem", obj);
      this.item = "";
      this.$store.dispatch("storeItems/getItems", this.$route.params.id);
    },
  },
  name: "Home",
  components: {
    Menu,
  },
  data: () => ({
    item: "",
    editing: true,
    newTitle: '',
  }),
  mounted() {
    this.$store.dispatch("userStore/getStore");
    this.$store.dispatch("storeItems/getItems", this.$route.params.id);
  },
  computed: {
    completedItems() {
      return this.$store.getters["storeItems/completedItem"];
    },
    unCompletedItems() {
      return this.$store.getters["storeItems/unCompletedItem"];
    },
    storeName() {
      return this.$store.getters["userStore/storeName"](this.$route.params.id);
    },
  },
};
</script>
