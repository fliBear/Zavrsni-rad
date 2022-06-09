import Rb from "../rb/rb";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Manufacturer() {
    const [data, setData] = useState("");
    const rb = new Rb();
    const { id } = useParams();

    useEffect(async () => {
        rb.setAppRoot("http://localhost:3000");
        //Give path to data to show
        await rb.path(
            "http://localhost:8080",
            "manufacturers",
            "manufacturer" + id
        );
        rb.setStyle("container", {
            backgroundColor: "#2C2C2EFF",
            color: "white",
            width: "70vw",
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
            <h2 className="description">Here is a manufacturer.</h2>
            {data}
        </div>
    );
}
