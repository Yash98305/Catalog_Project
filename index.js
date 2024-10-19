const fs = require('fs');  
const data = JSON.parse(fs.readFileSync('input.json', 'utf8'));
// console.log(data)
const n = data.keys.n;
const k = data.keys.k;

function decodeValue(base, value) {
    const t  = parseInt(value, base);  
    // console.log(t)
    return t;
}

const points = Object.entries(data)
    .filter(([key]) => key !== "keys")
    .map(([x, { base, value }]) => [parseInt(x), decodeValue(base, value)]);
// console.log(points)
function lagrangeInterpolation(points) {
    let constantTerm = 0;

    for (let i = 0; i < points.length; i++) {
        const [xi, yi] = points[i];

        let product = yi;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const [xj] = points[j];
                product *= -xj / (xi - xj);
            }
        }
        constantTerm += product;
    }

    return Math.round(constantTerm);  
}

const constant = lagrangeInterpolation(points);
console.log("Constant term (c):", constant);
