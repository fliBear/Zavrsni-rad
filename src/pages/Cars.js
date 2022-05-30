import Bob from "../bob/bob";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Cars() {
    const [data, setData] = useState("");
    const bob = new Bob();
    const { pathname } = useLocation();

    useEffect(async () => {
        //Give path to data to show
        let path = ["http://localhost:8080", "cars-pages"];
        bob.setRedirect(path[0] + pathname);
        await bob.path(...path);
        bob.includeEmbedded();
        bob.setAppRoot("http://localhost:3000");
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
