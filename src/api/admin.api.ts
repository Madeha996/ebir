import { AdminModal } from "@app/domain/AppModal";
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

const baseURL = `admins`;

const GetAllAdmins = async (
  current: number,
  pageSize: number,
  keyword?: string
) => {
  return await httpApi.get(
    `${baseURL}?page=${current}&limit=${pageSize}&keyword=${keyword}`
  );
};

const CreateAdmin = async (name: string, email: string, password: string) => {
  return await httpApi.post(`${baseURL}`, {
    name,
    email,
    password,
  });
};

const UpdateAdmin = async (data: AdminModal) => {
  return await httpApi.put(`${baseURL}/${data?._id}`, {
    name: data?.name,
    email: data?.email,
    password: data?.password,
  });
};

const DeleteAdmin = async (id: string) => {
  return await httpApi.delete(`/${baseURL}/${id}`);
};
export { GetAllAdmins, UpdateAdmin, CreateAdmin, DeleteAdmin };
