var Twit = require(‘twit’);

require(‘dotenv’).config();

const Bot = new Twit({
    consumer_key:           process.env.CONSUMER_KEY,
    consumer_secret:        process.env.CONSUMER_SECRET,
    access_token:           process.env.ACCESS_TOKEN,
    access_token_secret:    process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:             60 * 1000,
    });

    console.log('O bot esta rodando');

/* BotInit() : Para iniciar o bot */

    function BotInit() {
        var query = {
    //Aqui vai o que você quer buscar
            q: "apoptose",
            result_type: “recent”
        }
    // Este método busca os tweets mais recentes baseado na sua query
        Bot.get(‘search/tweets’, query, BotGotLatestTweet);
        function BotGotLatestTweet (error, data, response) {
            if (error) {
                console.log('Bot não pôde achar o ultimo tweet, :' + error);
            } else {
                var id = {
                id : data.statuses[0].id_str
            }
    // Neste método será retweetado o tweet localizado
            Bot.post(‘statuses/retweet/:id’, id, BotRetweeted);
            function BotRetweeted(error, response) {
                if (error) {
                console.log('Bot não pode retweetar, : ' + error);
            } else {
                console.log('Bot retweetou : ' + id.id});
            }
        }
    }
    }

    /* Define um timeout de 30 minutos (in microsecondes) */
setInterval(BotRetweet, 30*60*1000);
/* Inicia o Bot */
BotInit();