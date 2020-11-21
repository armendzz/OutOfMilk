<template>
  <div>
    <Menu />
      <v-progress-linear
      v-if="$store.state.userStore.isupdating"
      indeterminate
      color="blue"
      height="10px"
    ></v-progress-linear>
      <v-progress-linear
      v-if="$store.state.userStore.isFetching"
      indeterminate
      color="blue"
      height="10px"
    ></v-progress-linear>
    <v-container class="d-flex justify-center ">
      <v-card class="col-md-8 com-sm-auto" tile>
        <v-toolbar color="blue" dark class="mb-2">
          <v-toolbar-title>Stores</v-toolbar-title>
        </v-toolbar>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="store in $store.state.userStore.store"
              :key="store.id"
              @click="goToItems(store.id)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="store.name"></v-list-item-title>
              </v-list-item-content>

              <div class="mr-5">
                {{ store.unCompleted }}/{{
                  store.lista_count
                }}
              </div>

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
          v-model="storeName.name"
          label="ADD NEW STORE"
          @keyup.enter="addStore"
          append-outer-icon="mdi-plus-circle-outline"
          @click:append-outer="addStore"
        ></v-text-field>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Menu from "../components/Menu";
export default {
  name: "Home",
  components: {
    Menu,
  },
  data: () => ({
    storeName: {
      name: "",
    },
  }),
  methods: {
    goToItems(id) {
      this.$router.push("store/" + id);
      this.$store.state.storeItems.isupdating = true;
      this.$store.dispatch("storeItems/getItems", id);
    },
    addStore() {
      let store = {
        name: this.storeName.name,
      };
      this.$store.dispatch("userStore/addStore", store);
      this.storeName.name = "";
      this.$store.dispatch("userStore/getStore");
    },
  },
  mounted() {
     this.$store.dispatch("userStore/getStore");
  },
};
</script>
