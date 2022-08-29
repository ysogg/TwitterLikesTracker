const {TwitterApi} = require('twitter-api-v2');
const { sleepSecs } = require('twitter-api-v2/dist/v1/media-helpers.v1');

const token = process.env.BEARER_TOKEN;
const client = new TwitterApi(token);
const user = "769604882370224128";

var btsp = require('bluetooth-serial-port')
var serial = new btsp.BluetoothSerialPort();

var recentLike = -1;
var currLike;
var likeCount = 0;

const errFunction = (err) => {
    if (err) {
        console.log('Error', err)
    }
}

serial.on('found', function (address, name) {
    serial.findSerial.PortChannel(address, function (channel) {
        serial.connect(address, channel, function () {
            console.log("Serial connected")

            serial.on('data', function (buffer) {
                console.log(buffer.toString('utf-8'))
            })
        }, function () {
            console.log('Serial failed to connect')
        })

        serial.close()
    }, function () {
        console.log('Found nothing')
    })
});

serial.inquire()


async function lookup() {
    const likedTweets = await client.v2.userLikedTweets(
        user, 
        params = {
            "max_results": 5 //optimise number of requests w/ tweet cap
        });



    currLike = likedTweets.tweets[0].id;
    // console.log(likedTweets.tweets[0].id);

    return currLike;

}


async function shoot() {
    console.log("New like found")
    likeCount++
    
    //Retract
    serial.write(Buffer.from('L', 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err)
    })

    await sleepSecs(0.5)

    //Extend
    serial.write(Buffer.from('H', 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err)
    })

    await sleepSecs(0.5)

    //Cut power
    serial.write(Buffer.from('X', 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err)
    })
}


async function dump() {
    serial.write(Buffer.from('L', 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err)
    })

    await sleepSecs(3)

    serial.write(Buffer.from('H', 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err)
    })

    await sleepSecs(0.5)

    serial.write(Buffer.from('X', 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err)
    })
}


(async () => {
    while (true) {
        process.on('SIGNIT', () => {
            console.log("Exiting...")
            process.exit();
        })

        await sleepSecs(5) // On 5 second delay while testing, idk what this'll end up being

        try {
            const resp = await lookup();
            if ( (recentLike != -1) && (recentLike != currLike) ) {
                if (likeCount > 6) {
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











