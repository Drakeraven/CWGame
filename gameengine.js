// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Timer() {
    this.gameTime = 0;
    this.maxStep = .05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.buildings = []; //add general buildings here (cop, fire, well, water)
    this.housingArr = []; //add houses here
    this.walkers = []; //Add Walkers to this ONLY
    this.industries = []; //Add Industries to this ONLY
    this.yards = [];
    this.granaries = [];
    this.map;
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.gameWorld = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    this.cameraoffX = 0;
    this.cameraoffY = 0;
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

//2D to ISO functiosn to manipulate X and Y
GameEngine.prototype.twodtoisoX = function (x, y) {
    return (((x - y) + this.cameraoffX) * 29);
}
GameEngine.prototype.twodtoisoY = function (x, y) {
    return (((x + y) - this.cameraoffY)) * 15;
}
GameEngine.prototype.isototwodX = function (x, y) {
    return Math.floor((((x / 29) - this.cameraoffX) + ((y / 15) + this.cameraoffY)) / 2) - 1;
}
GameEngine.prototype.isototwodY = function (x, y) {
    return Math.floor((((y / 15) + this.cameraoffY) - ((x / 29) - this.cameraoffX)) / 2);
}
var isDrawing = false;
//Listens to input and events
GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
    this.ctx.canvas.addEventListener("mouseDown", function (event) {//click down
        //adjusts x and y
        fixX = event.clientX - (event.clientX % 29);
        fixY = event.clientY - (event.clientY % 15);
        //converts to iso
        fixX = isototwodX(fixX, fixY);
        fixY = isototwodY(fixX, fixY);
        selection = $('.pharoh-button').hasClass("selected").attr("title");
        if (selection == "Roads") {
            drawRoad();
        } else {
            if (walkerMap[fixX][fixY] != 1) {
                //sets selection
                selectedBuilding = setSelected();
                //creates object and adds to map
                that.buildOnCanvas(selectedBuilding, fixX, fixY);
            }
        }


    });

    function drawRoad(x, y) {
        walkerMap[x][y] = 1;
        this.map.mapList[y][x].tiletype = 1; // or should these be seperate?
    }
    //sets tiles to original.
    function removeRoad(x,y){
        walkerMap[x][y] = mapdata[x][y] ;
        this.map.mapList[y][x].tiletype = mapdata[x][y];
    }

    this.ctx.canvas.addEventListener("drag", function (event) {//click hold
        //Only calls buildoncanvas is selection is "Road"
        //adjusts x and y
        fixX = event.clientX - (event.clientX % 29);
        fixY = event.clientY - (event.clientY % 15);
        //converts to iso
        fixX = isototwodX(fixX, fixY);
        fixY = isototwodY(fixX, fixY);

        if (isDrawingRoad) {
            drawRoad();
        }

    });

    this.ctx.canvas.addEventListener("mouseUp", function (event) {//click release
        isDrawing = false;
    });

    this.ctx.canvas.addEventListener("contextmenu", function (event) {
        //TODO clears selection, sets up "Select" functionality
        setButton("Select");
    });
    //Handles Hot Keys
    this.ctx.canvas.addEventListener("keydown", function (event) {
        setHotKeys(event);
    });
    console.log('Input started');
}

