import { NewsModal, PagesModal } from "@app/domain/AppModal";
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

const baseURL = `/news`;

const GetAllNews = async (
  current: number,
  pageSize: number,
  keyword?: string
) => {
  // return await httpApi.get(
  //   `${baseURL}?page=${current}&limit=${pageSize}&keyword=${keyword}`
  // );
  return await axios.get(
    `https://eabir-backend.onrender.com/api/v1/news?page=${current}&limit=${pageSize}&keyword=${keyword}`
  );
};

const CreateNew = async (title: string) => {
  // return await httpApi.post(`/files`, {
  //   name: name,
  // });
  return await axios.post("https://eabir-backend.onrender.com/api/v1/news", {
    title: title,
  });
};

const UpdateNew = async (data: NewsModal) => {
  // return await httpApi.put(`/files/${data.id}`, {
  //   name: data.name,
  // });
  return await axios.put(
    `https://eabir-backend.onrender.com/api/v1/news/${data?._id}`,
    { title: data?.title }
  );
};

const DeleteNew = async (id: string) => {
  // return await httpApi.delete(`/files/${id}`);
  return await axios.delete(
    `https://eabir-backend.onrender.com/api/v1/news/${id}`
  );
};
export { GetAllNews, CreateNew, UpdateNew, DeleteNew };
