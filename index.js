import { url } from "./Constants.js"
import { tableStandard } from "./Constants.js";
import { createData } from "./Helpers.js";
import { addRow, createTable, removeAllChildNodes, rowDeleter, rowEditor } from "./Table.js"
import { objectMaker } from "./Helpers.js"

const findButton = document.querySelector(".find_button");
findButton.addEventListener("click", handleFindButtonClick);
const createButton = document.querySelector(".table_create_button");
createButton.addEventListener("click", handleCreateButtonClick);

let table = {};

function handleCreateButtonClick() {
    const main = document.querySelector(".main");
    if (main.children.length == 0) {
        table = createTable(tableStandard);
        main.append(table.element);
        addRow(tableStandard, table);
    } else {
        table.element = document.querySelector(`.${tableStandard.tableElementClassName}`);
        addRow(tableStandard, table);
    }
}

function handleFindButtonClick() {

}