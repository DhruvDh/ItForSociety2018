var express = require('express');
app = express();
var path = require('path');
var fs = require('fs');
var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

var ml = require('machine_learning');



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


var results = [];

var validator = function (intent, classifier) {
    var stuff = [];
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
        //console.log("For " + item + "'s classification: " + ((intent[item].truePositive / intent[item].total) * 100.0));
        stuff.push((intent[item].truePositive / intent[item].total) * 100.0);
    })
    var tot = 0;
    stuff.forEach(thing => {
        tot = tot + thing;
    })
    return 100 - (tot / stuff.length);
}


var results = [];

var justDoIt = function (k) {
    // var firstTierClassifier = new natural.BayesClassifier();
    // var musicClassifier = new natural.BayesClassifier();
    // var bookClassifier = new natural.BayesClassifier();
    // var searchClassifier = new natural.BayesClassifier();
    var intents = new require(path.join(__dirname, 'lib', 'intentsAll'))();
    var firstTierClassifier = new newClassifier(k[0]);
    var musicClassifier = new newClassifier(k[1]);
    var bookClassifier = new newClassifier(k[2]);
    var searchClassifier = new newClassifier(k[3]);

    trainer(intents.firstTier.list, firstTierClassifier);
    trainer(intents.secondTier.Book.list, bookClassifier);
    trainer(intents.secondTier.Music.list, musicClassifier);
    trainer(intents.secondTier.Search.list, searchClassifier);
    var pos = 0;
    intents.all.list.forEach(item => {
        var files = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '_full.clean.json')), 'utf8');
        var Class;
        files.forEach(query => {
            switch (firstTierClassifier.classify(query)) {
                case "Music": Class = musicClassifier.classify(query); break;
                case "Book": Class = bookClassifier.classify(query); break;
                case "Search": Class = searchClassifier.classify(query); break;
                case "GetWeather": Class = 'GetWeather';
            }
            if (Class == item)
                pos++;
        });

    });

    console.log(pos / 137.91 + '   ||   ' + k);
    results.push({ acc: pos / 137.91, opti: k });
    return 100 - (pos / 137.91);

    // console.log(validator(intents.firstTier, firstTierClassifier));
    // console.log(validator(intents.secondTier.Music, musicClassifier));
    // console.log(validator(intents.secondTier.Book, bookClassifier));
    // console.log(validator(intents.secondTier.Search, searchClassifier));

    // return 100-((validator(intents.firstTier, firstTierClassifier)
    //  + validator(intents.secondTier.Music, musicClassifier)
    //   + validator(intents.secondTier.Book, bookClassifier)
    //    + validator(intents.secondTier.Search, searchClassifier))/4.0)
}

function JUSTDOIT(k) {
    var intents = new require(path.join(__dirname, 'lib', 'intentsAll'))();
    var firstTierClassifier = new newClassifier(k[0]);
    var musicClassifier = new newClassifier(k[1]);
    var bookClassifier = new newClassifier(k[2]);
    var searchClassifier = new newClassifier(k[3]);

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
    }

    POStot();
    var totalPOS = 0, totalTOT = 0;
    for (var i = 0; i < 7; i++) {
        totalPOS += POS[i];
        totalTOT += TOT[i];
    }

    var acc = ((totalPOS / totalTOT) * 100);
    results.push({ "acc": acc, "opti": k });
    console.log(acc + '   ||   ' + k);
    return 100 - ((totalPOS / totalTOT) * 100);
}


function optimizerr() {
    var domain = [[1, 25], [1, 25], [1, 50], [1, 50]]

    var optimalValue = ml.optimize.anneal({
        domain: domain,
        costf: JUSTDOIT,
        temperature: 100000.0,
        cool: 0.999,
        step: 4
    });

    console.log("Optimal Value is: " + optimalValue); //558,426,231,349 20,16,47,34
    console.log("Corresponding Accuracy is: " + (100 - JUSTDOIT(optimalValue)));
    fs.writeFile("Results.json", JSON.stringify(results), 'utf8', err => {
        if (err) console.log(err);
    });
}

function optimize() {
    for (var a = 5; a < 60; a++)
        for (var b = 5; b < 60; b++)
            for (var c = 5; c < 60; c++)
                for (var d = 5; d < 60; d++)
                    JUSTDOIT([a, b, c, d]);
    fs.writeFile("Resultss.json", JSON.stringify(results), 'utf8', err => {
        if (err) console.log(err);
    });
}
optimize();

// for (var i = 0; i < 4; i++) {
//     var txt = []
//     tfidf.listTerms(i /*document index*/).forEach(function (item) {
//         txt.push(item.term + ': ' + item.tfidf);
//     });
//     fs.writeFile('hello' + i + '.json', JSON.stringify(txt), 'utf8', function (err) {
//         if (err) console.log(err);
//     });
// }

// firstTierClassifier.save(path.join(__dirname, 'classifiers', 'firstTierClassifier.json'));
