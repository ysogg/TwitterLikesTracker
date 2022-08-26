const {TwitterApi} = require('twitter-api-v2');
const { sleepSecs } = require('twitter-api-v2/dist/v1/media-helpers.v1');

const token = process.env.BEARER_TOKEN;
const client = new TwitterApi(token);
const user = "769604882370224128";

var recentLike = -1;
var currLike;


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
    //Test print // expand later
    console.log("New like found")
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
                shoot()
            }
            recentLike = currLike
            console.log(resp);
        
        } catch (e) {
          console.log(e);
          process.exit(-1);
        } 
    }
  })();











