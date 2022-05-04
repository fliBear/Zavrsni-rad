import { useState } from "react";

export default function SingleEmbedded(props) {
    const [minimized, setMinimized] = useState(true);

    function minimizeOrMaximize() {
        setMinimized(!minimized);
    }

    return minimized ? (
        <div className="min-max-btn-container">
            <button
                className="btn  min-max-btn"
                onClick={() => minimizeOrMaximize()}
            >
                +
            </button>
        </div>
    ) : (
        <div>
            {props.buildData(props.foundData)}
            {props.forms}
            <div className="min-max-btn-container">
                <button
                    className="btn  min-max-btn"
                    onClick={() => minimizeOrMaximize()}
                >
                    -
                </button>
            </div>
        </div>
    );
}
