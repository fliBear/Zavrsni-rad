import Bob from "../bob/bob";
import { useEffect, useState } from "react";

export default function Cars() {
    const [data, setData] = useState("");
    const bob = new Bob();

    useEffect(async () => {
        //Give path to data to show
        await bob.path("http://localhost:8080", "cars");
        bob.includeEmbedded();
        //Give instruction to build data and save inside state
        const getData = await bob.build();
        setData(getData);
    }, []);

    return (
        <div className="page-body">
            <p>Here is a component created from data of all available cars.</p>
            {data}
        </div>
    );
}
