export async function doRequest(url) {
    const response = await fetch(url);
    const jsonOfResponse = await response.json();
    return jsonOfResponse;
}