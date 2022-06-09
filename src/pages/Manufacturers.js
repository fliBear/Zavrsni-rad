import Bob from "../bob/bob";
import { useEffect, useState } from "react";

export default function Manufacturers() {
    const [data, setData] = useState("");
    const bob = new Bob();

    useEffect(async () => {
        //Give path to data to show
        await bob.path("http://localhost:8080", "manufacturers");
        bob.includeEmbedded();
        bob.setAppRoot("http://localhost:3000");
        bob.setStyle("container", {
            backgroundColor: "#2C2C2EFF",
            color: "white",
            width: "70vw",
        });
        bob.setStyle("min-max", {
            height: "3rem",
            backgroundColor: "#EBEBF52E",
        });
        bob.setStyle("embedded-container", {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
        });
        bob.setStyle("form", {
            width: "25vw",
            borderColor: "#c9c9c9",
        });
        bob.setStyle("btn", {
            backgroundColor: "#EBEBF599",
        });
        //Give instruction to build data and save inside state
        const getData = await bob.build();
        setData(getData);
    }, []);

    return (
        <div className="page-body">
            <h2 className="description">
                Here is a component created from data of all current
                manufacturers.
            </h2>
            {data}
        </div>
    );
}
