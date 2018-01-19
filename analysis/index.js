var express = require('express');
app = express();
var path = require('path');
var fs = require('fs');
var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();
const { performance } = require('perf_hooks');
var serialize = require('serialization');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var intents = new require(path.join(__dirname, 'lib', 'intentsAll'))();

/*intents.secondTier.list.forEach(item => {
    var current = [];
    intents.secondTier[item].list.forEach(intent => {
        var docs = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + intent + '.clean.json')), 'utf8');
        docs.forEach(doc => {
            current.push(doc);
        });
    });
    fs.writeFile(path.join(__dirname, 'cleaner', 'cleaned', 'train_'+item+'.clean.json'), JSON.stringify(current), 'utf8', function (err) {
        if (err) console.log(err);
    });
}); */

var newClassifier = function (k) {
    var limdu = require('limdu');
    var TextClassifier = limdu.classifiers.Bayesian;
    var WordExtractor = function (input, features) {
        input.split(' ').forEach(word => {
            features[word] = k;
        })
    };

    return new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });
};


var trainer = function (intentlist, classifier) {
    if (classifier instanceof natural.BayesClassifier) {
        intentlist.forEach(item => {
            var docs = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '.clean.json')), 'utf8');
            //tfidf.addFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '.clean.json'));
            docs.forEach(doc => {
                classifier.addDocument(doc, item);
                //tfidf.addDocument(doc);
            });
        })
        classifier.train();
    }
    else {
        var trainingSet = [];
        intentlist.forEach(item => {
            var docs = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '.clean.json')), 'utf8');
            docs.forEach(doc => {
                trainingSet.push({ input: doc, output: item });
            });
        })
        classifier.trainBatch(trainingSet);
    }
}


var validator = function (intent, classifier) {
    intent.list.forEach(item => {
        var current = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
        intent[item].total = current.length + 1;
        current.forEach(doc => {
            var Class = classifier.classify(doc);
            if (Class == item) {
                intent[item].truePositive++;
            }
            else {
                //console.log(doc + ' || ' + Class + ' / ' + item)
                intent[item].falseNegative++;
            }
        });
        console.log("For " + item + "'s classification: " + ((intent[item].truePositive / intent[item].total) * 100.0));
    })
}



// var firstTierClassifier = new natural.BayesClassifier();
// var musicClassifier = new natural.BayesClassifier();
// var bookClassifier = new natural.BayesClassifier();
// var searchClassifier = new natural.BayesClassifier();



var firstTierClassifier = new newClassifier(19); // 20
var musicClassifier = new newClassifier(16); // 16
var bookClassifier = new newClassifier(38); // 47
var searchClassifier = new newClassifier(50); // 34

trainer(intents.firstTier.list, firstTierClassifier);
trainer(intents.secondTier.Book.list, bookClassifier);
trainer(intents.secondTier.Music.list, musicClassifier);
trainer(intents.secondTier.Search.list, searchClassifier);
var pos = [0, 0, 0, 0, 0, 0];
var posf = [0, 0, 0, 0, 0];
var totf = [0, 0, 0, 0, 0];
var tot = [0, 0, 0, 0, 0, 0];
var POS = [0, 0, 0, 0, 0, 0, 0];
var TOT = [0, 0, 0, 0, 0, 0, 0];

