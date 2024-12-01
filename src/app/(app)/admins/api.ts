import { api } from "../../../lib/utils";

const getAdmins = async (query: string) => (await api.get(`/admin/all${query}`)).data;
const updateAdminPassword = async (adminId: string, password: string) =>
  (await api.put(`/admin/password/${adminId}`, { password })).data;
const createAdmin = async (data: { email: string; password: string }) => (await api.post(`/admin/`, data)).data;

export const adminPageApiService = { getAdmins, updateAdminPassword, createAdmin };
