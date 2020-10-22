const winston = require('winston');
const {
    combine,
    timestamp,
    simple,
    splat
} = winston.format;
require('winston-daily-rotate-file');
const transport = new winston.transports.DailyRotateFile({
    filename: 'log/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        splat(),
        simple()
    ),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        transport,
    ],
});
const {
    WSv2
} = require('bitfinex-api-node')
const {
    Order,
    Wallet
} = require('bfx-api-node-models')
const https = require('https');
const myWallet = {
    updateTime: 0,
    wallet: []
};
const fundingRate = {
    fUSD: [0,0,0,0,0],
    fBTC: [0,0,0,0,0],
    fETH: [0,0,0,0,0],
};

// var fs = require('fs');
// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {
//     flags: 'w'
// });
var log2file = function (v) {
    // console.log(v);
    logger.log('info', '[%s] %s', new Date(), v);
    // log_file.write(util.format(v) + '\n');
};

const ws = new WSv2({
    transform: true,
    apiKey: '--',
    apiSecret: '--',
    autoReconnect: true
})

var sum = function(x,y){ return x+y;};　　//求和函数
var square = function(x){ return x*x;};　　//数组中每个元素求它的平方

function calcAvgSD(values){
    // 平均值
    var avg = values.reduce(sum)/values.length;
    var deviations = values.map(function(x){return x-avg;});
    // 標準差
    var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(values.length-1));
    return [avg, stddev];
}

/**
 * 
 * @param {string} abbreviation 
 */
function transAbbreviation(abbreviation) {
    const abMap = {
        'os': 'order snapshot',
        'on': 'order new',
        'ou': 'order update',
        'oc': 'order cancel',
        'ps': 'position snapshot',
        'pn': 'position new',
        'pu': 'position update',
        'pc': 'position close',
        'te': 'trade executed',
        'tu': 'trade execution update',
        'fos': 'funding offers snapshot',
        'fon': 'funding offer new',
        'fou': 'funding offers update',
        'foc': 'funding offer cancel',
        'fcs': 'funding credits snapshot',
        'fcn': 'funding credits new',
        'fcu': 'funding credits update',
        'fcc': 'funding credits close',
        'fls': 'funding loans snapshot',
        'fln': 'funding loan new',
        'flu': 'funding loan update',
        'flc': 'funding loan close',
        'ws': 'wallet snapshot',
        'wu': 'wallet update',
        'te': 'trade executed',
        'tu': 'trade execution update',
        'miu': 'margin info update',
        'fte': 'funding trade executed',
        'ftu': 'funding trade update',
        'n': 'notification',
        'fiu': 'funding info update'
    };

    return abMap[abbreviation] || abbreviation;
}

function transletSchema(schema) {
    return function (detail) {
        return schema.reduce((acc, field, index) => ({
            ...acc,
            [field]: detail[index]
        }), {});
    }
}

