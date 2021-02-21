import axios from "axios";

export default class GuidesApi {
    static create(guide) {
        return axios.post("http://localhost:3001/guides", guide);
    }

    static getAll() {
        return axios.get("http://localhost:3001/guides");
    }

    static getOne(id) {
        return axios.get("http://localhost:3001/guides/" + id);
    }

    static updateOne(guideId, updates) {
        return axios.patch("http://localhost:3001/guides/" + guideId, updates);
    }
}