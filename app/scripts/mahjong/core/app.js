/*global define */
define(['./entity', 'mootools'], function (entity) {
    var GameBoard = new Class({
        initialize: function (players) {
            this.players = players;
            this.wall = new Array([]);
        },

        start_game: function () {
            // TODO жеребъевка
            var wind = ['s', 'e', 'n', 'w'];
            for (var i=0; i < 4; i++){
                this.players[i].set_wind(wind[i]);
            }

            // TODO Построение стены
            this.build_wall();

            var number = GameBoard.dice_roll();

            // TODO make death wall

            for (var p_i=0; p_i < this.players.length; ++p_i) {
                p = this.players[p_i];
                for (var i=0; i < 13; ++i) {
                    p.hand.add(this.wall.pop())
                }
                if (p.wind == 'w') {
                    p.hand.add(this.wall.pop())
                }
            }

            console.log(this.players)


        },

        build_wall: function () {
            var number_tiles_prefix = ["m", "p", "b"];
            for (var p_index=0; p_index < number_tiles_prefix.length; ++p_index) {
                var p = number_tiles_prefix[p_index];
                for (var r=0; r < 4; ++r){
                    for (var i=1; i <= 9; i++) {
                        this.wall.push(new entity.Tile(p + i))
                    }
                }
            }

            var special_tiles = [
                'dr', 'dw', 'dg', // Dragons
                'we', 'ws', 'ww', 'wn', //Winds
            ];
            for (var p_index=0; p_index < special_tiles.length; ++p_index) {
                var p = special_tiles[p_index];
                for (var r=0; r < 4; ++r){
                    this.wall.push(new entity.Tile(p + i))
                }
            }
        }
    });

    GameBoard.dice_roll = function() {
        return Math.floor((Math.random()*6)+1) + Math.floor((Math.random()*6)+1);
    };


    return {
        GameBoard: GameBoard,
    }


});