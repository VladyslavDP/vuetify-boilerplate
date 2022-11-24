<template>
  <v-container>
    <pre>{{ documents }}</pre>
    <v-form ref="form" v-model="valid" @submit="submit">
      <v-col
        class="py-0"
        v-for="items in groupedDocuments"
        :key="items.category"
      >
        <v-layout class="documents--title" text-center wrap>
          <v-row class="group--wrapper pa-2">
            <v-col cols="3" align-self="center"
              ><h2 class="text-left">{{ items.title }}</h2></v-col
            >
            <v-col cols="3" offset="2" class="d-flex">
              <v-btn
                :loading="loading3"
                :disabled="items.documents.length >= items.maxFiles"
                color="blue-grey"
                class="ma-0 white--text"
                @click="handleFileImport(items.key)"
              >
                Додати документи
                <v-icon right dark>
                  mdi-cloud-upload
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-layout>
        <v-layout
          class="documents--subtitle"
          text-center
          wrap
          v-if="items.documents.length"
        >
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
          class="documents--data"
          text-center
          wrap
          v-for="document in items.documents"
          :key="document.key"
        >
          <DocumentFieldComponent
            :document="document"
            @document:download="download"
            @document:remove="removeFile"
            @document:update="update"
          />
        </v-layout>
      </v-col>

      <v-layout text-center wrap>
        <v-row class="pa-2">
          <v-col cols="12">
            <input
              :accept="items.mimeTypes"
              ref="uploader"
              type="file"
              hidden
              @change="onFileChanged"
            />
            <v-btn
              class="ma-2"
              type="submit"
              :disabled="!valid"
              outlined
              color="indigo"
            >
              ЗАКРИТИ
            </v-btn>
          </v-col>
        </v-row>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import DocumentFieldComponent from "./DocumentFieldComponent.vue";

export default {
  name: "DocumentGroupComponent",
  components: { DocumentFieldComponent },
  props: {
    documents: {
      type: Array,
      default: () => [],
    },
    metaInfo: {
      type: Object,
      default: () => {},
    },
    ID: {
      type: String,
      default: () => "",
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
    uploaderKey: null,
    formData: {
      comments: {},
    },
  }),
  computed: {
    groupedDocuments() {
      const data = Object.keys(this.metaInfo).reduce((acc, item) => {
        const groupedDocuments = this.documents.filter((document) =>
          document.key.match(item)
        );
        const metaData = {
          ...this.metaInfo[item],
          key: item,
          documents: groupedDocuments,
        };
        return [...acc, metaData];
      }, []);
      return data;
    },
  },
  methods: {
    ...mapActions(["addDocument", "removeDocument"]),
    removeFile(value) {
      delete this.formData.comments[`document.${value}`];
      this.removeDocument(value);
    },
    // eslint-disable-next-line no-console
    download: (e) => console.log(e),
    update(document) {
      const key = `document.${document.key}`;
      this.formData.comments[key] = document.comment;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit(e) {
      e.preventDefault();
      // eslint-disable-next-line no-console
      const { comments } = this.formData;
      // eslint-disable-next-line no-console
      console.log(comments);
      if (Object.keys(comments).length) {
        // todo save comments API
      }
      // const isValid = this.$refs.form.validate();
      // const formData = new FormData(this.$refs.form.$el);
    },
    handleFileImport(docKey) {
      this.isSelecting = true;
      // todo generate key for uploader file
      const indexKeys = this.documents.reduce((acc, document) => {
        if (document.key.match(docKey)) {
          const index = Number(document.key.split(".")[1]);
          const isCorrectIndex = isNaN(index);
          if (!isCorrectIndex) {
            acc.push(index);
          }
        }
        return acc;
      }, []);

      for (let i = 1; i <= this.metaInfo[docKey].maxFiles; i++) {
        if (!indexKeys.includes(i)) {
          this.uploaderKey = `${docKey}.${i}`;
          break;
        }
      }

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      // todo prepare document key
      const document = {
        fileName: this.selectedFile.name,
        key: this.uploaderKey,
        uploadTime: new Date().getTime(),
        comment: "",
      };
      this.addDocument(document);
      const fd = new FormData();
      fd.append("document", this.selectedFile, this.selectedFile.name);
      for (let [key, value] of Object.entries(document)) {
        fd.append(key, value);
      }

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
