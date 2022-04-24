import { follow } from "../hef/hef";
import { extractData, findData } from "./data-tools";
import { extractLinks } from "./link-tools";
import uniqid from "uniqid";
import "./bob-styles.css";
import TemplateForm from "./form-builder";
import { isObject } from "./utils";

export default class Bob {
    #includeEmbedded = false; // <--------------
    #toBuild;
    #links;
    #specificAttributes = [];
    #useSpecificAttributes = false;

    async path() {
        this.#toBuild = await follow(...arguments);
        if (
            Object.keys(this.#toBuild).length === 1 &&
            this.#toBuild[Object.keys(this.#toBuild)[0]] != "_links"
        ) {
            for (const key in this.#toBuild) {
                this.#toBuild = this.#toBuild[key];
            }
        }
    }

    useSpecificAttributes(attributes) {
        if (!Array.isArray(attributes)) {
            throw "Use useSpecificAttributes takes an array as argument.";
        }
        this.#useSpecificAttributes = true;
        this.#specificAttributes = attributes;
    }

    includeEmbedded() {
        this.#includeEmbedded = true;
    }

    #buildData(someData) {
        return (
            <div>
                {someData.map((it) => {
                    if (Array.isArray(it[1])) {
                        return (
                            <div key={uniqid()}>
                                <h3>{it[0]}</h3>
                                <div className="sub-category-container">
                                    {it[1].map((childIt) => {
                                        return (
                                            <p key={uniqid()}>
                                                {childIt[0]} : {childIt[1]}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <p key={uniqid()}>
                                {it[0]} : {it[1]}
                            </p>
                        );
                    }
                })}
            </div>
        );
    }

    #buildForms(someData) {
        return someData.map((l) => {
            if (isObject(l[1])) {
                return (
                    <TemplateForm
                        key={uniqid()}
                        submit={l[0]}
                        {...l[1]}
                    ></TemplateForm>
                );
            } else {
                return (
                    <p key={uniqid()}>
                        <a href={l[1]}>{l[0]}</a>
                    </p>
                );
            }
        });
    }

    #buildEmbedded(someData) {
        if (someData["_embedded"] == undefined) {
            return;
        } else {
            let dataToBuild = [];
            let embedded = someData["_embedded"];
            for (const e in embedded) {
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
                        const forms = this.#buildForms(links);
                        return (
                            <div key={uniqid()} className="item-container">
                                {this.#buildData(foundData)}
                                {forms}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    build() {
        const foundData = findData(this.#toBuild);
        const links = extractLinks(this.#toBuild);
        const forms = this.#buildForms(links);
        return (
            <div className="item-container">
                {this.#buildData(foundData)}
                {forms}
                {this.#includeEmbedded && this.#buildEmbedded(this.#toBuild)}
            </div>
        );
    }
}
