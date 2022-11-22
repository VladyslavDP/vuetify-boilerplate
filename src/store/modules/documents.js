import { documentObjectMock } from "../../common";
import { delay } from "../../utils";

export default {
  state: {
    documents: [],
  },
  mutations: {
    setDocuments: (state, docs) => {
      console.log(docs);
      state.documents = docs;
    },
    addDocument: (document) => {
      this.state.document.push(document);
    },
    removeDocument: (key) => {
      this.state.documents = this.state.documents.filter(
        (document) => document.key !== key
      );
    },
  },
  actions: {
    getDocuments: async (context) => {
      await delay(2000);
      const documents = [{ ...documentObjectMock }];
      context.commit("setDocuments", documents);
    },
  },
  getters: {
    documents: (state) => {
      return state.documents;
    },
  },
};