var m = 3915;
function postot() {
    intents.all.list.forEach(item => {
        var files = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
        var Class;
        files.forEach(query => {
            if ((item == 'AddToPlaylist' || item == 'PlayMusic') && firstTierClassifier.classify(query) == 'Music') {
                posf[0]++; posf[1]++; totf[0]++; totf[1]++;
                if (musicClassifier.classify(query) == item)
                    if (musicClassifier.classify(query) == 'AddToPlaylist') { pos[0]++; tot[0]++; POS[0]++; TOT[0]++; }
                    else { pos[1]++; tot[1]++; POS[1]++; TOT[1]++; }
                else
                    if (musicClassifier.classify(query) == 'AddToPlaylist') { tot[0]++; TOT[0]++ }
                    else { tot[1]++; TOT[1]++ }
            }
            else if ((item == 'AddToPlaylist' || item == 'PlayMusic') && firstTierClassifier.classify(query) != 'Music') {
                totf[0]++; totf[1]++;
                if (item == 'AddToPlaylist') TOT[0]++;
                else TOT[1]++;
            }


            if ((item == 'BookRestaurant' || item == 'RateBook') && firstTierClassifier.classify(query) == 'Book') {
                posf[0]++; posf[2]++; totf[0]++; totf[2]++;
                if (bookClassifier.classify(query) == item)
                    if (bookClassifier.classify(query) == 'BookRestaurant') { pos[2]++; tot[2]++; POS[2]++; TOT[2]++; }
                    else { pos[3]++; tot[3]++; POS[3]++; TOT[3]++; }
                else
                    if (bookClassifier.classify(query) == 'BookRestaurant') { tot[2]++; TOT[2]++ }
                    else { tot[3]++; TOT[3]++ }
            }
            else if ((item == 'BookRestaurant' || item == 'RateBook') && firstTierClassifier.classify(query) != 'Book') {
                totf[0]++; totf[2]++;
                if (item == 'BookRestaurant') TOT[3]++;
                else TOT[4]++;

            }


            if ((item == 'SearchCreativeWork' || item == 'SearchScreeningEvent') && firstTierClassifier.classify(query) == 'Search') {
                posf[0]++; posf[3]++; totf[0]++; totf[3]++;
                if (searchClassifier.classify(query) == item)
                    if (searchClassifier.classify(query) == 'SearchCreativeWork') { pos[4]++; tot[4]++; POS[4]++; TOT[4]++; }
                    else { pos[5]++; tot[5]++; POS[5]++; TOT[5]++; }
                else
                    if (searchClassifier.classify(query) == 'SearchCreativeWork') { tot[4]++; TOT[5]++ }
                    else { tot[5]++; TOT[5]++ }
            }
            else if ((item == 'SearchCreativeWork' || item == 'SearchScreeningEvent') && firstTierClassifier.classify(query) != 'Search') {
                totf[0]++; totf[3]++;
                if (item == 'SearchCreativeWork') TOT[4]++;
                else TOT[5]++;
            }


            if (item == 'GetWeather' && firstTierClassifier.classify(query) == 'GetWeather') { posf[0]++; totf[0]++; posf[4]++; totf[4]++; POS[6]++; TOT[6]++; }
            else if (item == 'GetWeather' && firstTierClassifier.classify(query) != 'GetWeater') { totf[0]++; totf[4]++; TOT[6]++; }
        });

    });
    var count = 0;
    intents.all.list.forEach(item => {
        var files = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
        console.log(item + ' - ' + files.length)
    });
    console.log(count);
    console.log(posf);
    console.log(totf);
    for (var i = 0; i < 5; i++) {
        console.log((posf[i] / totf[i]) * 100)
    }
    console.log(POS);
    console.log(TOT);
    for (var i = 0; i < 7; i++) {
        console.log((POS[i] / TOT[i]) * 100)
    }
}

