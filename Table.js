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

function createTableBody(table, tableStandard, data) {
    const tBodyElement = document.createElement("tbody");
    for (let object of data) {
        const currentBodyTrElement = document.createElement("tr");
        for (let key of Object.keys(object)) {
            const currentBodyTdElement = document.createElement("td");
            if (key != "events") {
                currentBodyTdElement.textContent = object[key];

            } else {
                const aElement = document.createElement("a")
                aElement.textContent = "View Match";
                aElement.target = "_blank";
                aElement.href = object[key];
                aElement.className += tableStandard.aElementClassName;
                currentBodyTdElement.append(aElement);
            }
            if (key == "buttons") {
                for (let value of tableStandard.buttons) {
                    const td_button = document.createElement("button");
                    td_button.textContent = value;
                    td_button.className = tableStandard.tdButtonClassName;
                    td_button.myId = object.id;
                    currentBodyTdElement.append(td_button);
                }
            }
            if (key == "id") {
                continue;
            }
            currentBodyTdElement.className += tableStandard.tdElementClassName;
            currentBodyTrElement.append(currentBodyTdElement);
        }
        currentBodyTrElement.className += tableStandard.tBodyTrElementClassName;
        tBodyElement.append(currentBodyTrElement);
    }
    table.append(tBodyElement);
}

export function rowEditor(event) {
    const row = event.target.parentNode.parentNode;
    for (let tdElement of row.children) {
        if (tdElement != event.target.parentNode) {
            tdElement.setAttribute("contenteditable", "true");
        }
    }
}

export function rowDeleter(data, event, table) {
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

export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function createTable(tableStandard, data) {
    const tableElement = document.createElement("table");
    createTableHeader(tableElement, tableStandard);
    createTableBody(tableElement, tableStandard, data);
    tableElement.className += tableStandard.tableElementClassName;
    return tableElement;
}