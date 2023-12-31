import axios from "axios";

export const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers =  {
            Authorization: token,
        }
    } else {
        delete axios.defaults.headers.Authorization;
    }
}