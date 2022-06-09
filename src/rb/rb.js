import { follow } from "../hef/hef";
import { extractData, findData } from "./data-tools";
import { extractLinks } from "./link-tools";
import uniqid from "uniqid";
import "./rb-styles.css";
import TemplateForm from "./form-builder";
import { isObject } from "./utils";
import Embedded from "./Embedded";

export default class Rb {
    #includeEmbedded = false; // <--------------
    #toBuild;
    #specificAttributes = [];
    #useSpecificAttributes = false;
    styles = {};
    appRoot;
    nextIana = [];
    #redirect;

    setRedirect(redirect) {
        this.#redirect = redirect;
    }

    async path() {
        if (this.#redirect === undefined) {
            this.#toBuild = await follow(...arguments);
        } else {
            this.#toBuild = await follow(this.#redirect);
        }
        this.#toBuild = this.#toBuild[0];
        if (
            Object.keys(this.#toBuild).length === 1 &&
            this.#toBuild[Object.keys(this.#toBuild)[0]] != "_links"
        ) {
            for (const key in this.#toBuild) {
                this.#toBuild = this.#toBuild[key];
            }
        }
    }

    setAppRoot(root) {
        this.appRoot = root;
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

    setStyle(style, styleObj) {
        this.styles[style] = styleObj;
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

    #buildForms(someData, styleData, root) {
        let basicLinksForms = someData.map((l) => {
            if (l[0] == "next") {
                this.nextIana.unshift(["next", l[1]]);
                return;
            }
            if (isObject(l[1])) {
                return (
                    <TemplateForm
                        key={uniqid()}
                        submit={l[0]}
                        {...l[1]}
                        styleData={styleData}
                    ></TemplateForm>
                );
            } else {
                let redirected =
                    root === undefined
                        ? l[1]
                        : root + "/" + l[1].split("/").slice(3).join("/");
                return (
                    <p key={uniqid()}>
                        <a href={redirected}>{l[0]}</a>
                    </p>
                );
            }
        });
        let relationsLinks =
            this.nextIana !== undefined
                ? this.nextIana.map((l) => {
                      let redirected =
                          root === undefined
                              ? l[1]
                              : root + "/" + l[1].split("/").slice(3).join("/");
                      return (
                          <a href={redirected} key={uniqid()}>
                              <button
                                  className="btn"
                                  style={this.styles["btn"]}
                              >
                                  {l[0]}
                              </button>
                          </a>
                      );
                  })
                : "";
        return (
            <div>
                {basicLinksForms}
                {relationsLinks}
            </div>
        );
    }

    build() {
        const foundData = findData(this.#toBuild);
        const links = extractLinks(this.#toBuild);
        const forms = this.#buildForms(links, this.styles, this.appRoot);
        return (
            <div className="item-container" style={this.styles["container"]}>
                {this.#buildData(foundData)}
                {forms}
                {this.#includeEmbedded && (
                    <Embedded
                        buildData={this.#buildData}
                        buildForms={this.#buildForms}
                        someData={this.#toBuild}
                        styleData={this.styles}
                        root={this.appRoot}
                    ></Embedded>
                )}
            </div>
        );
    }
}
