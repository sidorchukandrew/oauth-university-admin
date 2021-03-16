import axios from "axios";
import { generateAuthHeader } from "../utils/HttpUtils";

export default class UsersApi {
    static getCurrentUser() {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/users/me", {
            headers: generateAuthHeader()
        });
    }
}