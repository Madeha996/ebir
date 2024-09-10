import { NewsModal, PagesModal } from "@app/domain/AppModal";
import { httpApi } from "./http.api";

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
  return await httpApi.get(
    `news?page=${current}&limit=${pageSize}&keyword=${keyword}`
  );
};

const CreateNew = async (title: string) => {
  return await httpApi.post("news", {
    title: title,
  });
};

const UpdateNew = async (data: NewsModal) => {
  return await httpApi.put(`news/${data?._id}`, { title: data?.title });
};

const DeleteNew = async (id: string) => {
  return await httpApi.delete(`news/${id}`);
};
export { GetAllNews, CreateNew, UpdateNew, DeleteNew };
