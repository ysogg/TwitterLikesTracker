const {TwitterApi} = require('twitter-api-v2');
const { sleepSecs } = require('twitter-api-v2/dist/v1/media-helpers.v1');
const { SerialPort } = require('serialport');
require("dotenv").config();

const token = process.env.BEARER_TOKEN;
const client = new TwitterApi(token);
const user = "769604882370224128";

var recentLike = -1;
var currLike;
var likeCount = 0;



const port = new SerialPort({
    path: "COM4",
    baudRate: 9600 
})

port.on('open', () => {
    console.log('Serial port opened');
})


async function lookup() {
    const likedTweets = await client.v2.userLikedTweets(
        user, 
        params = {
            "max_results": 5 //optimise number of requests w/ tweet cap
        });



    currLike = likedTweets.tweets[0].id;

    return currLike;

}


async function shoot() {
    console.log("New like found")
    likeCount++
    
    //Retract
    port.write('1', 'utf-8')

    await sleepSecs(2)

    //Extend
    port.write('2', 'utf-8')

    await sleepSecs(1)

    //Cut power
    port.write('3', 'utf-8')
}


async function dump() {
    likeCount = 0
    port.write('1', 'utf-8')

    await sleepSecs(6)

    port.write('2', 'utf-8')

    await sleepSecs(1)

    port.write('3', 'utf-8')
}


(async () => {
    while (true) {
        process.on('SIGNIT', () => {
            console.log("Exiting...")
            process.exit();
        })

        await sleepSecs(6) 

        try {
            const resp = await lookup();
            if ( (recentLike != -1) && (recentLike != currLike) ) {
                if (likeCount > 3) {
                    dump()
                } else {
                    shoot()
                }
            }
            recentLike = currLike
            console.log(resp);
        
        } catch (e) {
          console.log(e);
          process.exit(-1);
        } 
    }
  })();











