
import axios from "axios";
import { generateAuthHeader } from "../utils/HttpUtils";

export default class SeriesApi {

    static create(series) {
        return axios.post(process.env.REACT_APP_API_BASE_URL + "/series", series, {
            headers: {
                "Authorization": "Bearer "
            }
        });
    }

    static getAll() {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/series", {
            headers: generateAuthHeader()
        });
    }

    static publishBulk(seriesIds) {
        let url = process.env.REACT_APP_API_BASE_URL + "/series?";

        for (let i = 0; i < seriesIds.length; i++) {
            if (i === 0) {
                url = url + "ids[]=" + seriesIds[i]
            }

            else {
                url = url + "&ids[]=" + seriesIds[i];
            }
        }

        return axios.patch(url, {
            published: true,
            publishedDate: new Date()
        });
    }

    static unpublishBulk(seriesIds) {
        let url = process.env.REACT_APP_API_BASE_URL + "/series?";

        for (let i = 0; i < seriesIds.length; i++) {
            if (i === 0) {
                url = url + "ids[]=" + seriesIds[i]
            }

            else {
                url = url + "&ids[]=" + seriesIds[i];
            }
        }

        return axios.patch(url, {
            published: false,
        });
    }

    static deleteBulk(seriesIds) {
        let url = process.env.REACT_APP_API_BASE_URL + "/series?";

        for (let i = 0; i < seriesIds.length; i++) {
            if (i === 0) {
                url = url + "ids[]=" + seriesIds[i]
            }

            else {
                url = url + "&ids[]=" + seriesIds[i];
            }
        }

        return axios.delete(url);
    }

    static delete(seriesId) {
        return axios.delete(process.env.REACT_APP_API_BASE_URL + "/series/" + seriesId);
    }

    static publish(seriesId) {
        return axios.patch(process.env.REACT_APP_API_BASE_URL + "/series/" + seriesId, {
            published: true,
        });
    }

    static unpublish(seriesId) {
        return axios.patch(process.env.REACT_APP_API_BASE_URL + "/series/" + seriesId, {
            published: false,
        });
    }

    static getOne(seriesId) {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/series/" + seriesId, {
            headers: generateAuthHeader()
        });
    }

    static updateOne(seriesId, updates) {
        return axios.patch(process.env.REACT_APP_API_BASE_URL + "/series/" + seriesId, updates);
    }
}