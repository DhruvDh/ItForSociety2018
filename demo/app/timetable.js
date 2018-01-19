module.exports = {
    slots: [
        {
            start: "8:00",
            end: "9:00"
        },
        {
            start: "9:00",
            end: "10:00"
        },
        {
            start: "10:15",
            end: "11:15"
        },
        {
            start: "11:15",
            end: "12:15"
        },
        {
            start: "13:00",
            end: "14:00"
        },
        {
            start: "14:00",
            end: "15:00"
        },
        {
            start: "15:00",
            end: "16:00"
        },
        {
            start: "16:00",
            end: "17:00"
        }
    ],
    "INFT/TE/A": [
        [   //Monday
            undefined,
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SE";
                        case 2: return "AIT";
                        case 3: return "DMBI";
                        case 4: return "SWS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SE";
                        case 2: return "AIT";
                        case 3: return "DMBI";
                        case 4: return "SWS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: "DS",
                type: "lec"
            },
            undefined,
            undefined
        ],
        [   //Tuesday
            undefined,
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: "DMBI",
                type: "lec"
            },
            {
                subject: "DS",
                type: "lec"
            },
            {
                subject: "SE",
                type: "lec"
            },
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "AIT";
                        case 2: return "DS";
                        case 3: return "SWS";
                        case 4: return "SE";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "AIT";
                        case 2: return "DS";
                        case 3: return "SWS";
                        case 4: return "SE";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
        ],
        [   //Wednesday
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DMBI";
                        case 2: return "SWS";
                        case 3: return "DS";
                        case 4: return "AIT";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DMBI";
                        case 2: return "SWS";
                        case 3: return "DS";
                        case 4: return "AIT";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: "SE",
                type: "lec"
            },
            {
                subject: "DMBI",
                type: "lec"
            },
            {
                subject: "DS",
                type: "lec"
            },
            undefined,
            undefined
        ],
        [   //Thursday
            undefined,
            {
                subject: "SE",
                type: "lec"
            },
            {
                subject: "DMBI",
                type: "lec"
            },
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DS";
                        case 2: return "SE";
                        case 3: return "AIT";
                        case 4: return "DMBI";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DS";
                        case 2: return "SE";
                        case 3: return "AIT";
                        case 4: return "DMBI";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            undefined,
            undefined
        ],
        [   //Friday
            undefined,
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: "DS",
                type: "lec"
            },
            {
                subject: "SE",
                type: "lec"
            },
            {
                subject: "DMBI",
                type: "lec"
            },
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SWS";
                        case 2: return "DMBI";
                        case 3: return "SE";
                        case 4: return "DS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SWS";
                        case 2: return "DMBI";
                        case 3: return "SE";
                        case 4: return "DS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            }
        ]
    ],
    "INFT/TE/B": [
        [ //Monday
            undefined,
            {
                subject: "DMBI",
                type: "lec"
            },
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: "SE",
                type: "lec"
            },
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: "DS",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DS";
                        case 2: return "AIT";
                        case 3: return "SWS";
                        case 4: return "DMBI";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DS";
                        case 2: return "AIT";
                        case 3: return "SWS";
                        case 4: return "DMBI";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            }
        ],
        [ //Tuesday
            undefined,
            {
                subject: "DS",
                type: "lec"
            },
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SWS";
                        case 2: return "DMBI";
                        case 3: return "SE";
                        case 4: return "DS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SWS";
                        case 2: return "DMBI";
                        case 3: return "SE";
                        case 4: return "DS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: "DMBI",
                type: "lec"
            },
            undefined
        ],
        [ //Wednesday
            undefined,
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "AIT";
                        case 2: return "DS";
                        case 3: return "DMBI";
                        case 4: return "SE";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "AIT";
                        case 2: return "DS";
                        case 3: return "DMBI";
                        case 4: return "SE";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: "SE",
                type: "lec"
            },

            {
                subject: "DMBI",
                type: "lec"
            },
            undefined,
            undefined
        ],
        [ //Thursday
            undefined,
            {
                subject: "SE",
                type: "lec"
            },
            {
                subject: "DS",
                type: "lec"
            },
            {
                subject: "SE",
                type: "lec"
            },
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: "DMBI",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SE";
                        case 2: return "SWS";
                        case 3: return "DS";
                        case 4: return "AIT";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "SE";
                        case 2: return "SWS";
                        case 3: return "DS";
                        case 4: return "AIT";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            }
        ],
        [ //Friday
            undefined,
            {
                subject: "DS",
                type: "lec"
            },
            {
                subject: "SWS",
                type: "lec"
            },
            {
                subject: "AIT",
                type: "lec"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DMBI";
                        case 2: return "SE";
                        case 3: return "AIT";
                        case 4: return "SWS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            {
                subject: function (batch) {
                    switch (batch) {
                        case 1: return "DMBI";
                        case 2: return "SE";
                        case 3: return "AIT";
                        case 4: return "SWS";
                        default: return "Invalid";
                    }
                },
                type: "prac"
            },
            undefined,
            undefined
        ]
    ]
}
