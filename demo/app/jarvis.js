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
        subjectClassifier.addDocument("ait", "AIT");
        subjectClassifier.addDocument("AIT", "AIT");
        subjectClassifier.addDocument("Advanced Internet Technology", "AIT");
        subjectClassifier.addDocument("se", "SE");
        subjectClassifier.addDocument("SE", "SE");
        subjectClassifier.addDocument("Software Engineering", "SE");
        subjectClassifier.addDocument("ds", "DS");
        subjectClassifier.addDocument("DS", "DS");
        subjectClassifier.addDocument("Distributed Systems", "DS");
        subjectClassifier.addDocument("Data Mining Business Intelligence", "DMBI");
        subjectClassifier.addDocument("DBMI", "DMBI");
        subjectClassifier.addDocument("dmbi", "DMBI");
        subjectClassifier.addDocument("sws", "SWS");
        subjectClassifier.addDocument("SWS", "SWS");
        subjectClassifier.addDocument("ieee", "Committee/IEEE");
        subjectClassifier.addDocument("iete", "Committee/IETE");
        subjectClassifier.addDocument("itsa", "Committee/ITSA");
        subjectClassifier.addDocument("csi", "Committee/CSI");
        subjectClassifier.addDocument("codex", "Committee/CODEX");
        subjectClassifier.train();
    },
    trainType: function () {
        typeClassifier.addDocument("experiment", "Experiment");
        typeClassifier.addDocument("expt", "Experiment");
        typeClassifier.addDocument("exp", "Experiment");
        typeClassifier.addDocument("practical", "Experiment");
        typeClassifier.addDocument("prac", "Experiment");
        typeClassifier.addDocument("output", "Experiment/Output");
        typeClassifier.addDocument("screenshot", "Experiment/Output");
        typeClassifier.addDocument("ss", "Experiment/Output");
        typeClassifier.addDocument("conclusion", "Experiment/Conclusion");
        typeClassifier.addDocument("conc", "Experiment/Conculsion");
        typeClassifier.addDocument("post exp", "Experiment/PostExp");
        typeClassifier.addDocument("post expt", "Experiment/PostExp");
        typeClassifier.addDocument("case study", "Experiment/CaseStudy");
        typeClassifier.addDocument("experiment", "Experiment");
        typeClassifier.addDocument("expt", "Experiment");
        typeClassifier.addDocument("exp", "Experiment");
        typeClassifier.addDocument("practical", "Experiment");
        typeClassifier.addDocument("prac", "Experiment");
        typeClassifier.addDocument("output", "Experiment/Output");
        typeClassifier.addDocument("screenshot", "Experiment/Output");
        typeClassifier.addDocument("ss", "Experiment/Output");
        typeClassifier.addDocument("conclusion", "Experiment/Conclusion");
        typeClassifier.addDocument("conc", "Experiment/Conculsion");
        typeClassifier.addDocument("post exp", "Experiment/PostExp");
        typeClassifier.addDocument("post expt", "Experiment/PostExp");
        typeClassifier.addDocument("case study", "Experiment/CaseStudy");


        typeClassifier.addDocument("print experiment", "Experiment/Print");
        typeClassifier.addDocument("print expt", "Experiment/Print");
        typeClassifier.addDocument("print exp", "Experiment/Print");
        typeClassifier.addDocument("print practical", "Experiment/Print");
        typeClassifier.addDocument("print prac", "Experiment/Print");
        typeClassifier.addDocument("print output", "Experiment/Print/Output");
        typeClassifier.addDocument("print screenshot", "Experiment/Print/Output");
        typeClassifier.addDocument("print ss", "Experiment/Print/Output");
        typeClassifier.addDocument("print case study", "Experiment/Print/CaseStudy");

        typeClassifier.addDocument("write conclusion", "Experiment/Write/Conclusion");
        typeClassifier.addDocument("write conc", "Experiment/Write/Conclusion");
        typeClassifier.addDocument("write post exp", "Experiment/Write/PostExp");
        typeClassifier.addDocument("write post expt", "Experiment/Write/PostExp");
        typeClassifier.addDocument("write experiment", "Experiment/Write");
        typeClassifier.addDocument("write expt", "Experiment/Write");
        typeClassifier.addDocument("write exp", "Experiment/Write");
        typeClassifier.addDocument("write practical", "Experiment/Write");
        typeClassifier.addDocument("write prac", "Experiment/Write");
        typeClassifier.addDocument("write case study", "Experiment/Write/CaseStudy");


        typeClassifier.addDocument("descriptive test", "Test/Descriptive");
        typeClassifier.addDocument("desc test", "Test/Descriptive");
        typeClassifier.addDocument("dt", "Test/Descriptive");
        typeClassifier.addDocument("objective test", "Test/Objective");
        typeClassifier.addDocument("obj test", "Test/Objective");
        typeClassifier.addDocument("ot", "Test/Objective");
        typeClassifier.addDocument("internal assesment test", "Test/IA");
        typeClassifier.addDocument("iat", "Test/IA");
        typeClassifier.addDocument("test", "Test");
        typeClassifier.addDocument("tutorial test", "Test/Tutorial");
        typeClassifier.addDocument("tuts test", "Test/Tutorial");

        typeClassifier.addDocument("assignment", "Assignment");
        typeClassifier.addDocument("assgn", "Assignment");
        typeClassifier.addDocument("ass", "Assignment")


        typeClassifier.addDocument("tutorial", "Tutorial");
        typeClassifier.addDocument("tuts", "Tutorial");
        typeClassifier.addDocument("tut", "Tutorial");

        typeClassifier.addDocument("homework", "Homework");
        typeClassifier.addDocument("hw", "Homework");

        typeClassifier.addDocument("library", "Library");
        typeClassifier.addDocument("lib", "Library");
        typeClassifier.addDocument("lib", "Library");
        typeClassifier.addDocument("library", "Library");
        typeClassifier.addDocument("lib", "Library");


        typeClassifier.addDocument("textbook", "Book/Text");
        typeClassifier.addDocument("text book", "Book/Text");
        typeClassifier.addDocument("reference book", "Book/Reference");
        typeClassifier.addDocument("ref book", "Book/Reference");
        typeClassifier.addDocument("notebook", "Book/Note");
        typeClassifier.addDocument("note book", "Book/Note");
        typeClassifier.addDocument("textbooks", "Book/Text");
        typeClassifier.addDocument("text books", "Book/Text");
        typeClassifier.addDocument("reference books", "Book/Reference");
        typeClassifier.addDocument("ref books", "Book/Reference");
        typeClassifier.addDocument("notebooks", "Book/Note");
        typeClassifier.addDocument("note books", "Book/Note");

        typeClassifier.addDocument("library textbook", "Libr`ary/Book/Text");
        typeClassifier.addDocument("library text book", "Library/Book/Text");
        typeClassifier.addDocument("library reference book", "Library/Book/Reference");
        typeClassifier.addDocument("library ref book", "Library/Book/Reference");
        typeClassifier.addDocument("lib textbook", "Libr`ary/Book/Text");
        typeClassifier.addDocument("lib text book", "Library/Book/Text");
        typeClassifier.addDocument("lib reference book", "Library/Book/Reference");
        typeClassifier.addDocument("lib ref book", "Library/Book/Reference");
        typeClassifier.addDocument("library textbooks", "Libr`ary/Book/Text");
        typeClassifier.addDocument("library text books", "Library/Book/Text");
        typeClassifier.addDocument("library reference books", "Library/Book/Reference");
        typeClassifier.addDocument("library ref books", "Library/Book/Reference");
        typeClassifier.addDocument("lib textbooks", "Libr`ary/Book/Text");
        typeClassifier.addDocument("lib text books", "Library/Book/Text");
        typeClassifier.addDocument("lib reference books", "Library/Book/Reference");
        typeClassifier.addDocument("lib ref books", "Library/Book/Reference");

        typeClassifier.addDocument("double sided sheets", "Sheets/Double");
        typeClassifier.addDocument("double side sheet", "Sheets/Double");
        typeClassifier.addDocument("single side sheet", "Sheets/Single");
        typeClassifier.addDocument("single sided sheets", "Sheets/Single");
        typeClassifier.addDocument("file", "File");
        typeClassifier.addDocument("files", "File");
        typeClassifier.addDocument("index", "Index");
        typeClassifier.addDocument("indices", "Index");
        typeClassifier.addDocument("certificate", "Certificate");
        typeClassifier.addDocument("certificates", "Certificate");
        typeClassifier.addDocument("double sided sheets", "Sheets/Double");
        typeClassifier.addDocument("double side sheet", "Sheets/Double");
        typeClassifier.addDocument("single side sheet", "Sheets/Single");
        typeClassifier.addDocument("single sided sheets", "Sheets/Single");
        typeClassifier.addDocument("file", "File");
        typeClassifier.addDocument("files", "File");
        typeClassifier.addDocument("index", "Index");
        typeClassifier.addDocument("indices", "Index");
        typeClassifier.addDocument("certificate", "Certificate");
        typeClassifier.addDocument("certificates", "Certificate");

        typeClassifier.addDocument("buy double sided sheets", "Buy/Sheets/Double");
        typeClassifier.addDocument("buy double side sheet", "Buy/Sheets/Double");
        typeClassifier.addDocument("buy single side sheet", "Buy/Sheets/Single");
        typeClassifier.addDocument("buy single sided sheets", "Buy/Sheets/Single");
        typeClassifier.addDocument("buy file", "Buy/File");
        typeClassifier.addDocument("buy files", "Buy/File");
        typeClassifier.addDocument("buy index", "Buy/Index");
        typeClassifier.addDocument("buy indices", "Buy/Index");
        typeClassifier.addDocument("buy pen", "Buy/Pen");
        typeClassifier.addDocument("buy pens", "Buy/Pen");
        typeClassifier.addDocument("buy black pen", "Buy/Pen/Black");
        typeClassifier.addDocument("buy black pens", "Buy/Pen/Black");
        typeClassifier.addDocument("buy blue pen", "Buy/Pen/Black");
        typeClassifier.addDocument("buy blue pens", "Buy/Pen/Black");
        typeClassifier.addDocument("buy certificate", "Buy/Certificate");
        typeClassifier.addDocument("buy certificates", "Buy/Certificate");
        typeClassifier.addDocument("buy textbook", "Buy/TextBook");
        typeClassifier.addDocument("buy text book", "Buy/TextBook");
        typeClassifier.addDocument("buy textbooks", "Buy/TextBook");
        typeClassifier.addDocument("buy text books", "Buy/TextBook");
        typeClassifier.addDocument("buy reference book", "Buy/RefBook");
        typeClassifier.addDocument("buy reference books", "Buy/RefBook");
        typeClassifier.addDocument("buy ref book", "Buy/RefBook");
        typeClassifier.addDocument("buy ref books", "Buy/RefBook");
        typeClassifier.addDocument("buy notebook", "Buy/Note");
        typeClassifier.addDocument("buy notebooks", "Buy/Note");
        typeClassifier.addDocument("buy note book", "Buy/Note");
        typeClassifier.addDocument("buy note books", "Buy/Note");
        typeClassifier.addDocument("buy", "Buy");

        typeClassifier.addDocument("register", "Register");
        typeClassifier.addDocument("registeration", "Register");
        typeClassifier.addDocument("register", "Register");
        typeClassifier.addDocument("registeration", "Register");
        typeClassifier.addDocument("register IV", "Register/IV");
        typeClassifier.addDocument("registeration IV", "Register/IV");
        typeClassifier.addDocument("register seminar", "Register/Seminar");
        typeClassifier.addDocument("registeration seminar", "Register/Seminar");
        typeClassifier.addDocument("register workshop", "Register/Workshop");
        typeClassifier.addDocument("registeration workshop", "Register/Workshop");
        typeClassifier.addDocument("register industrial visit", "Register/IV");
        typeClassifier.addDocument("registeration industrial visit", "Register/IV");
        typeClassifier.addDocument("meet", "Meeting");
        typeClassifier.addDocument("meeting", "Meeting");

        typeClassifier.addDocument("workshop", "Workshop");
        typeClassifier.addDocument("seminar", "Seminar");
        typeClassifier.addDocument("project", "Project");
        typeClassifier.addDocument("proj", "Project");
        typeClassifier.addDocument("report", "Report");
        typeClassifier.addDocument("presentation", "Presentation");
        typeClassifier.addDocument("workshop", "Workshop");
        typeClassifier.addDocument("seminar", "Seminar");
        typeClassifier.addDocument("project", "Project");
        typeClassifier.addDocument("proj", "Project");
        typeClassifier.addDocument("report", "Report");
        typeClassifier.addDocument("presentation", "Presentation");
        typeClassifier.addDocument("workshop", "Workshop");
        typeClassifier.addDocument("seminar", "Seminar");
        typeClassifier.addDocument("project", "Project");
        typeClassifier.addDocument("proj", "Project");
        typeClassifier.addDocument("report", "Report");
        typeClassifier.addDocument("presentation", "Presentation");

        typeClassifier.addDocument("payment workshop", "Payment/Workshop");
        typeClassifier.addDocument("payment", "Payment");
        typeClassifier.addDocument("pay", "Payment");
        typeClassifier.addDocument("pay workshop", "Payment/Workshop");
        typeClassifier.addDocument("pay IV", "Payment/IV");
        typeClassifier.addDocument("pay industrial visit", "Payment/IV");
        typeClassifier.addDocument("pay seminar", "Payment/Seminar");
        typeClassifier.addDocument("payment seminar", "Payment/Seminar");
        typeClassifier.addDocument("payment IV", "Payment/IV");
        typeClassifier.addDocument("payment industrial visit", "Payment/IV");
        typeClassifier.addDocument("fee workshop", "Payment/Workshop");
        typeClassifier.addDocument("fee", "Payment");
        typeClassifier.addDocument("fee workshop", "Payment/Workshop");
        typeClassifier.addDocument("fee IV", "Payment/IV");
        typeClassifier.addDocument("fee industrial visit", "Payment/IV");
        typeClassifier.addDocument("fee seminar", "Payment/Seminar");
        typeClassifier.addDocument("fees workshop", "Payment/Seminar");
        typeClassifier.addDocument("fees", "Payment");
        typeClassifier.addDocument("fees workshop", "Payment/Workshop");
        typeClassifier.addDocument("fees IV", "Payment/IV");
        typeClassifier.addDocument("fees industrial visit", "Payment/IV");
        typeClassifier.addDocument("fees seminar", "Payment/Seminar");

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

        dayClassifier.addDocument("next monday", "Next/Monday");
        dayClassifier.addDocument("next mon", "Next/Monday");
        dayClassifier.addDocument("next Tuesday", "Next/Tuesday");
        dayClassifier.addDocument("next tues", "Next/Tuesday");
        dayClassifier.addDocument("next wednesday", "Next/Wednesday");
        dayClassifier.addDocument("next wed", "Next/Wednesday");
        dayClassifier.addDocument("next thursday", "Next/Thursday");
        dayClassifier.addDocument("next thurs", "Next/Thursday");
        dayClassifier.addDocument("next friday", "Next/Friday");
        dayClassifier.addDocument("next friday", "Next/Friday");
        dayClassifier.addDocument("next saturday", "Next/Saturday");
        dayClassifier.addDocument("next sat", "Next/Saturday");
        dayClassifier.addDocument("next sunday", "Next/Sunday");
        dayClassifier.addDocument("next sun", "Next/Sunday");

        dayClassifier.addDocument("today", "Today");
        dayClassifier.addDocument("aaj", "Today");
        dayClassifier.addDocument("tomorrow", "Tomorrow");
        dayClassifier.addDocument("tom", "Tomorrow");
        dayClassifier.addDocument("by tomorrow", "Tomorrow");
        dayClassifier.addDocument("by tom", "Tomorrow");
        dayClassifier.addDocument("next week", "Next/Week");
        dayClassifier.addDocument("day after tomorrow", "Tomorrow2");
        dayClassifier.addDocument("day after tom", "Tomorrow2");

        dayClassifier.train();
    },
    getOrdinal: function (query) {
        var isOrdinalPreceeder = true;
        var suceceedingOrdinals = /(\d+)[\s,]+/ig;
        var preceedingOrdianls = /(\d+)\w{2}[\s,]*/ig;

        var dates = /\d{1,2}[\/\\]\d{1,2}[\/|\\]?\d{0,4}/ig;
        if (dates.exec(query + " "))
            query = query.replace(dates.exec(query + " ")[0], ' ');

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
    getDay: function (query, timetable, batch) {
        var res = {};
        res.found = false;
        res.class = dayClassifier.classify(query);
        res.classifications = dayClassifier.getClassifications(query);

        res.classifications.forEach(function (x, i, y) {
            if (x.value != 0.5)
                res.found = true;
        })

        var today = new Date();
        var subject = this.getSubject(query);
        var type = this.getType(query);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        if (subject.found && !res.found) {
            if (type.class.search("Experiment") != -1) {
                timetable.forEach(function (day, index, tt) {
                    day.forEach(function (period, i, periods) {
                        if (period != undefined)
                            if (period.type == "prac")
                                if (period.subject(batch) == subject.class)
                                    if (index + 1 == today.getDay()) { res.class = "Today"; res.found = true; }
                                    else if (index < today.getDay) { res.class = "Next/" + days[index + 1]; res.found = true; }
                                    else { res.class = days[index + 1]; res.found = true; }
                    })
                })
            }
        }

        var i;
        if (res.class == 'Tomorrow2') {
            if (today.getDay() == 5)
                i = 0;
            else if (today.getDay() == 6)
                i = 1;
            else i = today.getDay() + 2;

            res.class = days[i];
        }
        else if (res.class == 'Tomorrow') {
            if (today.getDay() == 6)
                i = 0;
            else i = today.getDay() + 1;

            res.class = days[i];
        }
        else if (res.class == 'Next/Week') {
            res.class = 'Next/' + days[today.getDay()];
        }
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
    },
    getReply: function (query, data) {

        var reply = "";

        if (data.subject.found && !data.subject.class.startsWith('Committee')) {
            if (data.type.found) {
                if (data.type.class.startsWith('Experiment')) {
                    reply = "I'll remind you to finish " + data.subject.class + "'s ";

                    if (data.type.class.indexOf('Print') > 0) {
                        if (data.type.class.indexOf('Output') > 0) {
                            reply = "I'll remind you to print the output of " + data.subject.class + "'s ";
                        }
                        else reply = "I'll remind you to print " + data.subject.class + "'s ";
                    }

                    else if (data.type.class.indexOf('Write') > 0) {
                        if (data.type.class.indexOf('Conclusion') > 0) {
                            reply = "I'll remind you to write the conclustion for " + data.subject.class + "'s ";
                        }

                        else if (data.type.class.indexOf('PostExp') > 0) {
                            reply = "I'll remind you to do the post experiment excercise for " + data.subject.class + "'s ";
                        }

                        else reply = "I'll remind you to write " + data.subject.class + "'s ";
                    }

                    if (data.ordinals != []) {
                        for (var i = 0; i < data.ordinals.length; i++) {
                            var suffix = "th";
                            if (data.ordinals[i] == 1)
                                suffix = "st"
                            else if (data.ordinals[i] == 2)
                                suffix = "nd"
                            else if (data.ordinals[i] == 3)
                                suffix = "rd"

                            if (i == data.ordinals.length - 1 && i != 0)
                                reply += "and " + data.ordinals[i] + suffix + " ";
                            else if (data.ordinals.length == 1)
                                reply += data.ordinals[i] + suffix + " ";
                            else
                                reply += data.ordinals[i] + suffix + ", ";
                        }
                    }

                    if (data.type.class.indexOf('CaseStudy') > 0) reply += "case study ";
                    else reply += "experiment ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    }
                }

                if (data.type.class.startsWith('Test')) {
                    reply = "I'll remind you to study for " + data.subject.class + "'s ";

                    if (data.type.class.endsWith('Descriptive')) reply += "descriptive test ";
                    else if (data.type.class.endsWith('Objective')) reply += "objective test ";
                    else if (data.type.class.endsWith('IA')) reply += "IAT ";
                    else if (data.type.class.endsWith('Tutorial')) reply += "tutorial ";
                    else reply += "test ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class == 'Assignment' || data.type.class == 'Tutorial' || data.type.class == 'Homework') {
                    reply = "I'll remind you to finish " + data.subject.class + "'s ";

                    if (data.ordinals != []) {
                        for (var i = 0; i < data.ordinals.length; i++) {
                            var suffix = "th";
                            if (data.ordinals[i] == 1)
                                suffix = "st"
                            else if (data.ordinals[i] == 2)
                                suffix = "nd"
                            else if (data.ordinals[i] == 3)
                                suffix = "rd"

                            if (i == data.ordinals.length - 1 && i != 0)
                                reply += "and " + data.ordinals[i] + suffix + " ";
                            else if (data.ordinals.length == 1)
                                reply += data.ordinals[i] + suffix + " ";
                            else
                                reply += data.ordinals[i] + suffix + ", ";
                        }
                    }
                    reply += data.type.class.toLowerCase() + " ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Library')) {
                    reply = "I'll remind you to go to the library "

                    if (data.type.class.endsWith('Text')) reply += " for " + data.subject.class + "'s text book ";
                    else if (data.type.class.endsWith('Reference')) reply += " for " + data.subject.class + "'s reference book ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    } else reply += "during the next break."
                }

                if (data.type.class.startsWith('Book')) {
                    reply = "I'll remind you about " + data.subject.class + "'s ";

                    if (data.type.class.endsWith('Text')) reply += "text book ";
                    else if (data.type.class.endsWith('Reference')) reply += "reference book ";
                    else if (data.type.class.endsWith('Note')) reply += "notebook ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Sheets')) {
                    reply = "I'll remind you about ";

                    if (data.type.class.endsWith('Double')) reply += "double sided sheets ";
                    else if (data.type.class.endsWith('Single')) reply += "single sided sheets ";

                    reply += "for " + data.subject.class;

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    } else reply += "the next time you come to college."
                }

                if (data.type.class == 'File' || data.type.class == 'Index' || data.type.class == 'Certificate') {
                    reply = "I'll remind you about " + data.type.class.toLowerCase() + "s for ";

                    reply += data.subject.class + " ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Buy')) {
                    reply = "I'll remind you about buying ";

                    if (data.type.class.endsWith('Double')) reply += "double sided sheets ";
                    else if (data.type.class.endsWith('Single')) reply += "single sided sheets ";
                    else if (data.type.class.endsWith('File')) reply += "the file ";
                    else if (data.type.class.endsWith('Index')) reply += "the index ";
                    else if (data.type.class.endsWith('TextBook')) reply += "the textbook ";
                    else if (data.type.class.endsWith('RefBook')) reply += "the reference book ";
                    else if (data.type.class.endsWith('Note')) reply += "a notebook ";
                    else if (data.type.class.endsWith('Pen')) reply += "pens ";
                    else if (data.type.class.endsWith('Black')) reply += "BLACK pens ";
                    else if (data.type.class.endsWith('Blue')) reply += "BLUE pens ";

                    reply += "for " + data.subject.class + " ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply += "the next time you come to college."
                }

                if (data.type.class.startsWith('Register')) {
                    if (data.type.class != 'Register') {
                        reply = "I'll remind you about registering";
                        reply += "for " + data.type.class.replace('Register/', ''.toLowerCase()) + " on " + data.subject.class;
                    } else {
                        reply = "I'll remind you about registering";
                        reply += "for " + data.subject.class + " ";
                    }

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Meeting')) {
                    reply = "I'll remind you about meeting with ";
                    reply += data.subject.class + " ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase() + " ";
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class == 'Workshop' || data.type.class == 'Seminar' || data.type.class == 'Presentation' || data.type.class == 'Report' || data.type.class == 'Project') {
                    reply = "I'll remind you about the " + data.type.class.toLowerCase() + " for ";
                    reply += data.subject.class + " ";
                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Payment')) {
                    if (data.type.class != 'Payment') {
                        reply = "I'll remind you about paying ";
                        reply += "for " + data.type.class.replace('Payment/', '').toLowerCase() + " on " + data.subject.class + " ";
                    } else {
                        reply = "I'll remind you about paying ";
                        reply += "for " + data.subject.class + " ";
                    }

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

            }
            else reply = "I am slightly confused."
        }
        else if (data.subject.class.startsWith('Committee')) {
            if (data.type.found) {
                if (data.type.class.startsWith('Register')) {
                    if (data.type.class != 'Register') {
                        reply = "I'll remind you about registering ";
                        reply += "for " + data.subject.class.replace('Committee/', '') + "'s " + data.type.class.replace('Register/', '').toLowerCase() + " ";
                    } else {
                        reply = "I'll remind you about registering ";
                        reply += "for " + data.subject.class.replace('Committee/', '') + " ";
                    }

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Meeting')) {
                    reply = "I'll remind you about meeting with ";
                    reply += data.subject.class.replace('Committee/', '') + " ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase() + " ";
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class == 'Workshop' || data.type.class == 'Seminar' || data.type.class == 'Presentation' || data.type.class == 'Report' || data.type.class == 'Project') {
                    reply = "I'll remind you about " + data.subject.class.replace('Committee/', '') + "'s " + data.type.class.replace('Register/', '').toLowerCase() + " ";
                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Payment')) {
                    if (data.type.class != 'Payment') {
                        reply = "I'll remind you about paying ";
                        reply += "for " + data.subject.class.replace('Committee/', '') + "'s " + data.type.class.replace('Payment/', '').toLowerCase() + " ";
                    } else {
                        reply = "I'll remind you about paying ";
                        reply += "for " + data.subject.classreplace('Committee/', '') + " ";
                    }

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }
            }
            else reply = "I am slighty confused."
        }
        else {
            if (data.type.found) {
                if (data.type.class.startsWith('Experiment')) {
                    reply = "I'll remind you to finish ";

                    if (data.type.class.indexOf('Print') > 0) {
                        if (data.type.class.indexOf('Output') > 0) {
                            reply = "I'll remind you to print the output of ";
                        }
                        else reply = "I'll remind you to print ";
                    }

                    else if (data.type.class.indexOf('Write') > 0) {
                        if (data.type.class.indexOf('Conclusion') > 0) {
                            reply = "I'll remind you to write the conclustion for ";
                        }

                        else if (data.type.class.indexOf('PostExp') > 0) {
                            reply = "I'll remind you to do the post experiment excercise for ";
                        }

                        else reply = "I'll remind you to write ";
                    }

                    if (data.ordinals != []) {
                        for (var i = 0; i < data.ordinals.length; i++) {
                            var suffix = "th";
                            if (data.ordinals[i] == 1)
                                suffix = "st"
                            else if (data.ordinals[i] == 2)
                                suffix = "nd"
                            else if (data.ordinals[i] == 3)
                                suffix = "rd"

                            if (i == data.ordinals.length - 1 && i != 0)
                                reply += "and " + data.ordinals[i] + suffix + " ";
                            else if (data.ordinals.length == 1)
                                reply += data.ordinals[i] + suffix + " ";
                            else
                                reply += data.ordinals[i] + suffix + ", ";
                        }
                    } else reply += "some "

                    if (data.type.class.indexOf('CaseStudy') > 0) reply += "case study ";
                    else reply += "experiment ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Test')) {
                    reply = "I'll remind you to study for some ";

                    if (data.type.class.endsWith('Descriptive')) reply += "descriptive test ";
                    else if (data.type.class.endsWith('Objective')) reply += "objective test ";
                    else if (data.type.class.endsWith('IA')) reply += "IAT ";
                    else if (data.type.class.endsWith('Tutorial')) reply += "tutorial ";
                    else reply += "test ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class == 'Assignment' || data.type.class == 'Tutorial' || data.type.class == 'Homework') {
                    reply = "I'll remind you to finish some ";

                    if (data.ordinals != []) {
                        for (var i = 0; i < data.ordinals.length; i++) {
                            var suffix = "th";
                            if (data.ordinals[i] == 1)
                                suffix = "st"
                            else if (data.ordinals[i] == 2)
                                suffix = "nd"
                            else if (data.ordinals[i] == 3)
                                suffix = "rd"

                            if (i == data.ordinals.length - 1 && i != 0)
                                reply += "and " + data.ordinals[i] + suffix + " ";
                            else if (data.ordinals.length == 1)
                                reply += data.ordinals[i] + suffix + " ";
                            else
                                reply += data.ordinals[i] + suffix + ", ";
                        }
                    }
                    reply += data.type.class.toLowerCase() + " ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Library')) {
                    reply = "I'll remind you to go to the library "

                    if (data.type.class.endsWith('Text')) reply += " for a text book ";
                    else if (data.type.class.endsWith('Reference')) reply += " for a reference book ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    } else reply += "during the next break."
                }

                if (data.type.class.startsWith('Book')) {
                    reply = "I'll remind you about that ";

                    if (data.type.class.endsWith('Text')) reply += "text book ";
                    else if (data.type.class.endsWith('Reference')) reply += "reference book ";
                    else if (data.type.class.endsWith('Note')) reply += "notebook ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Sheets')) {
                    reply = "I'll remind you about ";

                    if (data.type.class.endsWith('Double')) reply += "double sided sheets ";
                    else if (data.type.class.endsWith('Single')) reply += "single sided sheets ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    } else reply += "the next time you come to college."
                }

                if (data.type.class == 'File' || data.type.class == 'Index' || data.type.class == 'Certificate') {
                    reply = "I'll remind you about " + data.type.class.toLowerCase() + "s ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    } else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Buy')) {
                    reply = "I'll remind you about buying ";

                    if (data.type.class.endsWith('Double')) reply += "double sided sheets ";
                    else if (data.type.class.endsWith('Single')) reply += "single sided sheets ";
                    else if (data.type.class.endsWith('File')) reply += "the file ";
                    else if (data.type.class.endsWith('Index')) reply += "the index ";
                    else if (data.type.class.endsWith('TextBook')) reply += "the textbook ";
                    else if (data.type.class.endsWith('RefBook')) reply += "the reference book ";
                    else if (data.type.class.endsWith('Note')) reply += "a notebook ";
                    else if (data.type.class.endsWith('Pen')) reply += "pen ";
                    else if (data.type.class.endsWith('Black')) reply += "BLACK pen ";
                    else if (data.type.class.endsWith('Blue')) reply += "BLUE pen ";

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply += "the next time you come to college."
                }

                if (data.type.class.startsWith('Register')) {
                    if (data.type.class != 'Register') {
                        reply = "I'll remind you about registering";
                        reply += "for a " + data.type.class.replace('Register/', ''.toLowerCase());
                    } else {
                        reply = "I don't understand what you want to register for."
                    }

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Meeting')) {
                    reply = "I'll remind you about this meeting ";
                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase() + " ";
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class == 'Workshop' || data.type.class == 'Seminar' || data.type.class == 'Presentation' || data.type.class == 'Report' || data.type.class == 'Project') {
                    reply = "I'll remind you about the " + data.type.class.toLowerCase() + " ";
                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "before next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "before " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

                if (data.type.class.startsWith('Payment')) {
                    if (data.type.class != 'Payment') {
                        reply = "I'll remind you about paying ";
                        reply += "for " + data.type.class.replace('Payment/', '').toLowerCase() + " ";
                    } else {
                        reply = "I'll remind you about paying something ";
                    }

                    if (data.day.found) {
                        if (data.day.class.indexOf("Next") >= 0) {
                            reply += "next " + data.day.class.replace('Next/', '').toLowerCase();
                        }
                        else if (data.day.class == 'Today') reply += "today";
                        else reply += "on " + data.day.class.toLowerCase();
                    }
                    else reply = "When should I remind you?"
                }

            }
            else reply = "I am confused."
        }
        
        return reply;
    }
};