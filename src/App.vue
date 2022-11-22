<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <DocumentGroupComponent :documentGroup="documents" />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import { documentObjectMock } from "./common";
import DocumentGroupComponent from "./components/documents/DocumentGroupComponent.vue";

export default {
  name: "App",
  components: {
    DocumentGroupComponent,
  },
  data: () => ({
    documentObjectMock,
  }),
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["documents"]),
  },
  methods: {
    ...mapActions(["getDocuments"]),
  },
  mounted() {
    this.getDocuments();
  },
};
</script>
