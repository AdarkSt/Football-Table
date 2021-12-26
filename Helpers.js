function getRandomIntInclusive(min = 100, max = 100000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function objectMaker(tableStandard, baseObject) {
    const object = {
        id: getRandomIntInclusive(),
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