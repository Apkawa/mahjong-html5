require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        mootools: '../bower_components/mootools/index',

    }
});

require(['app', 'jquery'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    var players = [new app.Player(), new app.Player(), new app.Player(), new app.Player()];
    var game_board = new app.GameBoard(players);
    game_board.start_game();
});
