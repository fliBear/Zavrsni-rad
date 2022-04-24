//Takes extracted data and returns an array of values for each attribute
function findData(extractedData) {
    const buildData = [];
    for (const d in extractedData) {
        //Skips any attributes listen in to if condition
        if (d == "_links" || d == "_embedded" || d == "_templates") {
            continue;
        }
        //Found an attribute that is an object, so finds its data !!!!! must have no objects or arrays as children
        if (isObject(extractedData[d])) {
            const helpData = Object.entries(extractedData[d]);
            for (let i = helpData.length - 1; i >= 0; i--) {
                if (
                    helpData[i][0] == "_links" ||
                    helpData[i][0] == "_embedded" ||
                    helpData[i][0] == "_templates"
                ) {
                    helpData.pop(i);
                }
            }
            buildData.push([d, helpData]);
        } else {
            buildData.push([d, extractedData[d]]);
        }
    }
    return buildData;
}

function isObject(val) {
    if (val === null || typeof val === "function") {
        return false;
    }
    return typeof val === "object";
}

export { findData };
