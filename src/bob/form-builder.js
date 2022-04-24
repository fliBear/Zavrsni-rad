//!!!! zavrsit link-tools
import uniqid from "uniqid";
const { useState } = require("react");

export default function TemplateForm(data) {
    //title, method, target, properties, contentType

    const [formData, setFormData] = useState({});
    function handleSubmit(e) {
        e.preventDefault();
        console.log("submitting");
        // axios({
        //     url: data[target],
        //     data: JSON.stringify(formData),
        //     method: data[method],
        //     headers: {
        //         "Content-Type": data[contentType],
        //     },
        // });
    }

    const inputs =
        data["properties"] === null
            ? undefined
            : data["properties"].map((p) => {
                  return (
                      <div className="label-input-container" key={uniqid()}>
                          <label className="form-label" htmlFor={p["name"]}>
                              {p["name"]}:{" "}
                          </label>
                          <input className="form-input" {...p} id={p["name"]} />
                      </div>
                  );
              });

    return (
        <form
            className="template-form"
            title={data["title"] !== undefined ? data["title"] : ""}
            onSubmit={handleSubmit}
        >
            {inputs}
            <button className="submit-button">{data["submit"]}</button>
        </form>
    );
}
