import axios from "axios";

export default class AuthApi {
    static login(email, password) {
        let credentials = { email, password };
        return axios.post(process.env.REACT_APP_API_BASE_URL + "/auth/login", credentials);
    }
}