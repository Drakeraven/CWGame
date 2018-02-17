function Map(gameEngine) {
    this.game = gameEngine;
    this.simpleMapData = [];
    this.mapList = [];
    // Note: not needed when you give mapData.

}
Map.prototype.constructor = Map;

Map.prototype.addThing = function (thing) {
    if (this.mapList[y][x].thing == null & thing != null) {
        updateMapData(x, y, thing.bWidth, thing.bHeight, 2);
        this.mapList[y][x].thing = thing;
        this.mapList[y][x].tileType = 2;
        this.game.addEntity(thing);
        if (thing.dimensionX > 1) {
            console.log('hi');
            for (i = x + 1; i < x + thing.dimensionX; i++) {
                this.mapList[y][i].thing = thing;
                console.log(this.mapList[y][i].thing)
            }
        }
        if (thing.dimensionY > 1) {
            for (i = y + 1; i < y + thing.dimensionY; i++) {
                this.mapList[i][x].thing = thing;
                console.log(this.mapList[y][i].thing)
            }
        }
    }
}
Map.prototype.readMap = function (mapData) {

    for (i = 0; i < mapData.length; i++) {
        this.mapList[i] = new Array(mapData.length);
        for (j = 0; j < mapData[i].length; j++) {
            x = j;
            y = i;
            tileType = mapData[i][j];
            //console.log(mapData[i][j]);
            //console.log(twodtoisoX(x, y) + ' '+ twodtoisoY(x, y));
            var tile = new Tile(this.game, tileType, x, y);
            //this.game.addEntity(tile);
            this.mapList[i][j] = tile;
        }
    }
    this.game.initcamera();
}

// tiling going down
function Tile(game, tileType, x, y) {
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/grass.png"), 0, 0, 58, 30, 1, .15, 1, true);
    this.thing;
    this.grassImage = new Image();
    this.grassImage.src = "./img/grass.png";
    this.roadImage = new Image();
    this.roadImage.src = "./img/Land1a_00002.png";
    this.game = game;
    this.x = x;
    this.y = y;
    this.tileType = tileType;
}

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.getThing = function () {
    return this.thing;
}
Tile.prototype.draw = function (ctx) {
    let image = this.tileType == 1 ? this.roadImage : this.grassImage;
    ctx.drawImage(
        image,
        this.game.twodtoisoX(this.x, this.y),
        this.game.twodtoisoY(this.x, this.y)
    );
}



