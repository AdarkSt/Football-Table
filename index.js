import { doRequest } from "./Requestes.js";
import { url } from "./Constants.js"
import { tableStandard } from "./Constants.js";
import { createTable } from "./Table.js"
import { objectMaker } from "./Helpers.js"

async function findMathes(tableStandard, url) {
    const matches = await doRequest(url);
    const matchesArray = matches.response;
    const dataObjects = [];
    matchesArray.forEach(item => {
        dataObjects.push(objectMaker(tableStandard, item));
    })
    console.log(dataObjects);
    return dataObjects;
}

async function findButtonClickHandler() {
    const data = await findMathes(tableStandard, url);
    const table = createTable(tableStandard, data);
    const main = document.querySelector(".main");
    main.append(table);
    findButton.removeEventListener("click", findButtonClickHandler);
}

const findButton = document.querySelector(".find_button");
findButton.addEventListener("click", findButtonClickHandler);