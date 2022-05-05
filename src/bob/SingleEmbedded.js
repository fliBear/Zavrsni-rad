import { useState } from "react";

export default function SingleEmbedded(props) {
    const [minimized, setMinimized] = useState(true);

    function minimizeOrMaximize() {
        setMinimized(!minimized);
    }

    return minimized ? (
        <div
            className="min-max-btn-container"
            style={props.styleData["min-max"]}
        >
            <button
                className="btn  min-max-btn"
                style={props.styleData["btn"]}
                onClick={() => minimizeOrMaximize()}
            >
                +
            </button>
        </div>
    ) : (
        <div style={props.styleData["embedded"]}>
            {props.buildData(props.foundData)}
            {props.forms}
            <div
                className="min-max-btn-container"
                style={props.styleData["min-max"]}
            >
                <button
                    className="btn  min-max-btn"
                    style={props.styleData["btn"]}
                    onClick={() => minimizeOrMaximize()}
                >
                    -
                </button>
            </div>
        </div>
    );
}
