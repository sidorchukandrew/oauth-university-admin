import axios from "axios";
import { generateAuthHeader } from "../utils/HttpUtils";

export default class PermissionsApi {
    static getAll() {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/permissions", {
            headers: generateAuthHeader()
        });
    }
}