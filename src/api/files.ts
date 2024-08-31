import { httpApi } from "./http.api";
import axios from "axios";

const baseURL = `/files`;

const GetAttachments = async (
  files: string,
  limit: number,
  keyword: string
) => {
  // return await httpApi.get(`${baseURL}?files=${files}&limit=${limit}&keyword=${keyword}`)
  return await axios.get(
    `https://eabir-backend.onrender.com/api/v1/files?files=${files}&limit=${limit}&keyword=${keyword}`
  );
};

const UploadAttachment = async (file: FormData) => {
  // return await httpApi.post(`${baseURL}`, {
  //   file,
  // });
  return await axios.post(
    "https://eabir-backend.onrender.com/api/v1/files",
    file
  );
};

const UpdateAttachment = async (id: string, name: string) => {
  return await axios.put(
    `https://eabir-backend.onrender.com/api/v1/pages/${id}`,
    { name }
  );
};

const GetAttachmentById = async (id: string) => {
  // return await httpApi.get(`${baseURL}/${id}`)
  return await axios.get(
    `https://eabir-backend.onrender.com/api/v1/files/${id}`
  );
};

const GetAttachmentByPageId = async (pageId: string) => {
  // return await httpApi.get(`${baseURL}/${pageId}`)
  return await axios.get(
    `https://eabir-backend.onrender.com/api/v1/files/page/${pageId}`
  );
};

const DeleteAttachment = async (id: string) => {
  return await axios.delete(
    `https://eabir-backend.onrender.com/api/v1/files/${id}`
  );
};

const EditAttachment = async (
  fileId: string,
  title: string,
  description?: string
) => {
  return await axios.put(
    `https://eabir-backend.onrender.com/api/v1/files/${fileId}`,
    { title }
  );
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
