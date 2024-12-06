import axios from "axios";

function getAxios() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentToken"));
    if (currentUser) {
        return axios.create(
            {
                baseURL: "http://localhost:8080/",
                headers: {"Authorization": `Bearer ${currentUser.accessToken}`}
            }
        )
    } else {
        return axios.create(
            {
                baseURL: "http://localhost:8080/"
            }
        )
    }
}
export default getAxios;