function transletMsg(msg) {
    const schemaMap = {
        'os': [
            'ID', // Order ID
            'GID', // Group ID
            'CID', // Client Order ID
            'SYMBOL', // Pair 
            'MTS_CREATE', // Millisecond timestamp of creation
            'MTS_UPDATE', // Millisecond timestamp of update
            'AMOUNT', // Positive means buy, negative means sell.
            'AMOUNT_ORIG', // Original amount
            'ORDER_TYPE',
            'TYPE_PREV', // Previous order type
            'MTS_TIF', // Millisecond timestamp of Time-In-Force: automatic order cancellation
            '_PLACEHOLDER',
            'FLAGS',
            'STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'PRICE',
            'PRICE_AVG',
            'PRICE_TRAILING',
            'PRICE_AUX_LIMIT',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'NOTIFY',
            'HIDDEN',
            'PLACED_ID',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'ROUTING',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER'
        ],
        'on_ou_oc': [
            'ID',
            'GID',
            'CID',
            'SYMBOL',
            'MTS_CREATE',
            'MTS_UPDATE',
            'AMOUNT',
            'AMOUNT_ORIG',
            'ORDER_TYPE',
            'TYPE_PREV',
            'MTS_TIF',
            '_PLACEHOLDER',
            'FLAGS',
            'ORDER_STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'PRICE',
            'PRICE_AVG',
            'PRICE_TRAILING',
            'PRICE_AUX_LIMIT',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'NOTIFY',
            'HIDDEN',
            'PLACED_ID',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'ROUTING',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER'
        ],
        'ps': [
            'SYMBOL',
            'STATUS',
            'AMOUNT',
            'BASE_PRICE',
            'MARGIN_FUNDING',
            'MARGIN_FUNDING_TYPE',
            'PL',
            'PL_PERC',
            'PRICE_LIQ',
            'LEVERAGE',
            'FLAG',
            'POSITION_ID',
            'MTS_CREATE',
            'MTS_UPDATE',
            'PLACEHOLDER',
            'TYPE',
            'PLACEHOLDER',
            'COLLATERAL',
            'COLLATERAL_MIN',
            'META'
        ],
        pn_pu_pc: [
            'SYMBOL',
            'STATUS',
            'AMOUNT',
            'BASE_PRICE',
            'MARGIN_FUNDING',
            'MARGIN_FUNDING_TYPE',
            'PL',
            'PL_PERC',
            'PRICE_LIQ',
            'LEVERAGE',
            'FLAG',
            'POSITION_ID',
            'MTS_CREATE',
            'MTS_UPDATE',
            'PLACEHOLDER',
            'TYPE',
            'PLACEHOLDER',
            'COLLATERAL',
            'COLLATERAL_MIN',
            'META'
        ],
        te: [
            'ID',
            'SYMBOL',
            'MTS_CREATE',
            'ORDER_ID',
            'EXEC_AMOUNT',
            'EXEC_PRICE',
            'ORDER_TYPE',
            'ORDER_PRICE',
            'MAKER',
            'PLACEHOLDER',
            'PLACEHOLDER',
            'CID'
        ],
        tu: [
            'ID',
            'SYMBOL',
            'MTS_CREATE',
            'ORDER_ID',
            'EXEC_AMOUNT',
            'EXEC_PRICE',
            'ORDER_TYPE',
            'ORDER_PRICE',
            'MAKER',
            'FEE',
            'FEE_CURRENCY',
        ],
        fos: [
            'ID',
            'SYMBOL',
            'MTS_CREATED',
            'MTS_UPDATED',
            'AMOUNT',
            'AMOUNT_ORIG',
            'OFFER_TYPE',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'FLAGS',
            'STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'RATE',
            'PERIOD',
            'NOTIFY',
            'HIDDEN',
            '_PLACEHOLDER',
            'RENEW',
            '_PLACEHOLDER',
        ],
        fon_fou_foc: [
            'ID',
            'SYMBOL',
            'MTS_CREATED',
            'MTS_UPDATED',
            'AMOUNT',
            'AMOUNT_ORIG',
            'TYPE',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'FLAGS',
            'STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'RATE',
            'PERIOD',
            'NOTIFY',
            'HIDDEN',
            '_PLACEHOLDER',
            'RENEW',
            'RATE_REAL'
        ],
        fcs: [
            'ID',
            'SYMBOL',
            'SIDE',
            'MTS_CREATE',
            'MTS_UPDATE',
            'AMOUNT',
            'FLAGS',
            'STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'RATE',
            'PERIOD',
            'MTS_OPENING',
            'MTS_LAST_PAYOUT',
            'NOTIFY',
            'HIDDEN',
            '_PLACEHOLDER',
            'RENEW',
            'RATE_REAL',
            'NO_CLOSE',
            'POSITION_PAIR'
        ],
        fcn_fcu_fcc: [
            'ID',
            'SYMBOL',
            'SIDE',
            'MTS_CREATE',
            'MTS_UPDATE',
            'AMOUNT',
            'FLAGS',
            'STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'RATE',
            'PERIOD',
            'MTS_OPENING',
            'MTS_LAST_PAYOUT',
            'NOTIFY',
            'HIDDEN',
            '_PLACEHOLDER',
            'RENEW',
            'RATE_REAL',
            'NO_CLOSE',
            'POSITION_PAIR'
        ],
        fls: [
            'ID',
            'SYMBOL',
            'SIDE',
            'MTS_CREATE',
            'MTS_UPDATE',
            'AMOUNT',
            'FLAGS',
            'STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'RATE',
            'PERIOD',
            'MTS_OPENING',
            'MTS_LAST_PAYOUT',
            'NOTIFY',
            'HIDDEN',
            '_PLACEHOLDER',
            'RENEW',
            'RATE_REAL',
            'NO_CLOSE'
        ],
        fln_flu_flc: [
            'ID',
            'CURRENCY',
            'SIDE',
            'MTS_CREATE',
            'MTS_UPDATE',
            'AMOUNT',
            'FLAGS',
            'STATUS',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            '_PLACEHOLDER',
            'RATE',
            'PERIOD',
            'MTS_OPENING',
            'MTS_LAST_PAYOUT',
            'NOTIFY',
            'HIDDEN',
            '_PLACEHOLDER',
            'RENEW',
            'RATE_REAL',
            'NO_CLOSE',
        ],
        ws: [
            'WALLET_TYPE',
            'CURRENCY',
            'BALANCE',
            'UNSETTLED_INTEREST',
            'BALANCE_AVAILABLE',
        ],
        wu: [
            'WALLET_TYPE',
            'CURRENCY',
            'BALANCE',
            'UNSETTLED_INTEREST',
            'BALANCE_AVAILABLE',
            'DESCRIPTION',
            'META'
        ],
        miu_base: [
            'USER_PL',
            'USER_SWAPS',
            'MARGIN_BALANCE',
            'MARGIN_NET',
            'MARGIN_REQUIRED'
        ],
        miu_sym: [
            'TRADABLE_BALANCE',
            'GROSS_BALANCE',
            'BUY',
            'SELL',
        ],
        fiu: [
            'YIELD_LOAN',
            'YIELD_LEND',
            'DURATION_LOAN',
            'DURATION_LEND',
        ],
        'fte_ftu': [
            'ID',
            'CURRENCY',
            'MTS_CREATE',
            'OFFER_ID',
            'AMOUNT',
            'RATE',
            'PERIOD',
            'MAKER',
        ],
        'ftu': 'ftu',
        n: [
            'MTS',
            'TYPE',
            'MESSAGE_ID',
            null,
            'NOTIFY_INFO', // NOTIFY_INFO comes as an array or object and differs per notification  
            'CODE',
            'STATUS',
            'TEXT',
        ]
    };

    const abMap = {
        'os': 'os',
        'on': 'on_ou_oc',
        'ou': 'on_ou_oc',
        'oc': 'on_ou_oc',
        'ps': 'ps',
        'pn': 'pn_pu_pc',
        'pu': 'pn_pu_pc',
        'pc': 'pn_pu_pc',
        'te': 'te',
        'tu': 'tu',
        'fos': 'fos',
        'fon': 'fon_fou_foc',
        'fou': 'fon_fou_foc',
        'foc': 'fon_fou_foc',
        'fcs': 'fcs',
        'fcn': 'fcn_fcu_fcc',
        'fcu': 'fcn_fcu_fcc',
        'fcc': 'fcn_fcu_fcc',
        'fls': 'fls',
        'fln': 'fln_flu_flc',
        'flu': 'fln_flu_flc',
        'flc': 'fln_flu_flc',
        'fte': 'fte_ftu',
        'ftu': 'fte_ftu',
        'ws': 'ws',
        'wu': 'wu',
        'bu': 'bu',
        'te': 'te',
        'tu': 'tu',
        'miu': 'miu',
        'fiu': 'fiu',
        'fte': 'fte_ftu',
        'n': 'n',
    };
    const [id, abbreviation, details] = msg;
    const msgType = abMap[abbreviation] || abbreviation;
    const schema = schemaMap[msgType];
    const transletSchemaFn = transletSchema(schema);
    const transDetail = [];
    if (abbreviation === undefined) {
        return '';
    }

    if (Array.isArray(details)) {
        if (details.some(detail => Array.isArray(detail))) {
            transDetail.push(...details.map(detail => transletSchemaFn(detail)));
        } else {
            transDetail.push(transletSchemaFn(details));
        }
    } else if (details) {
        transDetail.push(transletSchemaFn(details));
    }

    return [transAbbreviation(abbreviation), transDetail];
}

