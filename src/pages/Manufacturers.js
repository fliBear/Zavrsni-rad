import Rb from "../rb/rb";
import { useEffect, useState } from "react";

export default function Manufacturers() {
    const [data, setData] = useState("");
    const rb = new Rb();

    useEffect(async () => {
        //Give path to data to show
        await rb.path("http://localhost:8080", "manufacturers");
        rb.includeEmbedded();
        rb.setAppRoot("http://localhost:3000");
        rb.setStyle("container", {
            backgroundColor: "#2C2C2EFF",
            color: "white",
            width: "70vw",
        });
        rb.setStyle("min-max", {
            height: "3rem",
            backgroundColor: "#EBEBF52E",
        });
        rb.setStyle("embedded-container", {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
        });
        rb.setStyle("form", {
            width: "25vw",
            borderColor: "#c9c9c9",
        });
        rb.setStyle("btn", {
            backgroundColor: "#EBEBF599",
        });
        //Give instruction to build data and save inside state
        const getData = await rb.build();
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
