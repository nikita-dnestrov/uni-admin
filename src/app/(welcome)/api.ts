import { api } from "../../lib/utils";

const login = async (data: { email: string; password: string }) => (await api.post(`/auth/admin-login`, data)).data;

export const welcomePageApiService = { login };
