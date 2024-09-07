import { NewsModal } from "@app/domain/AppModal";
import { httpApi } from "./http.api";
import axios from "axios";

// export interface PagesTableRow {
//   id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Pagination {
//   current?: number;
//   pageSize?: number;
//   total?: number;
// }

// export interface PagesTableData {
//   data: PagesTableRow[];
//   pagination: Pagination;
// }

const baseURL = `/socialMedia`;

const GetContact = async () => {
  return await axios.get(
    "https://eabir-backend.onrender.com/api/v1/socialMedia"
  );
};

const UpdateContact = async (data: NewsModal) => {
  return await axios.put(
    `https://eabir-backend.onrender.com/api/v1/news/${data?._id}`,
    { title: data?.title }
  );
};

export { GetContact, UpdateContact };
