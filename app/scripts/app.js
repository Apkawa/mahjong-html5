/*global define */
define(['mootools'], function () {
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
                        this.wall.push(new Tile(p + i))
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
                    this.wall.push(new Tile(p + i))
                }
            }
        }
    });

    GameBoard.dice_roll = function() {
        return Math.floor((Math.random()*6)+1) + Math.floor((Math.random()*6)+1);
    };

    var Player = new Class({
        initialize: function (name) {
            this.name = name;
            this.hand = new Hand();
            this.discard = new Discard();
        },

        set_wind: function(wind) {
            this.wind = wind;
        }

    });

    var TileGroup = new Class({
        initialize: function (tiles) {
            this.tiles = new Array(tiles|[]);
        },
        add: function (tile) {
            this.tiles.push(tile);
        },

        pop: function () {
            return this.tiles.pop();
        },

        last_tile: function () {
            return this.tiles.getLast()
        },

        get_tile_types: function() {
            var tile_type = new Array([]);
            for (var i=0; i < this.tiles.length; i++) {
                tile_type.push(this.tiles[i].get_tile_type())
            }
            return tile_type

        }
    });

    var Hand = new Class({
        Extends: TileGroup
    });

    var Discard = new Class({
        Extends: TileGroup
    });

    var Tile = new Class({
        initialize: function (type) {
            this.type = new TileType.get_type(type);
        }
    });

    var TileType = new Class({

        initialize: function (type) {
            this.type = type
        },

        get_tile_type: function () {
            return this.type;
        }


    });

    TileType.types = [
        'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', // Bamboo
        'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', // Pins
        'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', // Mans
        'dr', 'dw', 'dg', // Dragons
        'we', 'ws', 'ww', 'wn', //Winds
        'fd' // Face Down
    ];

    TileType.get_type = function (type_string) {
        if (type_string in TileType.types) {
            // TODO cached instances
            return new TileType(type_string)
        }
        return null;
    };


    return {
        GameBoard: GameBoard,
        Player: Player,
        Hand: Hand,
        Discard: Discard,
        Tile: Tile,
    }


});