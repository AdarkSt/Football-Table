import { EventHandling } from "./table_events_handl.js"

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

export function addRow(tableStandard, table) {
    const row = table.element.lastChild.insertRow(0);
    row.className = tableStandard.tBodyTrElementClassName;
    const object = {}
    const handler = new EventHandling(tableStandard, table.element, table.data, row, object);
    for (let elem of tableStandard.tableView) {
        const cell = row.insertCell(-1);
        cell.className = tableStandard.tdElementClassName;
        if (elem == "data") {
            cell.setAttribute("contenteditable", "true");
            cell.addEventListener("click", handler);
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
                buttonElement.addEventListener("click", handler);
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