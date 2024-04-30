import axios from "axios";

export const listService = (page?: string | number, limit?: string | number, search?: string) => axios.get('api/quote', {
  params: {page, limit, search}
}).then(res => res.data)