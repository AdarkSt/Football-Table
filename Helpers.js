export function objectMaker(tableStandard, baseObject) {
    const object = {};
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
        }
    }
    return object;
}