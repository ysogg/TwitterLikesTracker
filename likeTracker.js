const {TwitterApi} = require('twitter-api-v2');

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

// while (True)


(async () => {
    try {
        const resp = await lookup();
        console.log(resp);
    
    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
    process.exit();
  })();











