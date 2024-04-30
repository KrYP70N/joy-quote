import axios from "axios";

export const bannerService = (random: number) => axios.post(`api/banner?random=${random * 100000}`).then(res => res.data.url)

export const bannerQuoteService = (random: number) => axios.post(`api/quote/random?key=${random * 100000}`).then(res => res.data)