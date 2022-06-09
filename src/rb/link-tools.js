function linksAndTemplatesMatcing(data) {
    const templates = data["_templates"];
    const links = data["_links"];
    const linkData = [];
    //Save all templates
    for (const temp in templates) {
        if (templates[temp]["target"] === undefined) {
            throw "Response must have target in template if _links and _templates are not of matching sizes.";
        }
        //If title for template not given, save link so title from _links can be taken
        if (templates[temp]["title"] === undefined) {
            linkData.push([templates[temp]["target"], templates[temp]]);
        } else {
            linkData.push([templates[temp]["title"], templates[temp]]);
        }
    }
    //Fix names of those with links for names
    for (const link in links) {
        let title = null;
        //Set title for link
        if (links[link]["title"] === undefined) {
            title = link;
        } else {
            title = links[link]["title"];
        }
        //Change title where needed
        for (let i = 0; i < linkData.length; i++) {
            if (linkData[i][0] === links[link]["href"]) {
                linkData[i][0] = title;
            }
        }
    }
    return linkData;
}

function linksAndTemplatesMissmatching(data) {
    const targets = [];
    const templates = data["_templates"];
    const links = data["_links"];
    const linkData = [];
    //Save all templates
    for (const temp in templates) {
        if (templates[temp]["target"] === undefined) {
            throw "Response must have target in template if _links and _templates are not of matching sizes.";
        }
        //Save all targets
        targets.push(templates[temp]["target"]);
        //If title for template not given, save link so title from _links can be taken
        if (templates[temp]["title"] === undefined) {
            linkData.push([templates[temp]["target"], templates[temp]]);
        } else {
            linkData.push([templates[temp]["title"], templates[temp]]);
        }
    }
    //Save all links not saved previously, and fix names of those with links for names
    for (const link in links) {
        let title = null;
        //Set title for link
        if (links[link]["title"] === undefined) {
            title = link;
        } else {
            title = links[link]["title"];
        }
        //If new link is found (that means not from template), add it
        if (!targets.includes(links[link]["href"])) {
            linkData.push([title, links[link]["href"]]);
        } else {
            //Change title where needed
            for (let i = 0; i < linkData.length; i++) {
                if (linkData[i][0] === links[link]["href"]) {
                    linkData[i][0] = title;
                    break;
                }
            }
        }
    }
    return linkData;
}

function extractLinks(data) {
    if ("_links" in data) {
        //If response has templates
        if ("_templates" in data) {
            //Each template has a corresponding link
            if (
                Object.entries(data["_links"]).length ===
                Object.entries(data["_templates"]).length
            ) {
                return linksAndTemplatesMatcing(data);
            } else {
                //Some links have a template
                return linksAndTemplatesMissmatching(data);
            }
        } else {
            //No templates so just return links (it is assumed that all links are GET calls)
            const linkData = [];
            const links = data["_links"];
            for (const link in links) {
                if ("title" in links[link]) {
                    linkData.push([links[link]["title"], links[link]["href"]]);
                } else {
                    linkData.push([link, links[link]["href"]]);
                }
            }
            return linkData;
        }
    } else {
        return false;
    }
}

export { extractLinks };
