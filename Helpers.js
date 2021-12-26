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
            object[value] = baseObject.date;
        }
    }
    return object;
}