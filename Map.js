function Map(gameEngine) {
    this.game = gameEngine;
    this.simpleMapData = [];
    this.mapList = [];
    // Note: not needed when you give mapData.

}
Map.prototype.constructor = Map;

Map.prototype.addThing = function(thing, list) {
  var x = thing.x;
  var y = thing.y;
  var canDo = true;
  for (i = thing.x; i < thing.x + thing.bWidth; i++) {
    for(j = thing.y; j < thing.y + thing.bHeight; j++) {
      if(this.mapList[j][i].thing != null || walkerMap[i][j] != 0) {
        canDo = false;
      }
    }
  }
    if (canDo && thing) {
        console.log('hi');
        updateMapData(x, y, thing.bWidth, thing.bHeight, 2);
        if (list) {
            list.push(thing);
            this.game.entities.push(thing);
        } else {
            this.game.entities.push(thing);
        }

        for (i = thing.x; i < thing.x + thing.bWidth; i++) {
            for (j = thing.y; j < thing.y + thing.bHeight; j++) {
                console.log(thing.x + ' ' + thing.y)
                this.mapList[j][i].thing = thing;
            }
        }
        console.log(walkerMap);
        console.log(this.mapList);
        return true;//if adding was successful return 1
    }
    return false;
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
