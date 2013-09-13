/**
 * Author: apkawa
 * Date: 9/13/13
 */

define(['mootools'], function () {

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

    TileType.numered_tiles = [
        'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', // Bamboo
        'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', // Pins
        'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', // Mans
    ];

    TileType.special_tiles = [
        'dr', 'dw', 'dg', // Dragons
        'we', 'ws', 'ww', 'wn', //Winds
    ];

    TileType.other_type = [
        'fd' // Face Down
    ];

    TileType.types = TileType.numered_tiles.append(TileType.special_tiles).append(TileType.other_type);


    TileType.get_type = function (type_string) {
        if (type_string in TileType.types) {
            // TODO cached instances
            return new TileType(type_string)
        }
        return null;
    };

    return {
        Player: Player,
        Hand: Hand,
        Discard: Discard,
        Tile: Tile,
    };
});