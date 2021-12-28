import { url } from "./Constants.js"
import { tableStandard } from "./Constants.js";
import { createData } from "./Helpers.js";
import { createTable, removeAllChildNodes, rowDeleter, rowEditor } from "./Table.js"
import { objectMaker } from "./Helpers.js"
import { createdTableStandard } from "./Constants.js"


function rowSaver(data, event, table) {

}

async function findButtonClickHandler() {
    let data = await createData(tableStandard, url);
    const table = createTable(tableStandard, data);
    const main = document.querySelector(".main");
    if (main.hasChildNodes()) {
        removeAllChildNodes(main);
    }
    main.append(table);
    const tdButtons = document.querySelectorAll(`.${tableStandard.tdButtonClassName}`);
    for (let button of tdButtons) {
        button.addEventListener("click", (event) => {
            if (button.textContent == "Delete") {
                data = rowDeleter(data, event, table);
            }
            if (button.textContent == "Update") {
                data = rowEditor(event);
            }
        })
    }
    findButton.removeEventListener("click", findButtonClickHandler);
}

function headerCreateButtonClickHandler() {
    const main = document.body.querySelector(".main");
    let table = document.querySelector(`.${tableStandard.tableElementClassName}`)
    if (main.hasChildNodes()) {
        removeAllChildNodes(main);
    }
    let data = [objectMaker(createdTableStandard, {
        date: "",
    })]
    table = createTable(createdTableStandard, data)
    main.append(table);
    const tdButtons = document.querySelectorAll(`.${createdTableStandard.tdButtonClassName}`);
    for (let button of tdButtons) {
        button.addEventListener("click", (event) => {
            if (button.textContent == "Delete") {
                data = rowDeleter(data, event, table);
            }
            if (button.textContent == "Edit") {
                data = rowEditor(event);
            }
        })
    }
    findButton.addEventListener("click", findButtonClickHandler)
}

const findButton = document.querySelector(".find_button");
findButton.addEventListener("click", findButtonClickHandler);
const createButton = document.querySelector(".table_create_button");
createButton.addEventListener("click", headerCreateButtonClickHandler);