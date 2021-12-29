import { doRequest } from "./Requestes.js";

export function getRandomInt(min = 100, max = 100000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function findCountOf(arr, value) {
    let count = 0;
    for (let elem of arr) {
        if (elem === value)
            ++count;
    }
    return count;
}

export function objectMaker(tableStandard, baseObject) {
    const object = {
        id: getRandomInt(),
    };
    for (let value of tableStandard.dataView) {
        if (value == "events") {
            object[value] = baseObject.matchviewUrl;
        } else if (value == "teams") {
            object[value] = baseObject.title;
        } else if (value == "league") {
            object[value] = baseObject.competition;
        } else if (value == "date") {
            let date = baseObject.date.slice(0, 10);
            let time = baseObject.date.slice(11, 16);
            object[value] = date + "/" + time;
        } else {
            object[value] = "";
        }
    }
    return object;
}

export async function createData(tableStandard, url) {
    const matches = await doRequest(url);
    const matchesArray = matches.response;
    const dataObjects = [];
    matchesArray.forEach(item => {
        dataObjects.push(objectMaker(tableStandard, item));
    })
    console.log(dataObjects);
    return dataObjects;
}