import { AdminModal } from "@app/domain/AppModal";
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

const baseURL = `/admins`;

const GetAllAdmins = async (
  current: number,
  pageSize: number,
  keyword?: string
) => {
  return await axios.get(
    `https://eabir-backend.onrender.com/api/v1/admins?page=${current}&limit=${pageSize}&keyword=${keyword}`
  );
};

const CreateAdmin = async (name: string, email: string, password: string) => {
  return await axios.post("https://eabir-backend.onrender.com/api/v1/admins", {
    name,
    email,
    password,
  });
};

const UpdateAdmin = async (data: AdminModal) => {
  return await axios.put(
    `https://eabir-backend.onrender.com/api/v1/admins/${data?._id}`,
    {
      name: data?.name,
      email: data?.email,
      password: data?.password,
    }
  );
};

const DeleteAdmin = async (id: string) => {
  return await axios.delete(
    `https://eabir-backend.onrender.com/api/v1/admins/${id}`
  );
};
export { GetAllAdmins, UpdateAdmin, CreateAdmin, DeleteAdmin };
