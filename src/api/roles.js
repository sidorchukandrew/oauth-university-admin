import axios from "axios";
import { generateAuthHeader } from "../utils/HttpUtils";

export default class RolesApi {
    static getAll() {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/roles", {
            headers: generateAuthHeader()
        });
    }

    static create(role) {
        return axios.post(process.env.REACT_APP_API_BASE_URL + "/roles", role, {
            headers: generateAuthHeader()
        });
    }

    static updateOne(roleId, edits) {
        return axios.patch(process.env.REACT_APP_API_BASE_URL + "/roles/" + roleId, edits, {
            headers: generateAuthHeader()
        });
    }
}