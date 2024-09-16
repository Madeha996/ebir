import { httpApi } from "./http.api";

export interface SocialMedia {
  _id: string;
  link: string;
}
const GetContact = async () => {
  return await httpApi.get("socialMedia");
};

const UpdateContact = async (data: SocialMedia) => {
  return await httpApi.put(`socialMedia/${data?._id}`, { link: data?.link });
};

export { GetContact, UpdateContact };
