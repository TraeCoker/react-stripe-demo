const API = 'http://localhost:3000'

/**
 * A helper function to fetch data from your API.
 */

export async function fetchFromAPI(endpointURL, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts };

    const res = await fetch(`${API}/${endpointURL}`, {
        method, 
        ...fetch(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return res.json();
}