var fs = require('fs');
var path = require('path')

var results = JSON.parse(fs.readFileSync(path.join(__dirname, 'Results.json')), 'utf8');
var acc = 0, opt;
results.forEach(result => {
    if (result.acc > acc) {
        acc = result.acc
        opt = result.opti;
    }
})

console.log("Accuracy: " + acc + " \\ " + opt)