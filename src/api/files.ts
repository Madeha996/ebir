import { httpApi } from "./http.api";

const baseURL = `/files`;

const GetAttachments = async (
  files: string,
  limit: number,
  keyword: string
) => {
  return await httpApi.get(
    `files?files=${files}&limit=${limit}&keyword=${keyword}`
  );
};

const UploadAttachment = async (file: FormData) => {
  return await httpApi.post("files", file);
};

const UpdateAttachment = async (id: string, name: string) => {
  return await httpApi.put(`pages/${id}`, { name });
};

const GetAttachmentById = async (id: string) => {
  return await httpApi.get(`files/${id}`);
};

const GetAttachmentByPageId = async (pageId: string) => {
  return await httpApi.get(`files/page/${pageId}`);
};

const DeleteAttachment = async (id: string) => {
  return await httpApi.delete(`files/${id}`);
};

const EditAttachment = async (
  fileId: string,
  title: string,
  description?: string
) => {
  return await httpApi.put(`files/${fileId}`, { title });
};

export {
  GetAttachments,
  UploadAttachment,
  GetAttachmentById,
  GetAttachmentByPageId,
  DeleteAttachment,
  UpdateAttachment,
  EditAttachment,
};
