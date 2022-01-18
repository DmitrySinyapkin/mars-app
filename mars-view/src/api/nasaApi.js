import { BASE_URL, API_KEY_VALUE, GET_METHOD } from "../constants/nasaApi";

async function createFetch(url) {
    const response = await fetch(url, {
        method: GET_METHOD
    });
    return await response.json();
}

export const getRoverPhotos = (rover, sol) => {
    const url = BASE_URL + rover + '/photos?sol=' + sol + '&api_key=' + API_KEY_VALUE;
    return createFetch(url);
}
