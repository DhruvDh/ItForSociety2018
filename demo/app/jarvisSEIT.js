var dataStore = require('nedb');
var addSubject = require('./addSubject.js');

var natural = require('natural'),
    dayClassifier = new natural.LogisticRegressionClassifier(),
    typeClassifier = new natural.LogisticRegressionClassifier(),
    treeBank = new natural.RegexpTokenizer({ pattern: /[,\s]+/ });

var dayTrainer = new dataStore({ filename: './db/dayTrainer' });
var typeTrainer = new dataStore({ filename: './db/typeTrainer' });

var subjectClassifier = new natural.LogisticRegressionClassifier();

var subjectTrainer = new dataStore({ filename: './db/subjectTrainer' });
subjectTrainer.loadDatabase();

module.exports = {
    trainSubject: function () {
        subjectClassifier.addDocument("AM4", "AM-IV");
        subjectClassifier.addDocument("AM", "AM-IV");
        subjectClassifier.addDocument("math", "AM-IV");
        subjectClassifier.addDocument("maths", "AM-IV");
        subjectClassifier.addDocument("AM-IV", "AM-IV");
        subjectClassifier.addDocument("AMIV", "AM-IV");
        subjectClassifier.addDocument("applied mathematics", "AM-IV");
        subjectClassifier.addDocument("applied math", "AM-IV");
        subjectClassifier.addDocument("cn", "CN");
        subjectClassifier.addDocument("computer networks", "CN");
        subjectClassifier.addDocument("coa", "COA");
        subjectClassifier.addDocument("computer organisation architecture", "SE");
        subjectClassifier.addDocument("at", "AT");
        subjectClassifier.addDocument("automata theory", "AT");
        subjectClassifier.addDocument("wp", "WP");
        subjectClassifier.addDocument("Web programming", "WP");
        subjectClassifier.addDocument("itc", "ITC");
        subjectClassifier.addDocument("information theory coding", "ITC");
        subjectClassifier.train();
    },
    trainType: function () {
        typeClassifier.addDocument("experiment", "Experiment");
        typeClassifier.addDocument("expt", "Experiment");
        typeClassifier.addDocument("exp", "Experiment");
        typeClassifier.addDocument("descriptive test", "DT");
        typeClassifier.addDocument("desc test", "DT");
        typeClassifier.addDocument("dt", "DT");
        typeClassifier.addDocument("objective test", "OT");
        typeClassifier.addDocument("obj test", "OT");
        typeClassifier.addDocument("ot", "OT");
        typeClassifier.addDocument("test", "Test");
        typeClassifier.addDocument("assignment", "Assignment");
        typeClassifier.addDocument("assgn", "Assignment");
        typeClassifier.addDocument("dt", "DT");
        typeClassifier.addDocument("internal assesment test", "IAT");
        typeClassifier.addDocument("iat", "IAT");
        typeClassifier.addDocument("output", "Output");
        typeClassifier.addDocument("screenshot", "Output");
        typeClassifier.addDocument("ss", "Output");
        typeClassifier.addDocument("conclusion", "Conclusion");
        typeClassifier.addDocument("conc", "Conclusion");
        typeClassifier.addDocument("tutorial", "Tutorial");
        typeClassifier.addDocument("tuts", "Tutorial");
        typeClassifier.addDocument("tut", "Tutorial");
        typeClassifier.train();
    },
    trainDays: function () {
        dayClassifier.addDocument("monday", "Monday");
        dayClassifier.addDocument("mon", "Monday");
        dayClassifier.addDocument("Tuesday", "Tuesday");
        dayClassifier.addDocument("tues", "Tuesday");
        dayClassifier.addDocument("wednesday", "Wednesday");
        dayClassifier.addDocument("wed", "Wednesday");
        dayClassifier.addDocument("thursday", "Thursday");
        dayClassifier.addDocument("thurs", "Thursday");
        dayClassifier.addDocument("friday", "Friday");
        dayClassifier.addDocument("friday", "Friday");
        dayClassifier.addDocument("saturday", "Saturday");
        dayClassifier.addDocument("sat", "Saturday");
        dayClassifier.addDocument("sunday", "Sunday");
        dayClassifier.addDocument("sun", "Sunday");

        dayClassifier.addDocument("next monday", "NextMonday");
        dayClassifier.addDocument("next mon", "NextMonday");
        dayClassifier.addDocument("next Tuesday", "NextTuesday");
        dayClassifier.addDocument("next tues", "NextTuesday");
        dayClassifier.addDocument("next wednesday", "NextWednesday");
        dayClassifier.addDocument("next wed", "NextWednesday");
        dayClassifier.addDocument("next thursday", "NextThursday");
        dayClassifier.addDocument("next thurs", "NextThursday");
        dayClassifier.addDocument("next friday", "NextFriday");
        dayClassifier.addDocument("next friday", "NextFriday");
        dayClassifier.addDocument("next saturday", "NextSaturday");
        dayClassifier.addDocument("next sat", "NextSaturday");
        dayClassifier.addDocument("next sunday", "NextSunday");
        dayClassifier.addDocument("next sun", "NextSunday");

        dayClassifier.addDocument("tomorrow", "Tomorrow");
        dayClassifier.addDocument("tom", "Tomorrow");
        dayClassifier.addDocument("by tomorrow", "Tomorrow");
        dayClassifier.addDocument("by tom", "Tomorrow");
        dayClassifier.addDocument("next week", "NextWeek");
        dayClassifier.addDocument("day after tomorrow", "Tomorrow2");
        dayClassifier.addDocument("day after tom", "Tomorrow2");

        dayClassifier.train();
    },
    getOrdinal: function (query) {
        var isOrdinalPreceeder = true;
        var suceceedingOrdinals = /(\d+)[\s,]+/ig;
        var preceedingOrdianls = /(\d+)\w{2}[\s,]*/ig;

        var ordinals = [];
        var temp;
        do {
            temp = suceceedingOrdinals.exec(query + " ");
            if (temp) {
                isOrdinalPreceeder = false;
                ordinals.push(temp[1]);
            }
        } while (temp);

        if (isOrdinalPreceeder) {
            do {
                temp = preceedingOrdianls.exec(query + " ");
                if (temp) {
                    ordinals.push(temp[1]);
                }
            } while (temp);
        }

        return ordinals;
    },
    getDay: function (query) {
        var res = {};
        res.found = false;
        res.class = dayClassifier.classify(query);
        res.classifications = dayClassifier.getClassifications(query);

        res.classifications.forEach(function (x, i, y) {
            if (x.value != 0.5)
                res.found = true;
        })

        return res;
    },
    getType: function (query) {
        var res = {};
        res.found = false;
        res.class = typeClassifier.classify(query);
        res.classifications = typeClassifier.getClassifications(query);

        res.classifications.forEach(function (x, i, y) {
            if (x.value != 0.5)
                res.found = true;
        })

        return res;
    },
    getSubject: function (query) {
        var res = {};
        res.found = false;
        res.class = subjectClassifier.classify(query);
        res.classifications = subjectClassifier.getClassifications(query);

        res.classifications.forEach(function (x, i, y) {
            if (x.value != 0.5)
                res.found = true;
        })

        return res;
    }
};