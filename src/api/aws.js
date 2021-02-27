import axios from "axios";

export default class AwsApi {

    static getUploadConfig() {
        return axios.get(process.env.REACT_APP_API_BASE_URL + "/aws/images/signed_url");
    }

    static uploadImage(presignedUrl, image) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', presignedUrl);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {

                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(image);
    }

    static deleteImage(imageUrl) {
        return axios.delete(process.env.REACT_APP_API_BASE_URL + "/aws/images?imageUrl=" + imageUrl);
    }
}