const mimeTypes =
  "application/pdf, application/x-bzip, application/x-bzip2, application/gzip, application/zip, application/x-7z-compressed, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg, image/png, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.rar";

export const documentObjectMock = {
  title: "Інструменти по процесу",
  maxFiles: 10,
  mimeTypes,
  maxFileSize: 50,
  category: "processTools",
  documents: [
    {
      fileName: "filename filename",
      key: "processTools.1",
      uploadTime: 1669101023598,
      comment: "коментар",
    },
  ],
};