/**
 * @param {*} bfMsg bitfinex websocket message
 * [
 *  CHAN_ID, 
 *  TYPE, 
 *  [
 *      ID,
 *      SYMBOL,
 *      MTS_CREATED,
 *      MTS_UPDATED,
 *      AMOUNT,
 *      AMOUNT_ORIG,
 *      OFFER_TYPE,
 *      _PLACEHOLDER,
 *      _PLACEHOLDER,
 *      FLAGS,
 *      STATUS,
 *      _PLACEHOLDER,
 *      _PLACEHOLDER,
 *      _PLACEHOLDER,
 *      RATE,
 *      PERIOD,
 *      NOTIFY,
 *      HIDDEN,
 *      _PLACEHOLDER,
 *      RENEW,
 *      _PLACEHOLDER
 *  ]
 * ]
 * 
 */
function genMsg(bfMsg) {
    const transletMsgs = [];
    const infoMessage = bfMsg[2];

    transletMsgs.push(`${transAbbreviation(bfMsg[1])} [${infoMessage[1]}]`);
    transletMsgs.push('Amount：' + infoMessage[4]);
    transletMsgs.push('RATE：' + (infoMessage[14] * 100) + '%');
    return transletMsgs.join('\r\n');
}

function cancelOffer(oriderId) {
    logger.info('[Cancel Offer] oriderId: %s', oriderId);
    return ws.send([
        0,
        'foc',
        null,
        {
            id: oriderId
        }
    ])
}

