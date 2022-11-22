<!-- eslint-disable no-console -->
<template>
  <v-container>
    <v-layout text-center wrap>
      <v-row class="group--wrapper pa-2">
        <v-col cols="3" align-self="center"
          ><h2 class="text-left">{{ documentGroup.title }}</h2></v-col
        >
        <v-col cols="3" offset="2" class="d-flex">
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="blue-grey"
            class="ma-0 white--text"
            @click="handleFileImport"
          >
            Додати документи
            <v-icon right dark>
              mdi-cloud-upload
            </v-icon>
          </v-btn>
          <input
            :accept="documentGroup.mimeTypes"
            ref="uploader"
            type="file"
            hidden
            @change="onFileChanged"
          />
        </v-col>
      </v-row>
    </v-layout>
    <v-layout text-center wrap v-if="documentGroup.documents.length">
      <v-row class="document--wrapper py-0">
        <v-col cols="3">
          <p class="text-left py-0 ma-0">
            файл
          </p>
        </v-col>
        <v-col cols="3" offset="2" class="py-0 d-flex align-center">
          <p class="text-left py-0 ma-0">
            коментар
          </p>
        </v-col>
      </v-row>
    </v-layout>
    <v-layout
      text-center
      wrap
      v-for="document in documentGroup.documents"
      :key="document.key"
    >
      <DocumentFieldComponent
        :document="document"
        @document:download="download"
        @document:remove="removeFile"
      />
    </v-layout>
    <v-layout text-center wrap>
      <v-row class="pa-2">
        <v-col cols="12">
          <v-btn class="ma-2" outlined color="indigo">
            ЗАКРИТИ
          </v-btn>
        </v-col>
      </v-row>
    </v-layout>

    <v-layout v-show="false">
      <v-form ref="form" v-model="valid" lazy-validation @submit="checkForm">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
        <v-btn type="submit" color="success">Login</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import DocumentFieldComponent from "./DocumentFieldComponent.vue";

export default {
  name: "DocumentGroupComponent",
  components: { DocumentFieldComponent },
  props: {
    documentGroup: {
      type: Object,
    },
  },
  data: () => ({
    loading3: false,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    isSelecting: false,
    selectedFile: null,
  }),

  methods: {
    removeFile(value) {
      // eslint-disable-next-line no-console
      console.log(value); // someValue
    },
    // eslint-disable-next-line no-console
    download: (e) => console.log(e),
    // eslint-disable-next-line no-console
    remove: () => console.log("remove"),

    validate() {
      // eslint-disable-next-line no-console
      console.log(this.$refs.form);
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    checkForm(e) {
      e.preventDefault();
      // const isValid = this.$refs.form.validate();

      // const formData = new FormData(this.$refs.form.$el);
    },
    handleFileImport() {
      this.isSelecting = true;

      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      // Trigger click on the FileInput
      // eslint-disable-next-line no-console
      console.log("wtf");
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      const fd = new FormData();
      fd.append("document", this.selectedFile, this.selectedFile.name);

      axios.post("/", fd, {
        onUploadProgress: (uploadE) => {
          // eslint-disable-next-line no-console
          console.log(
            `Upload progress ${Math.round(
              (uploadE.loaded / uploadE.total) * 100
            )}`
          );
        },
      });
      // eslint-disable-next-line no-console
      console.log(e.target);
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
