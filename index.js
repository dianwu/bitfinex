'use strict';

const bitfinex = require('./util/bitfinex');
const line = require('@line/bot-sdk');
const fs = require('fs');
const https = require('https');
const express = require('express')
const app = express();
const port = 3000

const credentials = {
    key: fs.readFileSync('/etc/stunnel/backup.key'),
    cert: fs.readFileSync('/etc/stunnel/backup.cert')
};

// create LINE SDK config from env variables
const config = {
    // channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    // channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: '--',
    channelSecret: '--',
};

const client = new line.Client(config);
const registedUsers = ['U98d0f346f8790415b949448dae43ac04'];
const ERR_EVENT = {
    UNREGISTED_USER: 1,
};
const POSTBACK_ACT = {
    IS_WS_OPEN: 1,
}


function isRegistedUser(userId) {
    return registedUsers.indexOf(userId) >= 0;
}


function greetingMessage() {
    return {
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            // "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            // "imageAspectRatio": "rectangle",
            // "imageSize": "cover",
            // "imageBackgroundColor": "#FFFFFF",
            "title": "Menu",
            "text": "Please select",
            "actions": [
                {
                    "type": "postback",
                    "label": "Bitfinex ws status",
                    "data": JSON.stringify({action:POSTBACK_ACT.IS_WS_OPEN}),
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123",
                },
            ]
        }
    };
}



function handlePostbackEvent(event) {
    console.log('handlePostbackEvent data:', event.postback.data);
    const data = JSON.parse(event.postback.data);
    console.log('postback data:', data);
    let echo;
    switch (data.action) {
        case POSTBACK_ACT.IS_WS_OPEN:
            echo = {
                type: 'text', text:
                    [
                        'bitfinexWs.isOpen():' + bitfinexWs.isOpen(),
                    ].join('\n')
            };
            break;
    }
    return client.replyMessage(event.replyToken, echo);
}

// event handler
function handleEvent(event) {

    // if (event.type !== 'message' && event.message.type !== 'text' && event.type !== 'postback') {
    //     // ignore non-text-message event
    //     return Promise.resolve(null);
    // }
    console.log('destination', event);
    // create a echoing text message

    const { userId } = event.source;
    client.getProfile(userId)
        .then((profile) => {
            console.log(profile);
            return profile;
        }, () => ({ displayName: '' }))
        .then(({ displayName }) => {
            if (!isRegistedUser(userId)) {
                return Promise.reject({ code: UNREGISTED_USER, msg: 'unregisted user', displayName });
            }

            if (event.postback) {
                return handlePostbackEvent(event);
            }

            const wallet = bitfinex.getWalletSnapshot()
                .wallet
                .sort(({ type: typeA }, { type: typeB }) => typeA.localeCompare(typeB))
                .map(({ type, currency, balance }) => `[${type}] C: ${currency} B: ${balance}`);
            console.log('bitfinex.getWalletSnapshot()');
            console.log(wallet);
            console.log('=========');
            const greetingEcho = {
                type: 'text', text:
                    [
                        `你好 ${displayName},需要什麼協助？`,
                        '[1]：取得 Bitfinex 帳戶餘額',
                        '--'].concat(wallet).join('\n')
            };
            return client.replyMessage(event.replyToken, greetingMessage());
        })
        .catch(err => {
            console.log(err);
            switch (err.code) {
                case ERR_EVENT.UNREGISTED_USER:
                default:
                    const needRegistEcho = { type: 'text', text: `你好 ${err.displayName}，請先註冊。` };
                    return client.replyMessage(event.replyToken, needRegistEcho);

            }
        })
}

app.post('/callback', line.middleware(config), (req, res) => {
    console.log('callback', req.url, req.body.events, req.body.destination);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


https.createServer(credentials, app).listen(3001, function () {
    console.log('Express https server listening on port ' + 3001);
});

let bitfinexWs;
 bitfinex.initWs().then(ws => bitfinexWs = ws);
