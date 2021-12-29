import { findCountOf, getRandomInt } from "./helpers.js"

export class EventHandling {
    constructor(tableStandard, table, data, row, object) {
        this.tableStandard = tableStandard;
        this.table = table;
        this.data = data;
        this.row = row;
        this.object = object;
    }

    rowDeleter(data, event, tableElement) {
        let index = 0;
        for (let object of data) {
            if (object.id == event.target.parentNode.parentNode.myId) {
                data.splice(index, 1);
                break;
            }
            index++
        }
        const row = event.target.parentNode.parentNode;
        tableElement.querySelector("tbody").removeChild(row);
        console.log(data);
        return data;
    }

    updater(clickEvent, data, tableStandard, row, object) {
        const currentCell = clickEvent.target;
        currentCell.addEventListener("keydown", (keyEvent) => {
            if (keyEvent.key == "Enter" && keyEvent.shiftKey) {
                currentCell.setAttribute("contenteditable", "false");
                const childrens = Array.from(row.children)
                let currentCellIndexInRow = childrens.findIndex(element => {
                    if (element.textContent == currentCell.textContent)
                        return true;
                    return false;
                })
                object[tableStandard.dataView[currentCellIndexInRow]] = currentCell.textContent;
                if (Object.keys(object).length == findCountOf(tableStandard.tableView, "data")) {
                    object.id = getRandomInt();
                    currentCell.parentNode.myId = object.id;
                    data.push(object);
                    console.log(data);
                }
            }
        })
    }

    handleEvent(event) {
        if (event.target.textContent == "Delete") {
            const answer = confirm("Do you really want to delete this row?")
            if (answer) {
                this.data = this.rowDeleter(this.data, event, this.table);
            }
        }
        if (event.target.textContent == "Update") {
            console.log(event.target);
            const currentRowCells = event.target.parentNode.parentNode.children;
            const childrensOfRow = Array.from(currentRowCells);
            let indexInTableView = 0
            for (let cell of childrensOfRow) {
                if (this.tableStandard.tableView[indexInTableView] == "data") {
                    cell.setAttribute("contenteditable", "true");
                    ++indexInTableView;
                }
                this.updater(event, this.data, this.tableStandard, this.row, this.object);
            }
        }
        if (event.target.nodeName != "button") {
            this.updater(event, this.data, this.tableStandard, this.row, this.object);
        }
    }
}