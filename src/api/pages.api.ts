import { PagesModal } from "@app/domain/AppModal";
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

const baseURL = `/pages`;

const GetAllPages = async (
  current: number,
  pageSize: number,
  keyword?: string
) => {
  return await httpApi.get(
    `pages?page=${current}&limit=${pageSize}&keyword=${keyword}`
  );
};

const CreatePage = async (name: string) => {
  return await httpApi.post("pages", {
    name: name,
  });
};

const UpdatePage = async (data: PagesModal) => {
  return await httpApi.put(`pages/${data?._id}`, { name: data?.name });
};

const DeletePage = async (id: string) => {
  return await httpApi.delete(`pages/${id}`);
};
export { GetAllPages, CreatePage, UpdatePage, DeletePage };
