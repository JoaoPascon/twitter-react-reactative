const Tweet = require('../models/Tweet');

module.exports = {
    async index(req, res) {
        const tweets = await Tweet.find({}).sort('-createdDate');

        return res.json(tweets);
    },

    async store(req, res) {
        const tweet = await Tweet.create(req.body);

        // para enviar informações/evento contendo nosso tweet pra quem estiver conectado
        req.io.emit("tweet", tweet);

        return res.json(tweet);
    }
}