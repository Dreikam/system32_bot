const router = require('express').Router();
const {isAuthorized} = require('../lib/functions');
const UserGuilds = require('../../src/models/UserGuilds.model');

router.get('/', isAuthorized , async (req, res) => {
    const data = await UserGuilds.findOne({discordID: req.user.discordID});

    res.render('dashboard', {
        title: 'Dashboard | Inicio',
        user: req.user.toJSON(),
        guilds: data.guilds
    });
});

module.exports = router;