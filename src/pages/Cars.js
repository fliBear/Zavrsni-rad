import Rb from "../rb/rb";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Cars() {
    const [data, setData] = useState("");
    const rb = new Rb();
    const { pathname } = useLocation();

    useEffect(async () => {
        //Give path to data to show
        let path = ["http://localhost:8080", "cars-pages"];
        rb.setRedirect(path[0] + pathname);
        await rb.path(...path);
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
                Here is a component created from data of all available cars.
            </h2>
            {data}
        </div>
    );
}
