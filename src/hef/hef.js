async function follow() {
    //First link must not be array as it is root of HATEOAS API
    if (Array.isArray(arguments[0])) {
        throw "Root must not be array.";
    }
    //Get root response
    let data = await getData(arguments[0]);

    for (var i = 1; i < arguments.length; i++) {
        let link;

        if (Array.isArray(arguments[i])) {
            //Get first attribute from data to follow
            link = data[arguments[i][0]];
            //Follow until "digging complete"
            for (var j = 1; j < arguments[i].length - 1; j++) {
                link = link[arguments[i][j]];
                if (link === undefined) {
                    throw `Could not find attribute: ${arguments[i][j]}`;
                }
            }
            //Last element in list is the name of the attribute (value is an object) that has a child href
            link = findLink(link, arguments[i][arguments[i].length - 1]);
        } else {
            link = findLink(data, arguments[i]);
        }

        if (link === undefined) {
            throw "Could not find link";
        }
        data = await getData(link["href"]);
    }

    return data;
}

async function getData(link) {
    return await fetch(link)
        .then((res) => res.json())
        .then((res) => {
            return res;
        })
        .catch((err) => console.log("Error while fetching data"));
}

function findLink(data, attribute) {
    let link;
    //Try to find link inside _links
    link = data["_links"];
    if (link !== undefined) {
        link = data["_links"][attribute];
    }
    //Try to find link and regular attribute
    if (link === undefined) {
        link = data[attribute];
    }
    return link;
}

export { follow };
