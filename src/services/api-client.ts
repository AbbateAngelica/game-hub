import axios from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
  }

export default axios.create({
    params: {
        key: '7e646248a5d34bb29ef85a57ee2858c1'
    },
    baseURL: 'https://api.rawg.io/api'
})