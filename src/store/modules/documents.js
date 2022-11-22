import { documentObjectMock } from "../../common";
import { delay } from "../../utils";

export default {
  state: {
    documents: [],
    metaInfo: [],
  },
  mutations: {
    setDocuments: (state, docs) => {
      state.documents = docs;
    },
    addDocument: (state, document) => {
      // eslint-disable-next-line no-console
      console.log(state);
      state.documents[0].documents.push(document);
    },
    removeDocument: (state, key) => {
      // eslint-disable-next-line no-console
      console.log(key);
      state.documents[0].documents = [];
      // state.documents[0].documents = state.documents[0].documents.filter(
      //   (document) => document.key !== key
      // );
    },
  },
  actions: {
    getDocuments: async (context) => {
      await delay(2000);
      const documents = [{ ...documentObjectMock }];
      context.commit("setDocuments", documents);
    },
    addDocument: async (context, document) => {
      context.commit("addDocument", document);
    },
    removeDocument: async (context, key) => {
      context.commit("removeDocument", key);
    },
  },
  getters: {
    documents: (state) => {
      return state.documents;
    },
  },
};
