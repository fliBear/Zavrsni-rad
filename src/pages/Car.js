import Bob from "../bob/bob";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Car() {
    const [data, setData] = useState("");
    const bob = new Bob();
    const { id } = useParams();

    useEffect(async () => {
        bob.setAppRoot("http://localhost:3000");
        //Give path to data to show
        await bob.path("http://localhost:8080", "cars", "car" + id);
        bob.setStyle("container", {
            backgroundColor: "#2C2C2EFF",
            color: "white",
            width: "70vw",
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
            <h2 className="description">Here is a car.</h2>
            {data}
        </div>
    );
}