function newOffer(symbol, amount, rate) {
    logger.info('[newOffer] symbol: %s, amount: %s, rate:%s', symbol, amount, rate);

    ws.send([
        0,
        'fon',
        null,
        {
            type: "LIMIT",
            symbol: symbol,
            amount: String(amount),
            rate: String(rate),
            period: 2,
            flags: 0
        }
    ])

}

function getOfferPoint(offer) {
    return {
        OfferID: offer.id,
        symbol: offer.symbol,
        amount: offer.amount,
        mtsCreate: offer.mtsCreate,
        rate: offer.rate
    };
}

function getFundinginfo() {
    console.log('getFundinginfo:');
    return ws.send([
        0,
        "calc",
        null,
        [
            //   ["funding_sym_fUSD"],
            ["balance"]
        ]
    ])
}

function getWalletSnapshot() {
    logger.log('info', new Date(), '[getWalletSnapshot]');

    return ws.send([
        0,
        "calc",
        null,
        [
            //   ["funding_sym_fUSD"],
            ["ws"]
        ]
    ])
}

function postLineMsg(msg) {
    const postData = JSON.stringify({
        "to": ["--"],
        "messages": [{
            "type": "text",
            "text": msg
        }]
    });
    logger.info('[postLineMsg]', msg);
    console.log('[postLineMsg] %s', msg);

    const channelAccessToken = '--';

    const options = {
        hostname: 'api.line.me',
        port: 443,
        path: '/v2/bot/message/multicast',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + channelAccessToken,
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(options, (res) => {
        res.resume();
        res.on('end', () => {
            if (!res.complete)
                console.error(
                    'The connection was terminated while the message was still being sent');
        });
        res.on('data', d => {
            process.stdout.write(d)
        })
    });

    req.write(postData);
    req.end();
}

function transLineMsg(msg) {
    const fieldKeys = ['ID', 'SYMBOL', 'AMOUNT', 'STATUS'];
    const lineMsg = [msg[0]];
    if (Array.isArray(msg[1])) {
        msg[1].forEach(detail => {
            fieldKeys.forEach(key => {
                lineMsg.push(key + ':' + detail[key]);
            })
            lineMsg.push('--');
        });
    } else {
        fieldKeys.forEach(key => {
            lineMsg.push(key + ':' + msg[1][key]);
        });
    }

    return lineMsg.join('\r\n');
}

let wsTimeoutFlag;

function delayGetWalletSnapshot() {
    clearTimeout(wsTimeoutFlag);
    wsTimeoutFlag = setTimeout(() => getWalletSnapshot(), 1000 * 60 * 3);
}

ws.on('message', (msg) => { // The 'message' event is called whenever the ws recieves ANY message
    switch (msg[1]) {
        case undefined:
        case 'fcc':
        case 'foc':
        case 'fos':
            break;
        case 'bu':
        case 'hb':
        case 'n':
            delayGetWalletSnapshot();
            break;
        case 'flc':
            try {
                console.log('[message]', msg[2][1]);
                ws.subscribeCandles('trade:15m:' + msg[2][1] + ':a30:p2:p30')
            } catch (e) {
                console.log(e.stack);
                // ignore
            }
            try {
                logger.info('[message]', transletMsg(msg));
            } catch (e) {
                logger.error('error', new Date(), '[message]', e.stack);
                logger.error('error', new Date(), '[message]', msg);
            }
            // postLineMsg(transLineMsg(transletMsg(msg)));
            break;
            // case 'fcn':
            //     postLineMsg(genMsg(msg));
            //     break;
            // case 'fon':
            //     postLineMsg(genMsg(msg));
            //     break;
        case 'fcs':
        case 'foc':
        case 'fce':
        case 'ws':
        default:
            // log2file('[' + new Date() + ']');
            // log2file('===============================================');
            if (!Array.isArray(msg[1])) {
                try {
                    logger.info('[message]', transletMsg(msg));
                } catch (e) {
                    logger.error('[message]', e.stack);
                    logger.error('[message]', msg);
                }
            }
            // log2file('===============================================');
            // log2file('');
    }

    // let response = JSON.parse(msg)
})

// ws.on('open', ()=>{ws.auth()})
ws.on('auth', () => {
    console.log('=== auth complete  ===')
});


function updateRate(symbol, values){
    const maxValue = Math.max(...values);
    const [avg, sd]=calcAvgSD(values);
    fundingRate[symbol] = [maxValue, Math.max(maxValue-sd, avg), avg, Math.min(avg+sd, maxValue), avg-sd];
    logger.info('[Candle '+symbol+'] max: %s. avg: %s. sd: %s. %s', maxValue, avg, sd, values.join(','));
    console.log('[updateRate]', fundingRate[symbol]);
}


// key:'trade:1m:fUSD:a30:p2:p30'
ws.onCandle({
    key: 'trade:15m:fUSD:a30:p2:p30'
}, function (msg) {
    if (!Array.isArray(msg)) {
        return;
    }
    const highArray = msg.slice(0, 15).map(candle => candle.high);
    updateRate('fUSD', highArray);
    setTimeout(() => {
        updateWalletSnapshot();
        updateBalance();
    }, 1000);
    // get top value
    ws.send([
        0,
        "calc",
        null,
        [
            ["ws"]
        ]
    ])
    ws.unsubscribeCandles('fUSD:a30:p2:p30', '15m');
});


ws.onCandle({
    key: 'trade:15m:fBTC:a30:p2:p30'
}, function (msg) {
    if (!Array.isArray(msg)) {
        return;
    }

    const highArray = msg.slice(0, 15).map(candle => candle.high);
    updateRate('fBTC', highArray);
    setTimeout(() => {
        updateWalletSnapshot();
        updateBalance();
    }, 1000);
    ws.unsubscribeCandles('fBTC:a30:p2:p30', '15m');
});

ws.onCandle({
    key: 'trade:15m:fETH:a30:p2:p30'
}, function (msg) {
    if (!Array.isArray(msg)) {
        return;
    }
    const highArray = msg.slice(0, 8).map(candle => candle.high);
    updateRate('fETH', highArray);

    setTimeout(() => {
        updateWalletSnapshot();
        updateBalance();
    }, 1000);
    ws.unsubscribeCandles('fETH:a30:p2:p30', '15m');
});

ws.onFundingOfferClose({}, (msg) => {
    const fields = ['id', 'symbol', 'amount', 'status', 'rate'];
    const lineMsg = ['Funding Offer Close'];
    fields.forEach(key => lineMsg.push(key + ': ' + msg[key]));
    lineMsg.join('\r\n');
    // postLineMsg(lineMsg.join('\r\n'));
    ws.subscribeCandles('trade:15m:' + msg.symbol + ':a30:p2:p30')
})

ws.onFundingCreditClose({}, (msg) => {
    const fields = ['id', 'symbol', 'amount', 'status', 'rate'];
    const lineMsg = ['Funding Credit Close'];
    fields.forEach(key => lineMsg.push(key + ': ' + msg[key]));
    lineMsg.join('\r\n');
    // postLineMsg(lineMsg.join('\r\n'));
    ws.subscribeCandles('trade:15m:' + msg.symbol + ':a30:p2:p30')
})


let fosTimeoutFlag;

function delayUpdateFunding() {
    clearTimeout(fosTimeoutFlag);
    fosTimeoutFlag = setTimeout(() => updateFunding(), 1000 * 60 * 15);
}

ws.onFundingOfferNew({}, (msg)=>{
    delayUpdateFunding();
});

ws.onOrderBook({
    symbol: 'fUSD'
}, function (msg) {
    // log2file('[' + new Date() + ']');
    // log2file('---Candle--------------------------------------');
    // log2file(msg);
    // log2file('-----------------------------------------------');
    // ws.unsubscribeCandles('fUSD', '1m');
});

function newUSDOffer(available, rates){
    // 低於 50 就無法放貸，為了避免剩餘小於50的金額。
    // 所以每輪放貸前先檢查是否會出現餘額小於50 的狀況，
    // 如果會小於 50 就直接全部餘額全部放貸。
    const reverseRates = [...rates].reverse();
    logger.info('[New USD Offer] available: %s, max rate: %s, max rate2: %s, avg rate: %s, avg rate2: %s', available, rates[0], rates[1], rates[2], rates[3]);
    console.log('[New USD Offer] available: %s, max rate: %s, max rate2: %s, avg rate: %s, avg rate2: %s', available, rates[0], rates[1], rates[2], rates[3]);
    let index = 0;
    while(available>50 && index <4){
        if (available-100 > 50){
            newOffer('fUSD', 100, reverseRates[index]);
            available -= 100;
        }else{
            newOffer('fUSD', available, reverseRates[index]);
            available = 0;
        }
        index+=1;
    }
}

ws.onWalletSnapshot({}, (msg) => {
    // log2file('=== onWalletSnapshot start ===');
    myWallet.updateTime = new Date() + '';
    myWallet.wallet = msg.map(({
        currency,
        balance,
        type,
        balanceAvailable
    }) => ({
        type,
        currency,
        balance,
        balanceAvailable
    }))
    const fundingWallet = myWallet.wallet.filter(wallet => wallet.type === 'funding' && wallet.balanceAvailable > 0);
    fundingWallet.forEach(wallet => {
        const symbol = 'f' + wallet.currency;
        const rate = fundingRate[symbol][4]; // avg-sd value
        if (rate <= 0) {
            return;
        }

        if (symbol === 'fUSD'){
            newUSDOffer(wallet.balanceAvailable,  fundingRate[symbol]);
        } else {
            newOffer(symbol, wallet.balanceAvailable, rate);
        }
    });

    // log2file(myWallet);
    // log2file('=== onWalletSnapshot end ===');
});

ws.onWalletUpdate({}, (msg) => {
    // log2file('=== onWalletUpdate start ===');
    const {
        type,
        currency,
        balance,
        balanceAvailable
    } = msg;

    myWallet.updateTime = new Date() + '';
    myWallet.wallet.some(wallet => {
        if (wallet.type === type && wallet.currency === currency) {
            wallet.balance = balance;
            wallet.balanceAvailable = balanceAvailable;
            return true;
        }
        return false;
    });

    const fundingWallet = myWallet.wallet.filter(wallet => wallet.type === 'funding');
    fundingWallet.forEach(wallet => {
        const symbol = 'f' + wallet.currency;
        const rate = fundingRate[symbol][4] // avg -sd value;
        if (rate <= 0) {
            return;
        }
        
        if (symbol === 'fUSD'){
            newUSDOffer(wallet.balanceAvailable, fundingRate[symbol]);
        } else {
            newOffer(symbol, wallet.balanceAvailable, rate);
        }
    });
    // log2file(fundingRate);

    // log2file(myWallet);
    // log2file('=== onWalletUpdate end ===');
});

ws.onFundingOfferSnapshot({}, (msg) => {
    const current = Date.now();
    const maxWaittingTime = 1000 * 60 * 15; // 15 mins
    msg.filter(({
            mtsCreate
        }) => current - mtsCreate > maxWaittingTime)
        .forEach((offer) => {
            logger.info(
                '[Funding Offer Snapshot] Offer: %s, symbol: %s, amount: %s, rate: %s, mtsCreate: %s', 
                 offer.id,
                 offer.symbol, 
                 offer.amount, 
                 offer.rate,
                 offer.mtsCreate
                 );
            cancelOffer(offer.id);
        })
});

ws.onBalanceInfoUpdate({}, () => {

});

// .then(() => cancelOffer(800726618111))
// .then((msg)=>{
//     console.log('cancelOffer response',msg);
// })
// .then(() => fetchWallets());
function updateWalletSnapshot() {
    return ws.send([
        0,
        "calc",
        null,
        [
            ["ws",'balance']
        ]
    ])
}

function updateBalance() {
    return ws.send([
        0,
        "calc",
        null,
        [
            ["balance"]
        ]
    ])
}

function updateFunding() {
    return ws.send([
        0,
        "calc",
        null,
        [
            ["funding_sym_fBTC"],
            ["funding_sym_fETH"],
            ["funding_sym_fUSD"]
        ]
    ])
}

module.exports = {
    initWs: function () {
        return ws.open()
            .then(() => ws.auth())
            .then(() => {
                // setTimeout(() => {
                //     ws.subscribeCandles('trade:15m:fUSD:a30:p2:p30')
                //     ws.subscribeCandles('trade:15m:fBTC:a30:p2:p30')
                //     ws.subscribeCandles('trade:15m:fETH:a30:p2:p30')
                // }, 3000);
                ws.subscribeCandles('trade:15m:fUSD:a30:p2:p30')
                    ws.subscribeCandles('trade:15m:fBTC:a30:p2:p30')
                    ws.subscribeCandles('trade:15m:fETH:a30:p2:p30')
            })
            .then(() => updateWalletSnapshot())
            .then(() => updateFunding())
            .then(() => ws);
    },
    getWalletSnapshot() {
        return myWallet;
    },
    updateWalletSnapshot
};