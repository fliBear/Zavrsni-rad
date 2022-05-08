import uniqid from "uniqid";
import axios from "axios";
const { useState, useEffect } = require("react");

const Inputs = () => null;

export default function TemplateForm(data) {
    //title, method, target, properties, contentType

    const [formData, setFormData] = useState({});
    useEffect(() => {
        let res = {};
        for (const p of data["properties"]) {
            res[p["name"]] = "";
        }
        setFormData(res);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await axios({
            url: data["target"],
            data: JSON.stringify(formData),
            method: "post",
            headers: { "Content-Type": "application/json" },
        });
        window.location.reload();
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    return (
        <form
            className="template-form"
            title={data["title"] !== undefined ? data["title"] : ""}
            onSubmit={handleSubmit}
            style={data.styleData["form"]}
        >
            {data["properties"] === null
                ? undefined
                : data["properties"].map((p) => {
                      return (
                          <div
                              className="label-input-container"
                              key={p["name"]}
                          >
                              <label className="form-label" htmlFor={p["name"]}>
                                  {p["name"]}:{" "}
                              </label>
                              <input
                                  className="form-input"
                                  {...p}
                                  readOnly={false}
                                  id={p["name"]}
                                  onChange={handleChange}
                                  //   value={formData[p["name"]]}
                              />
                          </div>
                      );
                  })}
            <button className="btn" style={data.styleData["btn"]}>
                {data["submit"]}
            </button>
        </form>
    );
}
