import axios from "axios";
import { generateAuthHeader } from "../utils/HttpUtils";

export default class GuidesApi {
    static create(guide) {
        return axios.post(process.env.REACT_APP_API_BASE_URL + "/guides", guide);
    }

    static getAll() {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/guides", {
            headers: generateAuthHeader()
        });
    }

    static getOne(id) {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/guides/" + id, {
            headers: generateAuthHeader()
        });
    }

    static updateOne(guideId, updates) {

        if (updates.sections) {
            updates.sections_attributes = updates.sections;

            updates.sections_attributes = updates.sections_attributes.map(section => {
                let baseSection = {
                    content: section.content,
                    section_type: section.section_type,
                    ordinal: section.ordinal,
                    id: section.id
                };

                if (section.section_type === "component" && section.content === "button generator") {
                    baseSection.oauth_config_attributes = section.oauth_config;
                }

                return baseSection;
            });
            delete updates.sections;
        }

        return axios.patch(process.env.REACT_APP_API_BASE_URL + "/guides/" + guideId, updates, {
            headers: generateAuthHeader()
        });
    }

    static delete(guideId) {
        return axios.delete(process.env.REACT_APP_API_BASE_URL + "/guides/" + guideId);
    }

    static getByFilters(filters) {
        let queryParams = Object.keys(filters).map(key => key + "=" + filters[key]).join("&");
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/guides?" + queryParams);
    }
}