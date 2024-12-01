import { api } from "../../../lib/utils";

const getUsers = async (query: string) => (await api.get(`/user/admin/all${query}`)).data;

export const userPageApiService = { getUsers };
