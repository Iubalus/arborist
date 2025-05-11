export function generateUUID() {
    let template = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let uuid = "";
    for (let i = 0; i < template.length; i++) {
        if (template.charAt(i) == 'X') {
            uuid += hex[Math.floor(Math.random() * hex.length)];
        } else {
            uuid += template.charAt(i);
        }
    }
    return uuid;
}