function POStot() {
    intents.all.list.forEach(item => {
        var files = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
        var Class;
        files.forEach(query => {
            if (item == 'AddToPlaylist') {
                if (firstTierClassifier.classify(query) == 'Music') { posf[0]++; posf[1]++; totf[0]++; totf[1]++; }
                else { totf[0]++; totf[1]++; }

                if (musicClassifier.classify(query) == item && firstTierClassifier.classify(query) == 'Music') { pos[0]++; tot[0]++; POS[0]++; TOT[0]++; }
                else { tot[0]++; TOT[0]++ }
            }

            if (item == 'PlayMusic') {
                if (firstTierClassifier.classify(query) == 'Music') { posf[0]++; posf[1]++; totf[0]++; totf[1]++; }
                else { totf[0]++; totf[1]++; }

                if (musicClassifier.classify(query) == item && firstTierClassifier.classify(query) == 'Music') { pos[0]++; tot[0]++; POS[1]++; TOT[1]++; }
                else { tot[0]++; TOT[1]++ }
            }

            if (item == 'BookRestaurant') {
                if (firstTierClassifier.classify(query) == 'Book') { posf[0]++; posf[2]++; totf[0]++; totf[2]++; }
                else { totf[0]++; totf[2]++; }

                if (bookClassifier.classify(query) == item && firstTierClassifier.classify(query) == 'Book') { pos[1]++; tot[1]++; POS[2]++; TOT[2]++; }
                else { tot[1]++; TOT[2]++ }
            }

            if (item == 'RateBook') {
                if (firstTierClassifier.classify(query) == 'Book') { posf[0]++; posf[2]++; totf[0]++; totf[2]++; }
                else { totf[0]++; totf[2]++; }

                if (bookClassifier.classify(query) == item && firstTierClassifier.classify(query) == 'Book') { pos[1]++; tot[1]++; POS[3]++; TOT[3]++; }
                else { tot[1]++; TOT[3]++ }
            }

            if (item == 'SearchCreativeWork') {
                if (firstTierClassifier.classify(query) == 'Search') { posf[0]++; posf[3]++; totf[0]++; totf[3]++;; }
                else { totf[0]++; totf[3]++; }

                if (searchClassifier.classify(query) == item && firstTierClassifier.classify(query) == 'Search') { pos[2]++; tot[2]++; POS[4]++; TOT[4]++; }
                else { tot[2]++; TOT[4]++ }
            }

            if (item == 'SearchScreeningEvent') {
                if (firstTierClassifier.classify(query) == 'Search') { posf[0]++; posf[3]++; totf[0]++; totf[3]++;; }
                else { totf[0]++; totf[3]++; }

                if (searchClassifier.classify(query) == item && firstTierClassifier.classify(query) == 'Search') { pos[2]++; tot[2]++; POS[5]++; TOT[5]++; }
                else { tot[2]++; TOT[5]++ }
            }

            if (item == 'GetWeather') {
                if (firstTierClassifier.classify(query) == item) { posf[0]++; totf[0]++; posf[4]++; totf[4]++; POS[6]++; TOT[6]++; }
                else { totf[0]++; totf[4]++; TOT[6]++; }
            }
        });

    });
    var totalPOS = 0, totalTOT = 0;
    for (var i = 0; i < 7; i++) {
        totalPOS += POS[i];
        totalTOT += TOT[i];
    }

    var acc = ((totalPOS / totalTOT) * 100);
    console.log(acc);

    console.log(posf);
    console.log(totf);
    for (var i = 0; i < 5; i++) {
        console.log((posf[i] / totf[i]) * 100)
    }
    console.log(POS);
    console.log(TOT);
    for (var i = 0; i < 7; i++) {
        console.log((POS[i] / TOT[i]) * 100)
    }
}

