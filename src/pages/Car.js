import Bob from "../bob/bob";
import { useEffect, useState } from "react";

export default function Car() {
    const [data, setData] = useState("");
    const bob = new Bob();

    useEffect(async () => {
        //Give path to data to show
        await bob.path("http://localhost:8080", "cars", "car2");
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
