import { useState } from "react";
import uniqid from "uniqid";
import { isObject } from "./utils";
import { extractData, findData } from "./data-tools";
import { extractLinks } from "./link-tools";
import SingleEmbedded from "./SingleEmbedded";
//build data, build forms
export default function Embedded(props) {
    const [minimized, setMinimized] = useState(true);

    function minimizeOrMaximize() {
        setMinimized(!minimized);
    }

    if (props.someData["_embedded"] == undefined) {
        return;
    } else {
        //Generate an array of data to build embedded from.
        let dataToBuild = [];
        let embedded = props.someData["_embedded"];
        for (const e in embedded) {
            //Check if embedded is an array
            if (Array.isArray(embedded[e])) {
                for (const i in embedded[e]) {
                    let currentItem = embedded[e][i];
                    if (Object.keys(currentItem).length == 1) {
                        //possibly found element of type [{name:{data}}, ...]
                        const key = Object.keys(currentItem)[0];
                        if (isObject(currentItem[key])) {
                            //is of type [{name:{data}}, ...]
                            dataToBuild.push(currentItem[key]);
                        } else {
                            //is of type ["name":data, ...]
                            dataToBuild.push(currentItem);
                        }
                    } else {
                        //found element of type [{data}, ...]
                        dataToBuild.push(currentItem);
                    }
                }
            } else {
                dataToBuild.push(embedded[e]);
            }
        }
        return (
            <div>
                {dataToBuild.map((e) => {
                    const foundData = findData(e);
                    const links = extractLinks(e);
                    const forms = props.buildForms(links);
                    return (
                        <SingleEmbedded
                            key={uniqid()}
                            buildData={props.buildData}
                            forms={forms}
                            foundData={foundData}
                        ></SingleEmbedded>
                    );
                })}
            </div>
        );
    }
}
