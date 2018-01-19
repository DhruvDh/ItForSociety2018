module.exports = function newIntents() {
    return {
        'all': {
            list: ['AddToPlaylist', 'BookRestaurant', 'GetWeather', 'PlayMusic', 'RateBook', 'SearchCreativeWork', 'SearchScreeningEvent'],
            'AddToPlaylist': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'BookRestaurant': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'GetWeather': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'PlayMusic': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'RateBook': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'SearchCreativeWork': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'SearchScreeningEvent': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            totalTruePositive: 0,
            totalFalsePositive: 0,
            totalFalseNegative: 0,
            total: 0,
            accuracy: 0.0
        },
        'firstTier': {
            list: ['Music', 'Book', 'GetWeather', 'Search'],
            'Music': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'Book': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'GetWeather': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            'Search': {
                truePositive: 0,
                total: 0,
                falsePositive: 0,
                falseNegative: 0
            },
            totalTruePositive: 0,
            totalFalsePositive: 0,
            totalFalseNegative: 0,
            total: 0,
            accuracy: 0.0
        },
        'secondTier': {
            list: ['Book', 'Music', 'Search'],
            'Book': {
                list: ['BookRestaurant', 'RateBook'],
                'BookRestaurant': {
                    truePositive: 0,
                    total: 0,
                    falsePositive: 0,
                    falseNegative: 0
                },
                'RateBook': {
                    truePositive: 0,
                    total: 0,
                    falsePositive: 0,
                    falseNegative: 0
                },
                totalTruePositive: 0,
                totalFalsePositive: 0,
                totalFalseNegative: 0,
                total: 0,
                accuracy: 0.0
            },
            'Music': {
                list: ['AddToPlaylist', 'PlayMusic'],
                'AddToPlaylist': {
                    truePositive: 0,
                    total: 0,
                    falsePositive: 0,
                    falseNegative: 0
                },
                'PlayMusic': {
                    truePositive: 0,
                    total: 0,
                    falsePositive: 0,
                    falseNegative: 0
                },
                totalTruePositive: 0,
                totalFalsePositive: 0,
                totalFalseNegative: 0,
                total: 0,
                accuracy: 0.0
            },
            'Search': {
                list: ['SearchCreativeWork', 'SearchScreeningEvent'],
                'SearchCreativeWork': {
                    truePositive: 0,
                    total: 0,
                    falsePositive: 0,
                    falseNegative: 0
                },
                'SearchScreeningEvent': {
                    truePositive: 0,
                    total: 0,
                    falsePositive: 0,
                    falseNegative: 0
                },
                totalTruePositive: 0,
                totalFalsePositive: 0,
                totalFalseNegative: 0,
                total: 0,
                accuracy: 0.0
            }
        }
    }
}