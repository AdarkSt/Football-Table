import { findCountOf, getRandomInt } from "./helpers.js"

function createTableHeader(table, tableStandard) {
    const tHeadElement = document.createElement("tHead");
    const headerTrElement = document.createElement("tr");
    for (let collName of tableStandard.collumnNames) {
        const curentHeaderThElement = document.createElement("th");
        curentHeaderThElement.textContent = collName;
        curentHeaderThElement.className += tableStandard.thElementClassName;
        headerTrElement.append(curentHeaderThElement);
    }
    headerTrElement.className += tableStandard.headerTrElementClassName;
    tHeadElement.append(headerTrElement);
    table.append(tHeadElement);
}

function createTableBody(table) {
    const tbody = document.createElement("tbody");
    table.append(tbody);
}

function updater(clickEvent, table, tableStandard, row, object) {
    const currentCell = clickEvent.target;
    currentCell.addEventListener("keydown", (keyEvent) => {
        if (keyEvent.key == "Enter" && keyEvent.shiftKey) {
            currentCell.setAttribute("contenteditable", "false");
            const childrens = Array.from(row.children)
            let currentCellIndexInRow = childrens.findIndex(element => {
                if (element.textContent == currentCell.textContent) {
                    return true;
                }
                return false;
            })
            object[tableStandard.dataView[currentCellIndexInRow]] = currentCell.textContent;
            if (Object.keys(object).length == findCountOf(tableStandard.tableView, "data")) {
                object.id = getRandomInt();
                console.log(object);
                table.data.push(object);
            }
        }
    })
}

export function rowDeleter(data, event, tableElement) {
    let index = 0;
    for (let object of data) {
        if (object.id == event.target.myId) {
            data.splice(index, 1);
            break;
        }
        index++
    }
    const row = event.target.parentNode.parentNode;
    tableElement.querySelector("tbody").removeChild(row);
    return data;
}

export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function addRow(tableStandard, table) {
    const row = table.element.lastChild.insertRow(0);
    row.className = tableStandard.tBodyTrElementClassName;
    const object = {}
    for (let elem of tableStandard.tableView) {
        const cell = row.insertCell(-1);
        cell.className = tableStandard.tdElementClassName;
        if (elem == "data") {
            cell.setAttribute("contenteditable", "true");
            cell.addEventListener("click", (clickEvent) => {
                updater(clickEvent, table, tableStandard, row, object);
            })
        } else if (elem == "link") {
            const aElement = document.createElement("a");
            aElement.className = tableStandard.aElementClassName;
            aElement.textContent = "click me";
            cell.append(aElement);
        } else if (elem == "navigation") {
            for (let buttonName of tableStandard.buttons) {
                const buttonElement = document.createElement("button");
                buttonElement.className = tableStandard.tdButtonClassName;
                buttonElement.textContent = buttonName;
                cell.append(buttonElement);
            }
        }
    }
    return row;
}

export function createTable(tableStandard, firstData = []) {
    const tableElement = document.createElement("table");
    createTableHeader(tableElement, tableStandard);
    createTableBody(tableElement);
    tableElement.className += tableStandard.tableElementClassName;
    const tableData = firstData;
    return {
        data: tableData,
        element: tableElement,
    }
}