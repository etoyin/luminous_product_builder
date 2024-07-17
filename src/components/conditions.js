export const recommendPanel = (entry) => {
    let result = "";
    switch (true) {
        case entry > 0 && entry <= 0.5:
            result = [1, 'Unit of 200W Solar Panel'];
            break;
        case entry > 0.5 && entry <= 1:
            result = [1, 'Unit of 400W Solar Panel'];
            break;
        case entry > 1 && entry <= 1.4:
            result = [1, 'Unit of 545W Solar Panel'];
            break;
        case entry > 1.4 && entry <= 5.7:
            result = [4, 'Units of 545W Solar Panels'];
            break;
        case entry > 5.7 && entry <= 8.6:
            result = [6, 'Units of 545W Solar Panels'];
            break;
        case entry > 8.6 && entry <= 12.9:
            result = [9, 'Units of 545W Solar Panels'];
            break;
        case entry > 12.9 && entry <= 25.8:
            result = [18, 'Units of 545W Solar Panels'];
            break;
        case entry > 25.8 && entry <= 38.64:
            result = [27, 'Units of 545W Solar Panels'];
            break;
        case entry > 38.64 && entry <= 51.5:
            result = [36, 'Units of 545W Solar Panels'];
            break;
        case entry > 51.5 && entry <= 77.3:
            result = [54, 'Units of 545W Solar Panels'];
            break;
        case entry > 51.5 && entry <= 77.3:
            result = [54, 'Units of 545W Solar Panels'];
            break;
        case entry > 77.3:
            result = [Math.ceil((1000 * entry)/0.75/3.5/545), 'Units of 545W Solar Panels'];
            break;
        default:
            break;
    }

    return result;

}
export const recommendBattery = (entry) =>{
    let result = "";

    switch (true) {
        case entry > 0 && entry <= 0.6:
            result = [[1, "Inaeko 1.2kVA|614Wh Solar Generator (Inverter + Battery)"]]
            break;
        case entry > 0.6 && entry <= 1.5:
            result = [[1, "Inaeko 2.2kVA|1536Wh Solar Generator (Inverter + Battery)"]]
            break;
        case entry > 1.5 && entry <= 4.36:
            result = [[1, "Unit of Arnergy 5.12kWh Battery"], [2, "Units of Inaeko 2.18kWh Battery"]]
            break;
        case entry > 4.36 && entry <= 5.12:
            result = [[1, "Unit of Arnergy 5.12kWh Battery"], [3, "Units of Inaeko 2.18kWh Battery "]]
            break;
        case entry > 5.12 && entry <= 10.24:
            result = [[2, "Unit of Arnergy 5.12kWh Battery"], [5, "Units of Inaeko 2.18kWh Battery"]]
            break;
        case entry > 10.24 && entry <= 15.36:
            result = [[3, "Unit of Arnergy 5.12kWh Battery"], [8, "Units of Inaeko 2.18kWh Battery "]]
            break;
        case entry > 15.36 && entry <= 20.48:
            result = [[4, "Unit of Arnergy 5.12kWh Battery"], [10, "Units of Inaeko 2.18kWh Battery"]]
            break;
        case entry > 20.48 && entry <= 30.72:
            result = [[6," Unit of Arnergy 5.12kWh Battery"], [15, "Units of Inaeko 2.18kWh Battery"]]
            break;
        case entry > 30.72 && entry <= 46.08:
            result = [[8, "Unit of Arnergy 5.12kWh Battery"], [22, "Units of Inaeko 2.18kWh Battery"]]
            break;
        case entry > 46.08:
            result = [[Math.ceil(entry/5.12), 'Unit of Arnergy 5.12kWh Battery'], [Math.ceil(entry/2.18), 'Units of Inaeko 2.18kWh Battery']]
            break;
        default:
            break;
    }

    return result;
}
function round5(x)
{
    return Math.ceil(x / 5) * 5;
}
export const recommendInverter = (entry) =>{
    let result = "";
    switch (true) {
        case entry > 0 && entry <= 2.4:
            result = [1, "Unit of Arnergy 3kVA Inverter"];
            break;
        case entry > 2.4 && entry <= 5:
            result = [1, "Unit of Arnergy 5kVA Inverter "];
            break;
        case entry > 5:
            result = [round5(entry*100/80), 'Unit of Arnergy 5kVA Inverter'];
            break;
        default:
            break;
    }
    return result
}