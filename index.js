import { doRequest } from "./Requestes.js";
import { url } from "./Constants.js"

async function findMathes(url) {
    const matches = await doRequest(url);
    return matches;
}

const findButton = document.querySelector(".find_button");
findButton.addEventListener("click", () => {
    findMathes(url);
});