const mimeTypes =
  "application/pdf, application/x-bzip, application/x-bzip2, application/gzip, application/zip, application/x-7z-compressed, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg, image/png, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.rar";

export const documentObjectMock = {
  metaInfo: {
    processTools: {
      title: "Інструменти по процесу",
      maxFiles: 5,
      mimeTypes,
      maxFileSize: 50,
    },
    client: {
      title: "Документи клиента",
      maxFiles: 10,
      mimeTypes,
      maxFileSize: 50,
    },
  },
  documents: [
    {
      fileName: "filename filename",
      key: "processTools.1",
      uploadTime: 1669101023598,
      comment: "коментар",
    },
    {
      fileName: "filename filename1",
      key: "client.1",
      uploadTime: 1669101023598,
      comment: "коментар",
    },

    {
      fileName: "filename filename2",
      key: "client.2",
      uploadTime: 1669101023598,
      comment: "коментар",
    },
  ],
};

export const genID = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;
