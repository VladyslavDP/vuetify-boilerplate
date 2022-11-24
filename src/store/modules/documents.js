import { documentObjectMock } from "../../common";
import { delay } from "../../utils";

export default {
  state: {
    documents: [],
    metaInfo: {},
  },
  mutations: {
    setDocuments: (state, docs) => {
      state.documents = docs;
    },
    setMetaInfo: (state, metaInfo) => {
      state.metaInfo = metaInfo;
    },
    addDocument: (state, document) => {
      state.documents.push(document);
    },
    removeDocument: (state, key) => {
      state.documents = state.documents.filter(
        (document) => document.key !== key
      );
    },
    updateDocument(state, document) {
      state.documents = state.documents.map((item) =>
        document.key === item.key ? document : item
      );
    },
  },
  actions: {
    // TODO all APIs
    getDocuments: async (context) => {
      await delay(100);
      const { metaInfo, documents } = documentObjectMock;
      context.commit("setDocuments", documents);
      context.commit("setMetaInfo", metaInfo);
    },
    addDocument: async (context, document) => {
      context.commit("addDocument", document);
    },
    removeDocument: async (context, key) => {
      context.commit("removeDocument", key);
    },
    updateDocument: (context, document) => {
      context.commit("updateDocument", document);
    },
  },
  getters: {
    documents: (state) => state.documents,
    metaInfo: (state) => state.metaInfo,
  },
};
