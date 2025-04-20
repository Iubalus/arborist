export function dolist(values: String[]) {
    if (values.length == 0) {
        return "";
    }
    if (values.length == 1) {
        return values[0];
    } else {
        let oxford = values.length > 2 ? "," : "";
        return values.slice(0, -1).join(", ") + oxford + " and " + values.slice(-1);
    }
}