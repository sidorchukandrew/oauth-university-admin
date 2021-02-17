
import axios from "axios";

export default class SeriesApi {

    static create(series) {
        return axios.post("http://localhost:3001/series", series);
    }

    static getAll() {
        return axios.get("http://localhost:3001/series");
    }

    static publishBulk(seriesIds) {
        let url = "http://localhost:3001/series?";

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
        let url = "http://localhost:3001/series?";

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
        let url = "http://localhost:3001/series?";

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
        return axios.delete("http://localhost:3001/series/" + seriesId);
    }

    static publish(seriesId) {
        return axios.patch("http://localhost:3001/series/" + seriesId, {
            published: true,
        });
    }

    static unpublish(seriesId) {
        return axios.patch("http://localhost:3001/series/" + seriesId, {
            published: false,
        });
    }

    static getOne(seriesId) {
        return axios.get("http://localhost:3001/series/" + seriesId);
    }

    static updateOne(seriesId, updates) {
        return axios.patch("http://localhost:3001/series/" + seriesId, updates);
    }
}