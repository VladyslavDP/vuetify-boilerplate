<!-- eslint-disable no-console -->
<template>
  <v-row class="document--wrapper pa-0">
    <v-col cols="3" class="py-0">
      <p
        class="document--name text-left py-2 px-4"
        style="cursor: pointer;"
        @click="download"
      >
        <span>{{ document.fileName }}</span>

        <v-btn fab x-small depressed color="transparent" @click="remove">
          <v-icon color="primary">mdi-close</v-icon>
        </v-btn>
      </p>
    </v-col>
    <v-col cols="3" offset="2" class="py-0 d-flex align-center">
      <v-text-field
        label="Solo"
        counter="250"
        v-model="document.comment"
        placeholder="Коментар"
        solo
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DocumentFieldComponent",
  props: {
    document: {
      type: Object,
    },
  },
  data: () => ({
    isSelecting: false,
    selectedFile: null,
  }),

  methods: {
    remove(e) {
      e.stopPropagation();
      this.$emit("document:remove", `removing ${this.document.key}`);
    },
    download() {
      this.$emit("document:download", `downloading ${this.document.key}`);
    },
  },
};
</script>
<style>
.group--wrapper {
  background-color: #bac8d3;
}
.document--wrapper {
  background-color: #d5e8d4;
}
.document--name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d1d1d1;
  border-radius: 3px;
}
.document--name span {
  max-width: 180px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
