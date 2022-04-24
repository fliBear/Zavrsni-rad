function isObject(val) {
    if (val === null || typeof val === "function") {
        return false;
    }
    return typeof val === "object";
}

export { isObject };
