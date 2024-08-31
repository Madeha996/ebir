import { PagesModal } from "@app/domain/NotesModal";
import { httpApi } from "./http.api";
import axios from "axios";

export interface PagesTableRow {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface PagesTableData {
  data: PagesTableRow[];
  pagination: Pagination;
}

const baseURL = `/pages`;

const GetAllPages = async (
  current: number,
  pageSize: number,
  keyword?: string
) => {
  // return await httpApi.get(
  //   `${baseURL}?page=${current}&limit=${pageSize}&keyword=${keyword}`
  // );
  return await axios.get(
    `https://eabir-backend.onrender.com/api/v1/pages?page=${current}&limit=${pageSize}&keyword=${keyword}`
  );
};

const CreatePage = async (name: string) => {
  // return await httpApi.post(`/files`, {
  //   name: name,
  // });
  return await axios.post("https://eabir-backend.onrender.com/api/v1/pages", {
    name: name,
  });
};

const UpdatePage = async (data: PagesModal) => {
  // return await httpApi.put(`/files/${data.id}`, {
  //   name: data.name,
  // });
  return await axios.put(
    `https://eabir-backend.onrender.com/api/v1/pages/${data?._id}`,
    { name: data?.name }
  );
};

const DeletePage = async (id: string) => {
  // return await httpApi.delete(`/files/${id}`);
  return await axios.delete(
    `https://eabir-backend.onrender.com/api/v1/pages/${id}`
  );
};
export { GetAllPages, CreatePage, UpdatePage, DeletePage };