function POSTOT() {
    intents.all.list.forEach(item => {
        var files = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
        var Class;
        files.forEach(query => {
            if (item == 'AddToPlaylist') {
                if (firstTierClassifier.classify(query) == 'Music') { posf[0]++; posf[1]++; totf[0]++; totf[1]++; }
                else { totf[0]++; totf[1]++; }

                if (musicClassifier.classify(query) == item) { pos[0]++; tot[0]++; POS[0]++; TOT[0]++; }
                else { tot[0]++; TOT[0]++ }
            }

            if (item == 'PlayMusic') {
                if (firstTierClassifier.classify(query) == 'Music') { posf[0]++; posf[1]++; totf[0]++; totf[1]++; }
                else { totf[0]++; totf[1]++; }

                if (musicClassifier.classify(query) == item) { pos[0]++; tot[0]++; POS[1]++; TOT[1]++; }
                else { tot[0]++; TOT[1]++ }
            }

            if (item == 'BookRestaurant') {
                if (firstTierClassifier.classify(query) == 'Book') { posf[0]++; posf[2]++; totf[0]++; totf[2]++; }
                else { totf[0]++; totf[2]++; }

                if (bookClassifier.classify(query) == item) { pos[1]++; tot[1]++; POS[2]++; TOT[2]++; }
                else { tot[1]++; TOT[2]++ }
            }

            if (item == 'RateBook') {
                if (firstTierClassifier.classify(query) == 'Book') { posf[0]++; posf[2]++; totf[0]++; totf[2]++; }
                else { totf[0]++; totf[2]++; }

                if (bookClassifier.classify(query) == item) { pos[1]++; tot[1]++; POS[3]++; TOT[3]++; }
                else { tot[1]++; TOT[3]++ }
            }

            if (item == 'SearchCreativeWork') {
                if (firstTierClassifier.classify(query) == 'Search') { posf[0]++; posf[3]++; totf[0]++; totf[3]++;; }
                else { totf[0]++; totf[3]++; }

                if (searchClassifier.classify(query) == item) { pos[2]++; tot[2]++; POS[4]++; TOT[4]++; }
                else { tot[2]++; TOT[4]++ }
            }

            if (item == 'SearchScreeningEvent') {
                if (firstTierClassifier.classify(query) == 'Search') { posf[0]++; posf[3]++; totf[0]++; totf[3]++;; }
                else { totf[0]++; totf[3]++; }

                if (searchClassifier.classify(query) == item) { pos[2]++; tot[2]++; POS[5]++; TOT[5]++; }
                else { tot[2]++; TOT[5]++ }
            }

            if (item == 'GetWeather') {
                if (firstTierClassifier.classify(query) == item) { posf[0]++; totf[0]++; posf[4]++; totf[4]++; POS[6]++; TOT[6]++; }
                else { totf[0]++; totf[4]++; TOT[6]++; }
            }
        });

    });
    var count = 0;
    intents.all.list.forEach(item => {
        var files = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
        console.log(item + ' - ' + files.length)
    });
    console.log(count);
    console.log(posf);
    console.log(totf);
    for (var i = 0; i < 5; i++) {
        console.log((posf[i] / totf[i]) * 100)
    }
    console.log(POS);
    console.log(TOT);
    for (var i = 0; i < 7; i++) {
        console.log((POS[i] / TOT[i]) * 100)
    }
}


// var doit = new newClassifier(1); // 91.88601261692408 94.48915959683852
// trainer(intents.all.list, doit);
// var pos = 0;
// intents.all.list.forEach(item => {
//     var files = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
//     files.forEach(query => {
//         if (doit.classify(query) == item)
//             pos++;
//     });
// });


var result = [];
readline.question('Enter query: ', (answer) => {
    switch (firstTierClassifier.classify(answer)) {
        case "Music": console.log(musicClassifier.classify(answer)); break;
        case "Book": console.log(bookClassifier.classify(answer)); break;
        case "Search": console.log(searchClassifier.classify(answer)); break;
        case "GetWeather": console.log(firstTierClassifier.classify(answer)); break;
        default: console.log("Invalid");
    }
    readline.close();
});

function justTimeIt() {
    var files = [];
    intents.all.list.forEach(item => {
        files.push(JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '.clean.json')), 'utf8'))
    });

    var Class;
    performance.mark('Start');
    files.forEach(file => {
        file.forEach(query => {
            switch (firstTierClassifier.classify(query)) {
                case "Music": Class = musicClassifier.classify(query); break;
                case "Book": Class = bookClassifier.classify(query); break;
                case "Search": Class = searchClassifier.classify(query); break;
                case "GetWeather": Class = 'GetWeather';
            }
        });
    });
    performance.mark('End');
    performance.measure('Total', 'Start', 'End');
    result.push({
        total: (performance.getEntriesByName('Total')[0].duration / 1000),
        avg: (performance.getEntriesByName('Total')[0].duration / 13784)
    });
    performance.clearMarks(['Start', 'End']);
    performance.clearMeasures('Total');
}

// var iterations = 500;
// for (var i = 0; i < iterations; i++)
//     justTimeIt();

// var total = 0, avg = 0;
// result.forEach(run => {
//     total = total + run.total;
//     avg = avg + run.avg;
// })
// total = total / iterations;
// avg = avg / iterations;
// console.log('It took ' + total + ' seconds to classify ' + 13784 + ' queries.');
// console.log('Taking ' + avg + ' milliseconds per query on average.');