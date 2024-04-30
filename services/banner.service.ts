import axios from "axios";

export const bannerService = () => axios.get(`api/banner?random=${Math.random() * 100000}`).then(res => res.data.url)

export const bannerQuoteService = () => axios.get('api/quote/random').then(res => res.data)