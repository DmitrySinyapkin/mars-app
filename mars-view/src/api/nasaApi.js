import { BASE_URL, API_KEY_VALUE, GET_METHOD } from "../constants/nasaApi";

async function createFetch(url) {
    const response = await fetch(url, {
        method: GET_METHOD
    });
    return await response.json();
}

export const getRoverPhotos = (rover, sol, page) => {
    const url = BASE_URL + '/rovers/' + rover + '/photos?sol=' + sol + '&page=' + page + '&api_key=' + API_KEY_VALUE;
    return createFetch(url);
}

export const getRoverInfo = (rover) => {
    const url = BASE_URL + '/manifests/' + rover + '?api_key=' + API_KEY_VALUE;
    return createFetch(url);
}
