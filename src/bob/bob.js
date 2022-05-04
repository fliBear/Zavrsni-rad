import { follow } from "../hef/hef";
import { extractData, findData } from "./data-tools";
import { extractLinks } from "./link-tools";
import uniqid from "uniqid";
import "./bob-styles.css";
import TemplateForm from "./form-builder";
import { isObject } from "./utils";
import Embedded from "./Embedded";

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

    build() {
        const foundData = findData(this.#toBuild);
        const links = extractLinks(this.#toBuild);
        const forms = this.#buildForms(links);
        return (
            <div className="item-container">
                {this.#buildData(foundData)}
                {forms}
                {this.#includeEmbedded && (
                    <Embedded
                        buildData={this.#buildData}
                        buildForms={this.#buildForms}
                        someData={this.#toBuild}
                    ></Embedded>
                )}
            </div>
        );
    }
}
