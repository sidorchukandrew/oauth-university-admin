export function generateAuthHeader() {
    return {
        "Authorization": "Bearer " + localStorage.getItem("ACCESS_TOKEN")
    };
}