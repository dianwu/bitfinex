const rxjs = require('rxjs')
// import {of} from 'rxjs';
const { mergeMap, groupBy, reduce, filter } = require('rxjs/operators');
// const { of } = rxjs
// const {mergeMap, groupBy, reduce} = rxjs.operators;

// const { mergeMap, groupBy, reduce } = rxjs.operators;
// // const rxjs = require('rxjs');


const msg = [
    [0, 'ps', []]
    ,

    [
        0,
        'ws',
        [
            ['exchange', 'ETH', 3e-7, 0, null, null, null],
            [
                'exchange',
                'USD',
                371.37812456004724,
                0,
                null,
                'Trading fees for 0.00998 BTC (BTCUSD) @ 10184.0 on BFX (0.2%)',
                null
            ],
            ['funding', 'USD', 1157.82924067, 0, null, null, null],
            [
                'exchange',
                'BTC',
                9.95e-7,
                0,
                null,
                'Exchange 0.00998 BTC for USD @ 10184.0',
                [Object]
            ],
            ['funding', 'BTC', 0.03071356, 0, null, null, null],
            ['exchange', 'VSY', 175.20024645643, 0, null, null, null]
        ]
    ]
    ,

    [0, 'os', []]
    ,

    [
        0,
        'fos',
        [
            [
                813508446, 'fUSD',
                1591102226000, 1591102226000,
                1157.82923967, 1157.82923967,
                'LIMIT', null,
                null, 0,
                'ACTIVE', null,
                null, null,
                0, 2,
                0, 0,
                null, 0,
                null
            ]
        ]
    ]
    ,

    [
        0,
        'fcs',
        [
            [
                195845074, 'fBTC',
                1, 1591059845000,
                1591098791000, 0.03071173,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.00011,
                2, 1591059845000,
                1591098791000, null,
                0, null,
                0, null,
                0, 'tBTCUST'
            ]
        ]
    ]
    ,

    [0, 'fls', []]
    ,

    [0, 'wu', ['exchange', 'ETH', 3e-7, 0, 3e-7, null, null]]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'USD',
            371.37812456004724,
            0,
            371.37812456004724,
            'Trading fees for 0.00998 BTC (BTCUSD) @ 10184.0 on BFX (0.2%)',
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.99999883788405e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            9.95e-7,
            0,
            9.95e-7,
            'Exchange 0.00998 BTC for USD @ 10184.0',
            {
                reason: 'TRADE',
                order_id: 45959356091,
                order_id_oppo: 45968349369,
                trade_price: '10184.0',
                trade_amount: '-0.00998'
            }
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071356,
            0,
            0.000001830000000001275,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'VSY',
            175.20024645643,
            0,
            175.20024645643,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fou',
        [
            813508446,
            'fUSD',
            1591102226000,
            1591109800000,
            886.7740565,
            1157.82923967,
            'LIMIT',
            null,
            null,
            0,
            'PARTIALLY FILLED at FRR (271.06)',
            null,
            null,
            null,
            0,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    ,

    [
        0,
        'foc',
        [
            813508446,
            'fUSD',
            1591102226000,
            1591109800000,
            0,
            1157.82923967,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at FRR (886.77) was: PARTIALLY FILLED at FRR (271.06)',
            null,
            null,
            null,
            0,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    ,

    [
        0,
        'fcn',
        [
            195929668, 'fUSD',
            1, 1591109800000,
            1591109800000, 271.05518317,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            null, null,
            0, null,
            0, null,
            0, 'tBSVUSD'
        ]
    ]
    ,

    [
        0,
        'fcn',
        [
            195929669, 'fUSD',
            1, 1591109800000,
            1591109800000, 886.7740565,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            null, null,
            0, null,
            0, null,
            0, 'tNEOUSD'
        ]
    ]
    ,

    [
        0,
        'fte',
        [
            155934239,
            'fUSD',
            1591109800000,
            813508446,
            271.05518317,
            0.00070464,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'ftu',
        [
            155934239,
            'fUSD',
            1591109800000,
            813508446,
            271.05518317,
            0.00070464,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'fte',
        [
            155934240,
            'fUSD',
            1591109800000,
            813508446,
            886.7740565,
            0.00070464,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'ftu',
        [
            155934240,
            'fUSD',
            1591109800000,
            813508446,
            886.7740565,
            0.00070464,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.99999883788405e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'foc',
        [
            813508446,
            'fUSD',
            1591102226000,
            1591109800000,
            0,
            1157.82923967,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at FRR (886.77) was: PARTIALLY FILLED at FRR (271.06)',
            null,
            null,
            null,
            0,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.99999883788405e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fcu',
        [
            195845074, 'fBTC',
            1, 1591059845000,
            1591111511000, 0.03071173,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00011,
            2, 1591059845000,
            1591111511000, null,
            0, null,
            0, null,
            0, 'tBTCUST'
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071356,
            0,
            0.000001830000000001275,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.003000995,
            0,
            null,
            'Exchange 0.003 BTC for USD @ 9483.66465636',
            {
                reason: 'TRADE',
                order_id: 45997970349,
                order_id_oppo: 45997977654,
                trade_price: '9483.66465636',
                trade_amount: '0.003'
            }
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'USD',
            342.9271305900472,
            0,
            null,
            'Exchange 0.003 BTC for USD @ 9483.66465636',
            {
                reason: 'TRADE',
                order_id: 45997970349,
                order_id_oppo: 45997977654,
                trade_price: '9483.66465636',
                trade_amount: '0.003'
            }
        ]
    ]
    ,

    [
        0,
        'oc',
        [
            45997970349,
            null,
            1591115969512,
            'tBTCUSD',
            1591115969512,
            1591115969516,
            0,
            0.003,
            'EXCHANGE MARKET',
            null,
            null,
            null,
            0,
            'EXECUTED @ 9483.66465636(0.003)',
            null,
            null,
            9483.7,
            9483.66465636,
            0,
            0,
            null,
            null,
            null,
            0,
            0,
            null,
            null,
            null,
            'BFX',
            null,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'te',
        [
            454676258, 'tBTCUSD',
            1591115969513, 45997970349,
            0.003, 9483.66465636,
            'EXCHANGE MARKET', 9483.7,
            -1, null,
            null, 1591115969512
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.002994995,
            0,
            null,
            'Trading fees for 0.003 BTC (BTCUSD) @ 9483.6647 on BFX (0.2%)',
            null
        ]
    ]
    ,

    [
        0,
        'tu',
        [
            454676258,
            'tBTCUSD',
            1591115969513,
            45997970349,
            0.003,
            9483.66465636,
            'EXCHANGE MARKET',
            9483.7,
            -1,
            -0.000006,
            'BTC'
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.002994995,
            0,
            0.002994995,
            'Trading fees for 0.003 BTC (BTCUSD) @ 9483.6647 on BFX (0.2%)',
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'USD',
            342.9271305900472,
            0,
            342.9271305900472,
            'Exchange 0.003 BTC for USD @ 9483.66465636',
            {
                reason: 'TRADE',
                order_id: 45997970349,
                order_id_oppo: 45997977654,
                trade_price: '9483.66465636',
                trade_amount: '0.003'
            }
        ]
    ]
    ,

    [
        0,
        'fcu',
        [
            195929669, 'fUSD',
            1, 1591109800000,
            1591121831000, 886.7740565,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            1591121831000, null,
            0, null,
            0, null,
            0, 'tNEOUSD'
        ]
    ]
    ,

    [
        0,
        'fcu',
        [
            195929668, 'fUSD',
            1, 1591109800000,
            1591121831000, 271.05518317,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            1591121831000, null,
            0, null,
            0, null,
            0, 'tBSVUSD'
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.99999883788405e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fcu',
        [
            195845074, 'fBTC',
            1, 1591059845000,
            1591123571000, 0.03071173,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00011,
            2, 1591059845000,
            1591123571000, null,
            0, null,
            0, null,
            0, 'tBTCUST'
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071356,
            0,
            0.000001830000000001275,
            null,
            null
        ]
    ]
    ,

    {
        event: 'info',
        version: 2,
        serverId: '2255b455-be6e-45af-af7e-8e8b5738af1b',
        platform: { status: 1 }
    }
    ,

    {
        event: 'auth',
        status: 'OK',
        chanId: 0,
        userId: 2409112,
        auth_id: '8aca56aa-318d-417f-911f-273a4a4fd948',
        caps: {
            orders: { read: 1, write: 1 },
            account: { read: 1, write: 0 },
            funding: { read: 1, write: 1 },
            history: { read: 1, write: 0 },
            wallets: { read: 1, write: 1 },
            withdraw: { read: 0, write: 1 },
            positions: { read: 1, write: 1 },
            ui_withdraw: { read: 0, write: 0 }
        }
    }
    ,

    [0, 'ps', []]
    ,

    [
        0,
        'ws',
        [
            ['exchange', 'ETH', 3e-7, 0, null, null, null],
            [
                'exchange',
                'USD',
                342.9271305900472,
                0,
                null,
                'Exchange 0.003 BTC for USD @ 9483.66465636',
                [Object]
            ],
            ['funding', 'USD', 1157.82924067, 0, null, null, null],
            [
                'exchange',
                'BTC',
                0.002994995,
                0,
                null,
                'Trading fees for 0.003 BTC (BTCUSD) @ 9483.6647 on BFX (0.2%)',
                null
            ],
            ['funding', 'BTC', 0.03071356, 0, null, null, null],
            ['exchange', 'VSY', 175.20024645643, 0, null, null, null]
        ]
    ]
    ,

    [0, 'os', []]
    ,

    [0, 'fos', []]
    ,

    [
        0,
        'fcs',
        [
            [
                195845074, 'fBTC',
                1, 1591059845000,
                1591123571000, 0.03071173,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.00011,
                2, 1591059845000,
                1591123571000, null,
                0, null,
                0, null,
                0, 'tBTCUST'
            ],
            [
                195929668, 'fUSD',
                1, 1591109800000,
                1591121831000, 271.05518317,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0,
                2, 1591109800000,
                1591121831000, null,
                0, null,
                0, null,
                0, 'tBSVUSD'
            ],
            [
                195929669, 'fUSD',
                1, 1591109800000,
                1591121831000, 886.7740565,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0,
                2, 1591109800000,
                1591121831000, null,
                0, null,
                0, null,
                0, 'tNEOUSD'
            ]
        ]
    ]
    ,

    [0, 'fls', []]
    ,

    [0, 'wu', ['exchange', 'ETH', 3e-7, 0, 3e-7, null, null]]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'USD',
            342.9271305900472,
            0,
            342.9271305900472,
            'Exchange 0.003 BTC for USD @ 9483.66465636',
            {
                reason: 'TRADE',
                order_id: 45997970349,
                order_id_oppo: 45997977654,
                trade_price: '9483.66465636',
                trade_amount: '0.003'
            }
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.99999883788405e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.002994995,
            0,
            0.002994995,
            'Trading fees for 0.003 BTC (BTCUSD) @ 9483.6647 on BFX (0.2%)',
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071356,
            0,
            0.000001830000000001275,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'VSY',
            175.20024645643,
            0,
            175.20024645643,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fcc',
        [
            195929669,
            'fUSD',
            1,
            1591109800000,
            1591121831000,
            886.7740565,
            0,
            'CLOSED (no more position)',
            'FIXED',
            null,
            null,
            0,
            2,
            1591109800000,
            1591133164000,
            null,
            0,
            null,
            0,
            null,
            0,
            'tNEOUSD'
        ]
    ]
    ,

    [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 886.7740575, null, null]
    ]
    ,

    [
        0,
        'fcc',
        [
            195929669,
            'fUSD',
            1,
            1591109800000,
            1591121831000,
            886.7740565,
            0,
            'CLOSED (no more position)',
            'FIXED',
            null,
            null,
            0,
            2,
            1591109800000,
            1591133164000,
            null,
            0,
            null,
            0,
            null,
            0,
            'tNEOUSD'
        ]
    ]
    ,

    [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 886.7740575, null, null]
    ]
    ,

    [
        0,
        'fon',
        [
            813908463, 'fUSD',
            1591134627000, 1591134627000,
            886.7740565, 886.7740565,
            'LIMIT', null,
            null, 0,
            'ACTIVE', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fcu',
        [
            195929668, 'fUSD',
            1, 1591109800000,
            1591134911000, 271.05518317,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            1591134911000, null,
            0, null,
            0, null,
            0, 'tBSVUSD'
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fcu',
        [
            195845074, 'fBTC',
            1, 1591059845000,
            1591136111000, 0.03071173,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00011,
            2, 1591059845000,
            1591136111000, null,
            0, null,
            0, null,
            0, 'tBTCUST'
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071356,
            0,
            0.000001830000000001275,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'foc',
        [
            813908463, 'fUSD',
            1591134627000, 1591137596000,
            886.7740565, 886.7740565,
            'LIMIT', null,
            null, 0,
            'CANCELED', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    ,

    [
        0,
        'n',
        [
            1591137597114,
            'fon-req',
            null,
            null,
            [
                813944405, null, null,
                null, 886.7740565, null,
                null, null, null,
                null, null, null,
                null, null, 0.00038,
                2, null, null,
                null, null, null
            ],
            null,
            'SUCCESS',
            'Submitting funding offer of 886.7740565 USD at 0.03800 for 2 days.'
        ]
    ]
    ,

    [
        0,
        'fon',
        [
            813944405,
            'fUSD',
            1591137597000,
            1591137597000,
            492.94629809,
            886.7740565,
            'LIMIT',
            null,
            null,
            0,
            'PARTIALLY FILLED at 0.0384% (393.83)',
            null,
            null,
            null,
            0.00038,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    ,

    [
        0,
        'fln',
        [
            15042589, 'fUSD',
            1, 1591137597000,
            1591137597000, 393.82775841,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003839046249028767,
            2, 1591137597000,
            1591137597000, null,
            0, null,
            0, null,
            0
        ]
    ]
    ,

    [
        0,
        'fte',
        [
            155982051,
            'fUSD',
            1591137597000,
            813944405,
            393.82775841,
            0.00038,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'ftu',
        [
            155982051,
            'fUSD',
            1591137597000,
            813944405,
            393.82775841,
            0.00038,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'foc',
        [
            813944405,
            'fUSD',
            1591137597000,
            1591137597000,
            0,
            886.7740565,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at 0.038% (492.95) was: PARTIALLY FILLED at 0.0384% (393.83)',
            null,
            null,
            null,
            0.00038,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    ,

    [
        0,
        'fln',
        [
            15042590, 'fUSD',
            1, 1591137597000,
            1591137597000, 492.94629809,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00038,
            2, 1591137597000,
            1591137597000, null,
            0, null,
            0, null,
            0
        ]
    ]
    ,

    [
        0,
        'fte',
        [
            155982052,
            'fUSD',
            1591137597000,
            813944405,
            492.94629809,
            0.00038,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'ftu',
        [
            155982052,
            'fUSD',
            1591137597000,
            813944405,
            492.94629809,
            0.00038,
            2,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.99999883788405e-7,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fcn',
        [
            195980057, 'fUSD',
            1, 1591137966000,
            1591137966000, 492.94629809,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00038,
            2, 1591137597000,
            1591137966000, null,
            0, null,
            0, null,
            0, 'tETHUSD'
        ]
    ]
    ,

    [
        0,
        'flc',
        [
            15042590, 'fUSD',
            1, 1591137597000,
            1591137966000, 492.94629809,
            0, 'CLOSED (used)',
            'FIXED', null,
            null, 0.00038,
            2, 1591137597000,
            1591137965000, null,
            0, null,
            0, null,
            0
        ]
    ]
    ,

    [
        0,
        'fcn',
        [
            195980070, 'fUSD',
            1, 1591137966000,
            1591137966000, 393.82775841,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003839046249028767,
            2, 1591137597000,
            1591137966000, null,
            0, null,
            0, null,
            0, 'tETHUSD'
        ]
    ]
    ,

    [
        0,
        'flc',
        [
            15042589, 'fUSD',
            1, 1591137597000,
            1591137966000, 393.82775841,
            0, 'CLOSED (used)',
            'FIXED', null,
            null, 0.0003839046249028767,
            2, 1591137597000,
            1591137965000, null,
            0, null,
            0, null,
            0
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'flc',
        [
            15042589, 'fUSD',
            1, 1591137597000,
            1591137966000, 393.82775841,
            0, 'CLOSED (used)',
            'FIXED', null,
            null, 0.0003839046249028767,
            2, 1591137597000,
            1591137965000, null,
            0, null,
            0, null,
            0
        ]
    ]
    ,

    [
        0,
        'flc',
        [
            15042590, 'fUSD',
            1, 1591137597000,
            1591137966000, 492.94629809,
            0, 'CLOSED (used)',
            'FIXED', null,
            null, 0.00038,
            2, 1591137597000,
            1591137965000, null,
            0, null,
            0, null,
            0
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'foc',
        [
            813908463, 'fUSD',
            1591134627000, 1591137596000,
            886.7740565, 886.7740565,
            'LIMIT', null,
            null, 0,
            'CANCELED', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    ,

    [
        0,
        'foc',
        [
            813944405,
            'fUSD',
            1591137597000,
            1591137597000,
            0,
            886.7740565,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at 0.038% (492.95) was: PARTIALLY FILLED at 0.0384% (393.83)',
            null,
            null,
            null,
            0.00038,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'fcc',
        [
            195980070, 'fUSD',
            1, 1591137966000,
            1591137966000, 393.82775841,
            0, 'CLOSED',
            'FIXED', null,
            null, 0.0003839046249028767,
            2, 1591137597000,
            1591139153000, null,
            0, null,
            0, null,
            0, 'tETHUSD'
        ]
    ]
    ,

    [
        0,
        'fcc',
        [
            195980057, 'fUSD',
            1, 1591137966000,
            1591137966000, 492.94629809,
            0, 'CLOSED',
            'FIXED', null,
            null, 0.00038,
            2, 1591137597000,
            1591139155000, null,
            0, null,
            0, null,
            0, 'tETHUSD'
        ]
    ]
    ,

    [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 886.7740575, null, null]
    ]
    ,

    [
        0,
        'fcc',
        [
            195980057, 'fUSD',
            1, 1591137966000,
            1591137966000, 492.94629809,
            0, 'CLOSED',
            'FIXED', null,
            null, 0.00038,
            2, 1591137597000,
            1591139155000, null,
            0, null,
            0, null,
            0, 'tETHUSD'
        ]
    ]
    ,

    [
        0,
        'fcc',
        [
            195980070, 'fUSD',
            1, 1591137966000,
            1591137966000, 393.82775841,
            0, 'CLOSED',
            'FIXED', null,
            null, 0.0003839046249028767,
            2, 1591137597000,
            1591139153000, null,
            0, null,
            0, null,
            0, 'tETHUSD'
        ]
    ]
    ,

    [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 886.7740575, null, null]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.004994995,
            0,
            null,
            'Exchange 0.002 BTC for USD @ 9479.3',
            {
                reason: 'TRADE',
                order_id: 46005428093,
                order_id_oppo: 46009221312,
                trade_price: '9479.3',
                trade_amount: '0.002'
            }
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'USD',
            323.96853059004724,
            0,
            null,
            'Exchange 0.002 BTC for USD @ 9479.3',
            {
                reason: 'TRADE',
                order_id: 46005428093,
                order_id_oppo: 46009221312,
                trade_price: '9479.3',
                trade_amount: '0.002'
            }
        ]
    ]
    ,

    [
        0,
        'oc',
        [
            46005428093,
            null,
            1591139631424,
            'tBTCUSD',
            1591139631425,
            1591139631429,
            0,
            0.002,
            'EXCHANGE MARKET',
            null,
            null,
            null,
            0,
            'EXECUTED @ 9479.3(0.002)',
            null,
            null,
            9479.3,
            9479.3,
            0,
            0,
            null,
            null,
            null,
            0,
            0,
            null,
            null,
            null,
            'BFX',
            null,
            null,
            null
        ]
    ]
    ,

    [
        0,
        'te',
        [
            454800459, 'tBTCUSD',
            1591139631426, 46005428093,
            0.002, 9479.3,
            'EXCHANGE MARKET', 9479.3,
            -1, null,
            null, 1591139631424
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.004990995,
            0,
            null,
            'Trading fees for 0.002 BTC (BTCUSD) @ 9479.3 on BFX (0.2%)',
            null
        ]
    ]
    ,

    [
        0,
        'tu',
        [
            454800459,
            'tBTCUSD',
            1591139631426,
            46005428093,
            0.002,
            9479.3,
            'EXCHANGE MARKET',
            9479.3,
            -1,
            -0.000004,
            'BTC'
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.004990995,
            0,
            0.004990995,
            'Trading fees for 0.002 BTC (BTCUSD) @ 9479.3 on BFX (0.2%)',
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'exchange',
            'USD',
            323.96853059004724,
            0,
            323.96853059004724,
            'Exchange 0.002 BTC for USD @ 9479.3',
            {
                reason: 'TRADE',
                order_id: 46005428093,
                order_id_oppo: 46009221312,
                trade_price: '9479.3',
                trade_amount: '0.002'
            }
        ]
    ]
    ,

    [
        0,
        'fon',
        [
            813995649, 'fUSD',
            1591141827000, 1591141827000,
            886.7740565, 886.7740565,
            'LIMIT', null,
            null, 0,
            'ACTIVE', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    ,

    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , {
        event: 'info',
        version: 2,
        serverId: '687b8530-2914-4182-b907-b11c34fc1b97',
        platform: { status: 1 }
    }
    , {
        event: 'auth',
        status: 'OK',
        chanId: 0,
        userId: 2409112,
        auth_id: '0a38f1b5-ab65-4338-ac02-6ed41535e527',
        caps: {
            orders: { read: 1, write: 1 },
            account: { read: 1, write: 0 },
            funding: { read: 1, write: 1 },
            history: { read: 1, write: 0 },
            wallets: { read: 1, write: 1 },
            withdraw: { read: 0, write: 1 },
            positions: { read: 1, write: 1 },
            ui_withdraw: { read: 0, write: 0 }
        }
    }
    , [0, 'ps', []]
    , [
        0,
        'ws',
        [
            ['exchange', 'ETH', 3e-7, 0, null, null, null],
            [
                'exchange',
                'USD',
                323.96853059004724,
                0,
                null,
                'Exchange 0.002 BTC for USD @ 9479.3',
                [Object]
            ],
            ['funding', 'USD', 1157.82924067, 0, null, null, null],
            [
                'exchange',
                'BTC',
                0.004990995,
                0,
                null,
                'Trading fees for 0.002 BTC (BTCUSD) @ 9479.3 on BFX (0.2%)',
                null
            ],
            ['funding', 'BTC', 0.03071356, 0, null, null, null],
            ['exchange', 'VSY', 175.20024645643, 0, null, null, null]
        ]
    ]
    , [0, 'os', []]
    , [
        0,
        'fos',
        [
            [
                813995649, 'fUSD',
                1591141827000, 1591141827000,
                886.7740565, 886.7740565,
                'LIMIT', null,
                null, 0,
                'ACTIVE', null,
                null, null,
                0, 2,
                0, 0,
                null, 0,
                null
            ]
        ]
    ]
    , [
        0,
        'fcs',
        [
            [
                195845074, 'fBTC',
                1, 1591059845000,
                1591136111000, 0.03071173,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.00011,
                2, 1591059845000,
                1591136111000, null,
                0, null,
                0, null,
                0, 'tBTCUST'
            ],
            [
                195929668, 'fUSD',
                1, 1591109800000,
                1591134911000, 271.05518317,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0,
                2, 1591109800000,
                1591134911000, null,
                0, null,
                0, null,
                0, 'tBSVUSD'
            ]
        ]
    ]
    , [0, 'fls', []]
    , [0, 'wu', ['exchange', 'ETH', 3e-7, 0, 3e-7, null, null]]
    , [
        0,
        'wu',
        [
            'exchange',
            'USD',
            323.96853059004724,
            0,
            323.96853059004724,
            'Exchange 0.002 BTC for USD @ 9479.3',
            {
                reason: 'TRADE',
                order_id: 46005428093,
                order_id_oppo: 46009221312,
                trade_price: '9479.3',
                trade_amount: '0.002'
            }
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1157.82924067,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.004990995,
            0,
            0.004990995,
            'Trading fees for 0.002 BTC (BTCUSD) @ 9479.3 on BFX (0.2%)',
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071356,
            0,
            0.000001830000000001275,
            null,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'VSY',
            175.20024645643,
            0,
            175.20024645643,
            null,
            null
        ]
    ]
    , [
        0,
        'foc',
        [
            813995649, 'fUSD',
            1591141827000, 1591145755000,
            886.7740565, 886.7740565,
            'LIMIT', null,
            null, 0,
            'CANCELED', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'n',
        [
            1591145756353,
            'fon-req',
            null,
            null,
            [
                814043520, null, null,
                null, 300.7740565, null,
                null, null, null,
                null, null, null,
                null, null, 0.0003,
                2, null, null,
                null, null, null
            ],
            null,
            'SUCCESS',
            'Submitting funding offer of 300.7740565 USD at 0.03000 for 2 days.'
        ]
    ]
    , [
        0,
        'fon',
        [
            814043520, 'fUSD',
            1591145756000, 1591145756000,
            300.7740565, 300.7740565,
            'LIMIT', null,
            null, 0,
            'ACTIVE', null,
            null, null,
            0.0003, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 586.0000010000001, null, null]
    ]
    , [
        0,
        'fou',
        [
            814043520,
            'fUSD',
            1591145756000,
            1591145764000,
            168.4340565,
            300.7740565,
            'LIMIT',
            null,
            null,
            0,
            'PARTIALLY FILLED at 0.03% (132.34)',
            null,
            null,
            null,
            0.0003,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    , [
        0,
        'fcn',
        [
            195987909, 'fUSD',
            1, 1591145764000,
            1591145764000, 132.34,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            null, null,
            0, null,
            0, null,
            0, 'tLTCUSD'
        ]
    ]
    , [
        0,
        'fte',
        [
            155989729,
            'fUSD',
            1591145764000,
            814043520,
            132.34,
            0.0003,
            2,
            null
        ]
    ]
    , [
        0,
        'ftu',
        [
            155989729,
            'fUSD',
            1591145764000,
            814043520,
            132.34,
            0.0003,
            2,
            null
        ]
    ]
    , [
        0,
        'foc',
        [
            814043520,
            'fUSD',
            1591145756000,
            1591145764000,
            0,
            300.7740565,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at 0.03% (168.43) was: PARTIALLY FILLED at 0.03% (132.34)',
            null,
            null,
            null,
            0.0003,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    , [
        0,
        'fcn',
        [
            195987910, 'fUSD',
            1, 1591145764000,
            1591145764000, 168.4340565,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            null, null,
            0, null,
            0, null,
            0, 'tIOTUSD'
        ]
    ]
    , [
        0,
        'fte',
        [
            155989730,
            'fUSD',
            1591145764000,
            814043520,
            168.4340565,
            0.0003,
            2,
            null
        ]
    ]
    , [
        0,
        'ftu',
        [
            155989730,
            'fUSD',
            1591145764000,
            814043520,
            168.4340565,
            0.0003,
            2,
            null
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 586.000001, null, null]
    ]
    , [
        0,
        'foc',
        [
            813995649, 'fUSD',
            1591141827000, 1591145755000,
            886.7740565, 886.7740565,
            'LIMIT', null,
            null, 0,
            'CANCELED', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'foc',
        [
            814043520,
            'fUSD',
            1591145756000,
            1591145764000,
            0,
            300.7740565,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at 0.03% (168.43) was: PARTIALLY FILLED at 0.03% (132.34)',
            null,
            null,
            null,
            0.0003,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 586.000001, null, null]
    ]
    , [
        0,
        'fcu',
        [
            195929668, 'fUSD',
            1, 1591109800000,
            1591147391000, 271.05518317,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            1591147391000, null,
            0, null,
            0, null,
            0, 'tBSVUSD'
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'USD', 1157.82924067, 0, 586.000001, null, null]
    ]
    , [0, 'wu', ['funding', 'USD', 1158.16811433, 0, null, null, null]]
    , [0, 'wu', ['funding', 'BTC', 0.03071611, 0, null, null, null]]
    , [
        0,
        'wu',
        ['funding', 'USD', 1158.16811433, 0, 586.33887466, null, null]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071611,
            0,
            0.000004380000000001744,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195845074, 'fBTC',
            1, 1591059845000,
            1591148591000, 0.03071173,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00011,
            2, 1591059845000,
            1591148591000, null,
            0, null,
            0, null,
            0, 'tBTCUST'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071611,
            0,
            0.000004380000000001744,
            null,
            null
        ]
    ]
    , [
        0,
        'fon',
        [
            814083143, 'fUSD',
            1591149027000, 1591149028000,
            586.33887366, 586.33887366,
            'LIMIT', null,
            null, 0,
            'ACTIVE', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195987910, 'fUSD',
            1, 1591145764000,
            1591158491000, 168.4340565,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            1591158491000, null,
            0, null,
            0, null,
            0, 'tIOTUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195987909, 'fUSD',
            1, 1591145764000,
            1591158611000, 132.34,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            1591158611000, null,
            0, null,
            0, null,
            0, 'tLTCUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195929668, 'fUSD',
            1, 1591109800000,
            1591159571000, 271.05518317,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            1591159571000, null,
            0, null,
            0, null,
            0, 'tBSVUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195845074, 'fBTC',
            1, 1591059845000,
            1591160831000, 0.03071173,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00011,
            2, 1591059845000,
            1591160831000, null,
            0, null,
            0, null,
            0, 'tBTCUST'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'BTC',
            0.03071611,
            0,
            0.000004380000000001744,
            null,
            null
        ]
    ]
    , [
        0,
        'foc',
        [
            814083143, 'fUSD',
            1591149027000, 1591161490000,
            586.33887366, 586.33887366,
            'LIMIT', null,
            null, 0,
            'CANCELED', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'n',
        [
            1591161491095,
            'fon-req',
            null,
            null,
            [
                814238362, null, null,
                null, 586.33887366, null,
                null, null, null,
                null, null, null,
                null, null, 0.00031,
                2, null, null,
                null, null, null
            ],
            null,
            'SUCCESS',
            'Submitting funding offer of 586.33887366 USD at 0.03100 for 2 days.'
        ]
    ]
    , [
        0,
        'fon',
        [
            814238362, 'fUSD',
            1591161491000, 1591161491000,
            586.33887366, 586.33887366,
            'LIMIT', null,
            null, 0,
            'ACTIVE', null,
            null, null,
            0.00031, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'foc',
        [
            814083143, 'fUSD',
            1591149027000, 1591161490000,
            586.33887366, 586.33887366,
            'LIMIT', null,
            null, 0,
            'CANCELED', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'fcc',
        [
            195845074, 'fBTC',
            1, 1591059845000,
            1591160831000, 0.03071173,
            0, 'CLOSED',
            'FIXED', null,
            null, 0.00011,
            2, 1591059845000,
            1591165205000, null,
            0, null,
            0, null,
            0, 'tBTCUST'
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'BTC', 0.03071611, 0, 0.03071611, null, null]
    ]
    , [
        0,
        'fcc',
        [
            195845074, 'fBTC',
            1, 1591059845000,
            1591160831000, 0.03071173,
            0, 'CLOSED',
            'FIXED', null,
            null, 0.00011,
            2, 1591059845000,
            1591165205000, null,
            0, null,
            0, null,
            0, 'tBTCUST'
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'BTC', 0.03071611, 0, 0.03071611, null, null]
    ]
    , [
        0,
        'fon',
        [
            814315458, 'fBTC',
            1591167035000, 1591167035000,
            0.03071511, 0.03071511,
            'LIMIT', null,
            null, 0,
            'ACTIVE', null,
            null, null,
            0, 2,
            0, 0,
            null, 0,
            null
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'BTC', 0.03071611, 0, 0.000001000000000001, null, null]
    ]
    , [
        0,
        'fcu',
        [
            195987910, 'fUSD',
            1, 1591145764000,
            1591170791000, 168.4340565,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            1591170791000, null,
            0, null,
            0, null,
            0, 'tIOTUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195987909, 'fUSD',
            1, 1591145764000,
            1591170851000, 132.34,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            1591170851000, null,
            0, null,
            0, null,
            0, 'tLTCUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            9.999999974752427e-7,
            null,
            null
        ]
    ]
    , [
        0,
        'foc',
        [
            814238362,
            'fUSD',
            1591161491000,
            1591170969000,
            0,
            586.33887366,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at 0.031% (586.34)',
            null,
            null,
            null,
            0.00031,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    , [
        0,
        'fln',
        [
            15045503, 'fUSD',
            1, 1591170969000,
            1591170969000, 586.33887366,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00031,
            2, 1591170969000,
            1591170969000, null,
            0, null,
            0, null,
            0
        ]
    ]
    , [
        0,
        'fte',
        [
            156017030,
            'fUSD',
            1591170969000,
            814238362,
            586.33887366,
            0.00031,
            2,
            null
        ]
    ]
    , [
        0,
        'ftu',
        [
            156017030,
            'fUSD',
            1591170969000,
            814238362,
            586.33887366,
            0.00031,
            2,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'fcn',
        [
            196017615, 'fUSD',
            1, 1591171573000,
            1591171573000, 586.33887366,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00031,
            2, 1591170969000,
            1591171573000, null,
            0, null,
            0, null,
            0, 'tBTCUSD'
        ]
    ]
    , [
        0,
        'flc',
        [
            15045503, 'fUSD',
            1, 1591170969000,
            1591171573000, 586.33887366,
            0, 'CLOSED (used)',
            'FIXED', null,
            null, 0.00031,
            2, 1591170969000,
            1591171573000, null,
            0, null,
            0, null,
            0
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'flc',
        [
            15045503, 'fUSD',
            1, 1591170969000,
            1591171573000, 586.33887366,
            0, 'CLOSED (used)',
            'FIXED', null,
            null, 0.00031,
            2, 1591170969000,
            1591171573000, null,
            0, null,
            0, null,
            0
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'foc',
        [
            814238362,
            'fUSD',
            1591161491000,
            1591170969000,
            0,
            586.33887366,
            'LIMIT',
            null,
            null,
            0,
            'EXECUTED at 0.031% (586.34)',
            null,
            null,
            null,
            0.00031,
            2,
            0,
            0,
            null,
            0,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195929668, 'fUSD',
            1, 1591109800000,
            1591172411000, 271.05518317,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            1591172411000, null,
            0, null,
            0, null,
            0, 'tBSVUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , {
        event: 'info',
        version: 2,
        serverId: '4b9d4dcb-cbf3-4d9b-99bd-5ac688d039fa',
        platform: { status: 1 }
    }
    , {
        event: 'auth',
        status: 'OK',
        chanId: 0,
        userId: 2409112,
        auth_id: 'da072952-0ef3-4950-bc52-c078d8766c64',
        caps: {
            orders: { read: 1, write: 1 },
            account: { read: 1, write: 0 },
            funding: { read: 1, write: 1 },
            history: { read: 1, write: 0 },
            wallets: { read: 1, write: 1 },
            withdraw: { read: 0, write: 1 },
            positions: { read: 1, write: 1 },
            ui_withdraw: { read: 0, write: 0 }
        }
    }
    , [0, 'ps', []]
    , [
        0,
        'ws',
        [
            ['exchange', 'ETH', 3e-7, 0, null, null, null],
            [
                'exchange',
                'USD',
                323.96853059004724,
                0,
                null,
                'Exchange 0.002 BTC for USD @ 9479.3',
                [Object]
            ],
            ['funding', 'USD', 1158.16811433, 0, null, null, null],
            [
                'exchange',
                'BTC',
                0.004990995,
                0,
                null,
                'Trading fees for 0.002 BTC (BTCUSD) @ 9479.3 on BFX (0.2%)',
                null
            ],
            ['funding', 'BTC', 0.03071611, 0, null, null, null],
            ['exchange', 'VSY', 175.20024645643, 0, null, null, null]
        ]
    ]
    , [0, 'os', []]
    , [
        0,
        'fos',
        [
            [
                814315458, 'fBTC',
                1591167035000, 1591167035000,
                0.03071511, 0.03071511,
                'LIMIT', null,
                null, 0,
                'ACTIVE', null,
                null, null,
                0, 2,
                0, 0,
                null, 0,
                null
            ]
        ]
    ]
    , [
        0,
        'fcs',
        [
            [
                195929668, 'fUSD',
                1, 1591109800000,
                1591172411000, 271.05518317,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0,
                2, 1591109800000,
                1591172411000, null,
                0, null,
                0, null,
                0, 'tBSVUSD'
            ],
            [
                195987909, 'fUSD',
                1, 1591145764000,
                1591170851000, 132.34,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.0003,
                2, 1591145764000,
                1591170851000, null,
                0, null,
                0, null,
                0, 'tLTCUSD'
            ],
            [
                195987910, 'fUSD',
                1, 1591145764000,
                1591170791000, 168.4340565,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.0003,
                2, 1591145764000,
                1591170791000, null,
                0, null,
                0, null,
                0, 'tIOTUSD'
            ],
            [
                196017615, 'fUSD',
                1, 1591171573000,
                1591171573000, 586.33887366,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.00031,
                2, 1591170969000,
                1591171573000, null,
                0, null,
                0, null,
                0, 'tBTCUSD'
            ]
        ]
    ]
    , [0, 'fls', []]
    , [0, 'wu', ['exchange', 'ETH', 3e-7, 0, 3e-7, null, null]]
    , [
        0,
        'wu',
        [
            'exchange',
            'USD',
            323.96853059004724,
            0,
            323.96853059004724,
            'Exchange 0.002 BTC for USD @ 9479.3',
            {
                reason: 'TRADE',
                order_id: 46005428093,
                order_id_oppo: 46009221312,
                trade_price: '9479.3',
                trade_amount: '0.002'
            }
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.004990995,
            0,
            0.004990995,
            'Trading fees for 0.002 BTC (BTCUSD) @ 9479.3 on BFX (0.2%)',
            null
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'BTC', 0.03071611, 0, 0.000001000000000001, null, null]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'VSY',
            175.20024645643,
            0,
            175.20024645643,
            null,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.014990995,
            0,
            null,
            'Exchange 0.01 BTC for USD @ 9591.59888439',
            {
                reason: 'TRADE',
                order_id: 46027539114,
                order_id_oppo: 46027573798,
                trade_price: '9591.59888439',
                trade_amount: '0.01'
            }
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'USD',
            228.05254175004723,
            0,
            null,
            'Exchange 0.01 BTC for USD @ 9591.59888439',
            {
                reason: 'TRADE',
                order_id: 46027539114,
                order_id_oppo: 46027573798,
                trade_price: '9591.59888439',
                trade_amount: '0.01'
            }
        ]
    ]
    , [
        0,
        'oc',
        [
            46027539114,
            null,
            1591181299744,
            'tBTCUSD',
            1591181299744,
            1591181299748,
            0,
            0.01,
            'EXCHANGE MARKET',
            null,
            null,
            null,
            0,
            'EXECUTED @ 9591.59888439(0.01)',
            null,
            null,
            9591.6,
            9591.59888439,
            0,
            0,
            null,
            null,
            null,
            0,
            0,
            null,
            null,
            null,
            'BFX',
            null,
            null,
            null
        ]
    ]
    , [
        0,
        'te',
        [
            454969869, 'tBTCUSD',
            1591181299745, 46027539114,
            0.01, 9591.59888439,
            'EXCHANGE MARKET', 9591.6,
            -1, null,
            null, 1591181299744
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.014970995,
            0,
            null,
            'Trading fees for 0.01 BTC (BTCUSD) @ 9591.5989 on BFX (0.2%)',
            null
        ]
    ]
    , [
        0,
        'tu',
        [
            454969869,
            'tBTCUSD',
            1591181299745,
            46027539114,
            0.01,
            9591.59888439,
            'EXCHANGE MARKET',
            9591.6,
            -1,
            -0.00002,
            'BTC'
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.014970995,
            0,
            0.014970995,
            'Trading fees for 0.01 BTC (BTCUSD) @ 9591.5989 on BFX (0.2%)',
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'USD',
            228.05254175004723,
            0,
            228.05254175004723,
            'Exchange 0.01 BTC for USD @ 9591.59888439',
            {
                reason: 'TRADE',
                order_id: 46027539114,
                order_id_oppo: 46027573798,
                trade_price: '9591.59888439',
                trade_amount: '0.01'
            }
        ]
    ]
    , [
        0,
        'fcu',
        [
            195987909, 'fUSD',
            1, 1591145764000,
            1591182851000, 132.34,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            1591182851000, null,
            0, null,
            0, null,
            0, 'tLTCUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195987910, 'fUSD',
            1, 1591145764000,
            1591183091000, 168.4340565,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.0003,
            2, 1591145764000,
            1591183091000, null,
            0, null,
            0, null,
            0, 'tIOTUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , {
        event: 'info',
        version: 2,
        serverId: 'edab8fac-85de-4d32-8df5-3e9a1921c388',
        platform: { status: 1 }
    }
    , {
        event: 'auth',
        status: 'OK',
        chanId: 0,
        userId: 2409112,
        auth_id: 'ac66b526-7a21-400a-bdc6-65d940f72452',
        caps: {
            orders: { read: 1, write: 1 },
            account: { read: 1, write: 0 },
            funding: { read: 1, write: 1 },
            history: { read: 1, write: 0 },
            wallets: { read: 1, write: 1 },
            withdraw: { read: 0, write: 1 },
            positions: { read: 1, write: 1 },
            ui_withdraw: { read: 0, write: 0 }
        }
    }
    , [0, 'ps', []]
    , [
        0,
        'ws',
        [
            ['exchange', 'ETH', 3e-7, 0, null, null, null],
            [
                'exchange',
                'USD',
                228.05254175004723,
                0,
                null,
                'Exchange 0.01 BTC for USD @ 9591.59888439',
                [Object]
            ],
            ['funding', 'USD', 1158.16811433, 0, null, null, null],
            [
                'exchange',
                'BTC',
                0.014970995,
                0,
                null,
                'Trading fees for 0.01 BTC (BTCUSD) @ 9591.5989 on BFX (0.2%)',
                null
            ],
            ['funding', 'BTC', 0.03071611, 0, null, null, null],
            ['exchange', 'VSY', 175.20024645643, 0, null, null, null]
        ]
    ]
    , [0, 'os', []]
    , [
        0,
        'fos',
        [
            [
                814315458, 'fBTC',
                1591167035000, 1591167035000,
                0.03071511, 0.03071511,
                'LIMIT', null,
                null, 0,
                'ACTIVE', null,
                null, null,
                0, 2,
                0, 0,
                null, 0,
                null
            ]
        ]
    ]
    , [
        0,
        'fcs',
        [
            [
                195929668, 'fUSD',
                1, 1591109800000,
                1591172411000, 271.05518317,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0,
                2, 1591109800000,
                1591172411000, null,
                0, null,
                0, null,
                0, 'tBSVUSD'
            ],
            [
                195987909, 'fUSD',
                1, 1591145764000,
                1591182851000, 132.34,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.0003,
                2, 1591145764000,
                1591182851000, null,
                0, null,
                0, null,
                0, 'tLTCUSD'
            ],
            [
                195987910, 'fUSD',
                1, 1591145764000,
                1591183091000, 168.4340565,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.0003,
                2, 1591145764000,
                1591183091000, null,
                0, null,
                0, null,
                0, 'tIOTUSD'
            ],
            [
                196017615, 'fUSD',
                1, 1591171573000,
                1591171573000, 586.33887366,
                0, 'ACTIVE',
                'FIXED', null,
                null, 0.00031,
                2, 1591170969000,
                1591171573000, null,
                0, null,
                0, null,
                0, 'tBTCUSD'
            ]
        ]
    ]
    , [0, 'fls', []]
    , [0, 'wu', ['exchange', 'ETH', 3e-7, 0, 3e-7, null, null]]
    , [
        0,
        'wu',
        [
            'exchange',
            'USD',
            228.05254175004723,
            0,
            228.05254175004723,
            'Exchange 0.01 BTC for USD @ 9591.59888439',
            {
                reason: 'TRADE',
                order_id: 46027539114,
                order_id_oppo: 46027573798,
                trade_price: '9591.59888439',
                trade_amount: '0.01'
            }
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'BTC',
            0.014970995,
            0,
            0.014970995,
            'Trading fees for 0.01 BTC (BTCUSD) @ 9591.5989 on BFX (0.2%)',
            null
        ]
    ]
    , [
        0,
        'wu',
        ['funding', 'BTC', 0.03071611, 0, 0.000001000000000001, null, null]
    ]
    , [
        0,
        'wu',
        [
            'exchange',
            'VSY',
            175.20024645643,
            0,
            175.20024645643,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            196017615, 'fUSD',
            1, 1591171573000,
            1591183571000, 586.33887366,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0.00031,
            2, 1591170969000,
            1591183571000, null,
            0, null,
            0, null,
            0, 'tBTCUSD'
        ]
    ]
    , [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
    , [
        0,
        'fcu',
        [
            195929668, 'fUSD',
            1, 1591109800000,
            1591186211000, 271.05518317,
            0, 'ACTIVE',
            'FIXED', null,
            null, 0,
            2, 1591109800000,
            1591186211000, null,
            0, null,
            0, null,
            0, 'tBSVUSD'
        ]
    ]
    ,
    [
        0,
        'wu',
        [
            'funding',
            'USD',
            1158.16811433,
            0,
            0.0000010000001111620804,
            null,
            null
        ]
    ]
];

const groups = rxjs.from(msg).pipe(
    groupBy(p => p[1]),
    // mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], [])))
)
groups.subscribe(p => console.log(p));
console.log('groups......', groups);
    //.subscribe(p => console.log(p));