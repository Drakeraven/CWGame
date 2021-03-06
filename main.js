

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop) {
    this.spriteSheet = spriteSheet;
    this.startX = startX * frameWidth;
    this.startY = startY * frameHeight;
    this.frameWidth = frameWidth;
    this.sheetWidth = sheetWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
}



Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }

    var colIndex = this.currentFrame() % this.sheetWidth
    var rowIndex = Math.floor(this.currentFrame() / this.sheetWidth);

    if ((colIndex + 1) * this.frameWidth > this.spriteSheet.width) {
        rowIndex++;
    }

    ctx.drawImage(this.spriteSheet, colIndex * this.frameWidth + this.startX,
        rowIndex * this.frameHeight + this.startY, this.frameWidth,
        this.frameHeight, x, y, this.frameWidth, this.frameHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function getTileInfo(x, y, game) {
    return game.map.mapList[x][y];
}

function getNeighbors(x, y, game) {
    neighbors = [];
    neighbors["above"] = game.map.mapList[x - 1][y];
    neighbors["below"] = game.map.mapList[x + 1][y];
    neighbors["left"] = game.map.mapList[x][y - 1];
    neighbors["right"] = game.map.mapList[x][y + 1];
    return neighbors;
}
//need an instance at start. we can adjust values as needed.
function GameWorld() {
    this.palace = null;
    this.prosperity = 0;
    this.population = 0;
    this.workForce = 0;
    this.taxRev = .10;
    this.funds = 1000;
    this.goals = goalsArray;//defined in constants.js
    this.maxNumberOfTaxHouses = 2;
    this.numberOfTaxHouses = 0;
    this.maxNumberOfGoldMines = 1;
    this.numberOfGoldMines = 0;
    this.currentGoal = 0; //first one, just used for array indexing
}

GameWorld.prototype.addPop = function (num) {
    this.population += num;
}

GameWorld.prototype.remPop = function (num) {
    this.population -= num;
}

GameWorld.prototype.withdrawFunds = function (num) {
    this.funds -= num;
}

GameWorld.prototype.addFunds = function (num) {
    this.funds += num;

}

GameWorld.prototype.getWorkForce = function () {
    return Math.floor(this.population * .40); //40% population is work force, change how I'm doing it??
}
GameWorld.prototype.toStringGame = function () {
    str = "Prosperity: " + this.prosperity +
        "\nPopulation: " + this.population +
        "\nWork Force: " + this.workForce +
        "\nTax Revenue:" + this.taxRev;
    return str;
};

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();
var walkerMap = new MapData().testMap;
var mapData = new MapData().testMap;//THIS IS THE ORIGINAL MAP- NOT CHANGED
ASSET_MANAGER.assetQueueDownloads();// found in assetmanager.js
var gameEngine = null;//made gameengine null to easily access gameWorld info
$(function () {//shorthand for window.ready
    ASSET_MANAGER.downloadAll(function () {
        var music = new Audio("./audio/Khepera.mp3");
        music.volume = .5;
        music.load();
        music.loop = true;
        // Initialize state
        //console.log("starting up da sheild");
        var canvas = document.getElementById('gameWorld');
        var ctx = canvas.getContext('2d');
        gameEngine = new GameEngine();
        gameEngine.gameWorld = new GameWorld();
        gameEngine.map = new Map(gameEngine);
        gameEngine.init(ctx);
        gameEngine.map.readMap(new MapData().testMap);
        gameEngine.gameWorld.palace = new Palace(gameEngine, 55, 55);
        gameEngine.map.addThing(gameEngine.gameWorld.palace, null);

       // console.log(gameEngine.entities);
        //console.log(walkerMap);

        // Enable Start button
        $('#StartButton').removeAttr("disabled");
        $('#StartButton').click(function () {
            $('#SplashScreen').remove();
            $('.game-container').show();

            // Start the game
            gameEngine.start();
            music.play();
            //console.log(walkerMap);
            showPopUpText();
        });
    });

    $('#Close-Button-Manual').click(function () {
        $("#Manual-Box").hide();
        setButton("Select");
    });
    $('#Close-Button-Controls').click(function () {
        $("#Controls-Box").hide();
        setButton("Select");
    });
    $('#Close-Button').click(function () {
        $("#Game-Information").hide();
        $('.pharoh-button.highlighted').removeClass('highlighted');
        setButton("Select");
    });

    $('#Close-Button-Goal').click(function () {
        $("#Goal-Information").hide();
        setButton("Select");
    });
    
});
