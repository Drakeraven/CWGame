function Map(gameEngine) {
    this.game = gameEngine;
    this.simpleMapData = [];
    this.mapList = [];
    // Note: not needed when you give mapData.

}
Map.prototype.constructor = Map;

Map.prototype.addThing = function (thing, list) {
    if (!thing || !this.isInMapBoundaries(thing) || !this.canAddToMap(thing)) {
        return false;
    }
    this.addToLists(thing, list);
    this.addToMaps(thing);
    return true;
}
Map.prototype.readMap = function (mapData) {

    for (i = 0; i < mapData.length; i++) {
        this.mapList[i] = new Array(mapData.length);
        for (j = 0; j < mapData[i].length; j++) {
            x = j;
            y = i;
            tileType = mapData[i][j];
            //console.log(twodtoisoX(x, y) + ' '+ twodtoisoY(x, y));
            var tile = new Tile(this.game, tileType, x, y);
            //this.game.addEntity(tile);
            this.mapList[i][j] = tile;
        }
    }
    this.game.initcamera();
}

Map.prototype.isInMapBoundaries = function (thing) {
    let x = thing.x;
    let y = thing.y;
    if (x < 0 || y < 0 || x > (this.mapList.length - thing.bWidth)|| y > (this.mapList.length - thing.bHeight)) {
        return false;
    }
    return true;
};
//Can't add on 1- existing road, 2- existing building, or if 
Map.prototype.canAddToMap = function (thing) {
    for (i = thing.x; i < thing.x + thing.bWidth; i++) {
        for (j = thing.y; j < thing.y + thing.bHeight; j++) {
            if (this.mapList[j][i].tileType != 0 || this.mapList[j][i].thing != null) {
                return false;
            }
        }
    }
    return true;
};

Map.prototype.addToLists = function (thing, list) {
    if (list) {
        list.push(thing);
    }
    this.game.entities.push(thing);
};

Map.prototype.addToMaps = function (thing) {
    for (i = thing.x; i < thing.x + thing.bWidth; i++) {
        for (j = thing.y; j < thing.y + thing.bHeight; j++) {
            walkerMap[j][i] = 2;
            this.mapList[j][i].thing = thing;
        }
    }
};

// tiling going down
function Tile(game, tileType, x, y) {
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/grass.png"), 0, 0, 58, 30, 1, .15, 1, true);
    this.gfxString = '';
    this.grassImage = "./img/grass.png";
    this.roadImage = "./img/FloodPlain_00091.png";
    this.treeImage = "./img/Trees_00012.png";

    if (tileType === 0) {
        this.gfxString = this.grassImage;
    } else if (tileType === 1) {
        this.gfxString = this.roadImage;//road img
    } else if (tileType === 3) {
        this.gfxString = this.treeImage;
    }
    this.thing = null;
    this.image = new Image();
    this.image.src = this.gfxString;
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
    ctx.drawImage(
        this.image,
        this.game.twodtoisoX(this.x, this.y),
        this.game.twodtoisoY(this.x, this.y)
    );
}
