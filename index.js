import { doRequest } from "./Requestes.js";
import { url } from "./Constants.js"
import { tableStandard } from "./Constants.js";
import { createTable } from "./Table.js"
import { objectMaker } from "./Helpers.js"
import { createdTableStandard } from "./Constants.js"

function rowDeleter(data, event, table) {
    let index = 0;
    for (let object of data) {
        if (object.id == event.target.myId) {
            data.splice(index, 1);
            break;
        }
        index++
    }
    const row = event.target.parentNode.parentNode;
    table.querySelector("tbody").removeChild(row);
    return data;
}

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
    let data = await findMathes(tableStandard, url);
    const table = createTable(tableStandard, data);
    const main = document.querySelector(".main");
    main.append(table);
    const tdButtons = document.querySelectorAll(".td_button");
    for (let button of tdButtons) {
        button.addEventListener("click", (event) => {
            if (button.textContent == "Delete") {
                data = rowDeleter(data, event, table);
            }
        })
    }
    findButton.removeEventListener("click", findButtonClickHandler);
}

function headerCreateButtonClickHandler() {
    const main = document.body.querySelector(".main");
    let table = document.querySelector(".table_Element")
    main.removeChild(table);
    const data = [objectMaker(createdTableStandard, {
        date: "",
    })]
    table = createTable(createdTableStandard, data)
    main.append(table);
    findButton.addEventListener("click", findButtonClickHandler)
}

const findButton = document.querySelector(".find_button");
findButton.addEventListener("click", findButtonClickHandler);
const createButton = document.querySelector(".table_create_button");

createButton.addEventListener("click", headerCreateButtonClickHandler);