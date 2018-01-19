var dataStore = require('nedb');
var natural = require('natural');


var subjectTrainer = new dataStore({ filename: './db/subjectTrainer' });
subjectTrainer.loadDatabase();
var subjecttTrainerTemplate = new dataStore({ filename: './db/subjectTrainerTemplate' });
subjecttTrainerTemplate.loadDatabase();

module.exports = {
    adder: function (subjects, label) {
        console.log("addSubject called");
        subjecttTrainerTemplate.find({}, function (err, docs) {
            console.log(docs);
            console.log(err);
            
            // subjects.forEach(function (subject, i, x) {
                docs.forEach(function (doc, j, y) {
                    console.log(doc.query.replace(/%.*%/g, subjects)); // make this subject
                    // subjectTrainer.insert({
                    //     query: doc.query.replace(/%.*%/g, subject),
                    //     label: label
                    // });
                });
            // });
        });
    }
};


// addSubject.adder(["ait", "AIT", "Advanced Internet Technology"], "AIT");
// addSubject.adder(["se", "SE", "Software Engineering"], "SE");
// addSubject.adder(["ds", "DS", "Distributed Systems"], "DS");
// addSubject.adder(["dmbi", "DMBI", "Data Mining and Business Intelligence"], "DMBI");
// addSubject.adder(["sws", "SWS", "System and Web Security"], "SWS");