export const recommendPanel = (entry) => {
    let result = "";
    switch (true) {
        case entry > 0 && entry <= 0.5:
            result = '1 Unit of 200W Solar Panel';
            break;
        case entry > 0.5 && entry <= 1:
            result = '1 Unit of 400W Solar Panel ';
            break;
        case entry > 1 && entry <= 1.4:
            result = '1 Unit of 545W Solar Panel';
            break;
        case entry > 1.4 && entry <= 5.7:
            result = '4 Units of 545W Solar Panels';
            break;
        case entry > 5.7 && entry <= 8.6:
            result = '6 Units of 545W Solar Panels';
            break;
        case entry > 8.6 && entry <= 12.9:
            result = '9 Units of 545W Solar Panels';
            break;
        case entry > 12.9 && entry <= 25.8:
            result = '18 Units of 545W Solar Panels';
            break;
        case entry > 25.8 && entry <= 38.64:
            result = '27 Units of 545W Solar Panels';
            break;
        case entry > 38.64 && entry <= 51.5:
            result = '36 Units of 545W Solar Panels';
            break;
        case entry > 51.5 && entry <= 77.3:
            result = '54 Units of 545W Solar Panels';
            break;
        case entry > 51.5 && entry <= 77.3:
            result = '54 Units of 545W Solar Panels';
            break;
        case entry > 77.3:
            result = `${(1000 * entry)/0.75/3.5/545} Units of 545W Solar Panels`;
            break;
        default:
            result = `Input all required parameters`;
            break;
    }

    return result;

}
export const recommendBattery = () =>{
    
}