import Bob from "../bob/bob";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Car() {
    const [data, setData] = useState("");
    const bob = new Bob();
    const { id } = useParams();

    useEffect(async () => {
        //Give path to data to show
        await bob.path("http://localhost:8080", "cars", "car" + id);
        //Give instruction to build data and save inside state
        const getData = await bob.build();
        setData(getData);
    }, []);

    return (
        <div className="page-body">
            <p>Here is a car.</p>
            {data}
        </div>
    );
}