GameEngine.prototype.buildOnCanvas = function (x, y) {
    let selection = $('.pharoh-button').hasClass("selected").attr("title");
    if (selection != "Roads") {
        //Will return nothing if no buttons are selected
        let selectedButton = $('#selectId').val();
        //this is check, so we don't call .attr on null
        if (selectedButton.length > 0) {
            selection = selectedButton.attr('value');
        }
    }


    var that = this;
    let entity = null;
    switch (selection) {
        //addmap function called at the very end, so its not repeated in each case
        //NOTICE: Some are added to special arrays defined above this gameengine, some are pushed to entities[]
        //X and Y have been make ISO friendly before entering this function
        case "House":
            entity = new Housing(that, x, y);
            this.housingArr.push(entity);
            break;

        case "Grain Farm":
            entity = new grainFarm(that, x, y);
            entities.push(entity);
            break;

        case "Barley Farm":
            entity = new barFarm(that, x, y);
            entities.push(entity);
            break;

        case "Flax Farm":
            entity = new flaxFarm(that, x, y);
            entities.push(entity);
            break;

        case "Hunting Lodge":
            entity = new HuntingLodge(that, x, y);
            entities.push(entity);
        case "Well":
            entity = new Well(that, x, y);
            entities.push(entity);
            break;

        case "Water Supply"://
            entity = new WaterSupply(that, x, y);
            entities.push(entity);
            break;

        case "Bazaar":
            entity = new bazaar(that, x, y);
            entities.push(entity);
            break;

        case "Granary"://
            entity = new Granary(that, x, y);
            granaries.push(entity);
            break;

        case "Storage Yard"://
            entity = new StorageYard(that, x, y);
            yards.push(entity);
            break;

        case "Weaver":
            entity = new Weaver(that, x, y);
            entities.push(entity);
            break;

        case "Brewery":
            entity = new Brewery(that, x, y);
            entities.push(entity);
            break;

        case "Potter":
            entity = new Potter(that, x, y);
            entities.push(entity);
            break;
        case "Clay Pit":
            entity = new clayPit(that, x, y);
            entities.push(entity);
            break;
        case "Gold Mine":
            entity = new goldMine(that, x, y);
            entities.push(entity);

            break;
        case "Fire House":
            entity = new FireHouse(that, x, y);
            entities.push(entity);

            break;
        case "Police Station":
            entity = new CopHouse(that, x, y);
            entities.push(entity);

            break;
        case "Tax House":
            entity = new TaxHouse(that, x, y);
            entities.push(entity);
            break;
        case "Roads":
            entity = new Road(that, x, y);//will be defined in main

        default:
            console.log('nuthin2seahear')
            break
    }
    if (selection) {//checks that selection is not null/ not default
        that.map.addThing(entity);
    }
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.addHouse = function (entity) {
    console.log('added house');
    this.housingArr.push(entity);
}

GameEngine.prototype.addBuilding = function (entity) {
    console.log('added building');
    this.buildings.push(entity);
}

GameEngine.prototype.addWalker = function (walker) {
    console.log("added walker");
    this.walkers.push(walker);
}

GameEngine.prototype.addIndustry = function (industry) {
    console.log("added industry");
    this.industries.push(industry);
}

GameEngine.prototype.addGranary = function (granary) {
    console.log("added Granary");
    this.granaries.push(granary);
}

GameEngine.prototype.addYard = function (yard) {
    console.log("added Storage Yard");
    this.yards.push(yard);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.map.mapList.length; i++) {
        for (var j = 0; j < this.map.mapList[1].length; j++) {
            this.map.mapList[i][j].draw(this.ctx);
        }
    }
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }

    for (var i = 0; i < this.housingArr.length; i++) {
        this.housingArr[i].draw(this.ctx);
    }

    for (var i = 0; i < this.industries.length; i++) {
        this.industries[i].draw(this.ctx);
    }

    for (var i = 0; i < this.granaries.length; i++) {
        this.granaries[i].draw(this.ctx);
    }

    for (var i = 0; i < this.yards.length; i++) {
        this.yards[i].draw(this.ctx);
    }

    for (var i = 0; i < this.walkers.length; i++) {
        this.walkers[i].draw(this.ctx);
    }

    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    var working = this.gameWorld.workForce + 100;
    //give industry employees here :D 

    for (var i = 0; i < this.industries.length; i++) {
        var industry = this.industries[i];
        if (working > industry.numEmpNeeded && industry.numResources > 0) {
            industry.numEmployed = industry.numEmpNeeded;
            working -= industry.numEmpNeeded;
        }
        //console.log(working);
        //console.log()
    }

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = 0; i < this.industries.length; i++) {
        var industry = this.industries[i];

        if (!industry.removeFromWorld) {
            industry.update();
        }
    }

    for (var i = 0; i < this.granaries.length; i++) {
        var granary = this.granaries[i];
        if (!granary.removeFromWorld) {
            granary.update();
        }
    }

    for (var i = 0; i < this.yards.length; i++) {
        var yard = this.yards[i];
        if (!yard.removeFromWorld) {
            yard.update();
        }
    }

    for (var i = 0; i < this.walkers.length; i++) {
        var walker = this.walkers[i];

        if (!walker.removeFromWorld) {
            walker.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }

    for (var i = 0; i < this.housingArr.length; i++) {
        var myHouse = this.housingArr[i];
        if (!myHouse.removeFromWorld) {
            //console.log("Updating building")
            myHouse.update();
        }
    }

    for (var i = this.housingArr.length - 1; i >= 0; --i) {
        if (this.housingArr[i].removeFromWorld) {
            this.housingArr.splice(i, 1);
        }
    }

    for (var i = this.industries.length - 1; i >= 0; --i) {
        if (this.industries[i].removeFromWorld) {
            this.industries.splice(i, 1);
        }
    }

    for (var i = this.granaries.length - 1; i >= 0; --i) {
        if (this.granaries[i].removeFromWorld) {
            this.granaries.splice(i, 1);
        }
    }

    for (var i = this.yards.length - 1; i >= 0; --i) {
        if (this.yards[i].removeFromWorld) {
            this.yards.splice(i, 1);
        }
    }

    for (var i = this.walkers.length - 1; i >= 0; --i) {
        if (this.walkers[i].removeFromWorld) {
            this.walkers.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

