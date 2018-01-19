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


var trainer = function (intentlist, classifier, type) {
    if (type) {
        intentlist.forEach(item => {
            var docs = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '.clean.json')), 'utf8');
            tfidf.addFileSync(path.join(__dirname, 'cleaner', 'cleaned', 'train_' + item + '.clean.json'));
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
        //console.log("For " + item + "'s classification: " + ((intent[item].truePositive / intent[item].total) * 100.0));
    })
}


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

    trainer(intents.firstTier.list, firstTierClassifier, 0);
    trainer(intents.secondTier.Book.list, bookClassifier, 0);
    trainer(intents.secondTier.Music.list, musicClassifier, 0);
    trainer(intents.secondTier.Search.list, searchClassifier, 0);

    validator(intents.firstTier, firstTierClassifier);
    validator(intents.secondTier.Music, musicClassifier);
    validator(intents.secondTier.Book, bookClassifier);
    validator(intents.secondTier.Search, searchClassifier);


    intents.secondTier.list.forEach(item => {
        intents.secondTier[item].list.forEach(intent => {
            intents.all.totalTruePositive += intents.secondTier[item][intent].truePositive;
            intents.all.totalFalsePositive += intents.secondTier[item][intent].falsePositive;
            intents.all.totalFalseNegative += intents.secondTier[item][intent].falseNegative;
            intents.all.total += intents.secondTier[item][intent].total;
        })
    });

    intents.all.totalTruePositive += intents.firstTier.GetWeather.truePositive;
    intents.all.totalFalsePositive += intents.firstTier.GetWeather.falsePositive;
    intents.all.totalFalseNegative += intents.firstTier.GetWeather.falseNegative;
    intents.all.total += intents.firstTier.GetWeather.total;

    intents.all.accuracy = (intents.all.totalTruePositive / intents.all.total) * 100.0;
    //console.log("Total Accuracy: " + intents.all.accuracy);
    console.log(intents.all.accuracy + '||' + k);
    return intents.all.accuracy;
}

var domain = [];
for (var i = 0; i < 4; i++)
    domain.push([1.0, 10.0]);

var optimalValue = ml.optimize.hillclimb({
    domain: domain,
    costf: justDoIt,
    population : 100,
    elite : 5, // elitism. number of elite chromosomes.
    epochs : 300,
    q : 0.3 // Rank-Based Fitness Assignment. fitness = q * (1-q)^(rank-1)
            // higher q --> higher selection pressure
});

console.log("Optimal Value is: " + optimalValue); // 2,7,6,9
console.log("Corresponding Accuracy is: " + (100 - justDoIt(optimalValue)));
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
