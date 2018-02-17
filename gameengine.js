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

GameEngine.prototype.mergeSort = function (arr) {
    if (arr.length === 1) {
        // return once we hit an array with a single item
        return arr
    }
    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side

    return this.merge(
        this.mergeSort(left),
        this.mergeSort(right)
    )
}

// compare the arrays item by item and return the concatenated result
GameEngine.prototype.merge = function (left, right) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (this.twodtoisoY(left[indexLeft].x, left[indexLeft].y)  < this.twodtoisoY(right[indexRight].x, right[indexRight].y)) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

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
GameEngine.prototype.initcamera = function () {
  this.cameraoffX =(this.map.mapList.length / 2);
  this.cameraoffY = (this.map.mapList[1].length / 2) * 2;
}

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
//draws road on map using given x and y
function drawRoad(gameEngine, x, y) {
    walkerMap[y][x] = 1;
    gameEngine.map.mapList[y][x].tileType = 1; // or should these be seperate?
    //console.log(walkerMap);
}

//sets tiles to original.
function removeRoad(gameEngine, x, y) {
    walkerMap[x][y] = mapData[x][y];
    gameEngine.map.mapList[y][x].tileType = mapData[x][y];
}

//"removes" building from map
function removeBuilding(gameEngine, x, y) {
    if (gameEngine.map.mapList[y][x].tileType == 2) {
        walkerMap[x][y] = mapData[x][y];
        gameEngine.map.mapList[y][x].tileType = mapData[x][y];
        gameEngine.map.mapList[y][x].thing.removeFromWorld = true;
    }
}
var isClearing = false;
var isDrawing = false;
//Listens to input and events
GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    this.ctx.canvas.addEventListener("mousedown", function (event) {//click down
        //adjusts x and y
        fixX = event.clientX - (event.clientX % 29);
        fixY = event.clientY - (event.clientY % 15);
        //converts to iso
        x = that.isototwodX(fixX, fixY);
        y = that.isototwodY(fixX, fixY);
        selection = $('.pharoh-button.selected').attr("title");
        if (selection == "Roads") {
            isDrawing = true;
            drawRoad(that, x, y);
        } else if (selection == "Clear Land") {
            isClearing = true;
            if (walkerMap[x][y] == 1) {
                removeRoad(that, x, y);
            } else if (walkerMap[x][y] == 2) {
                removeBuilding(that, x, y);
            }

        } else if (selection == "Select") {
            displayStats(that, x, y); //TODO DEFINE IN CONTROLS.JS

        } else {
            if (walkerMap[x][y] != 1) {
                //creates object and adds to map
                that.buildOnCanvas(x, y);
            }
        }

    });

    this.ctx.canvas.addEventListener("mouseup", function (event) {//click release
        isDrawing = false;
        isClearing = false;
    });

    this.ctx.canvas.addEventListener("contextmenu", function (event) {
        setButton("Select");
    });

    //Handles Hot Keys
    this.ctx.canvas.addEventListener("keydown", function (event) {
            setHotKeys(event, that);//in controls
        });
        console.log('Input started');
    }


GameEngine.prototype.buildOnCanvas = function (x, y) {
    let selection = $('.pharoh-button.selected').attr("title");
    if (selection != "Roads") {
        //Will return nothing if no buttons are selected
        let selectedButton = $('#selectId');
        //this is check, so we don't call .attr on null
        if (selectedButton.length > 0) {
            selection = selectedButton.val();
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
            //this.entities.push(entity);
            break;

        case "Barley Farm":
            entity = new barFarm(that, x, y);
            //this.entities.push(entity);
            break;

        case "Flax Farm":
            entity = new flaxFarm(that, x, y);
            //this.entities.push(entity);
            break;

        case "Hunting Lodge":
            entity = new huntLodge(that, x, y);
            //this.entities.push(entity);
        case "Well":
            entity = new Well(that, x, y);
            //this.entities.push(entity);
            break;

        case "Water Supply":
            entity = new WaterSupply(that, x, y);
            //this.entities.push(entity);
            break;

        case "Bazaar":
            entity = new Bazaar(that, x, y);
            this.industries.push(entity);
            break;

        case "Granary":
            entity = new Granary(that, x, y);
            this.granaries.push(entity);
            break;

        case "Storage Yard":
            entity = new StoreYard(that, x, y);
            this.yards.push(entity);
            break;

        case "Weaver":
            entity = new Weaver(that, x, y);
            this.industries.push(entity);
            break;

        case "Brewery":
            entity = new Brewery(that, x, y);
            this.industries.push(entity);
            break;

        case "Potter":
            entity = new Potter(that, x, y);
            this.industries.push(entity);
            break;
        case "Clay Pit":
            entity = new clayPit(that, x, y);
            //this.entities.push(entity);
            break;
        case "Gold Mine":
            entity = new goldMine(that, x, y);
            //this.entities.push(entity);

            break;
        case "Fire House":
            entity = new FireHouse(that, x, y);
            //this.entities.push(entity);

            break;
        case "Police Station":
            entity = new CopHouse(that, x, y);
            //this.entities.push(entity);

            break;
        case "Tax House":
            entity = new TaxHouse(that, x, y);
            //this.entities.push(entity);
            break;
        default:
            console.log('nuthin2seahear')
            break
}
    if (selection) {//checks that selection is not null/ not default
        that.map.addThing(entity);
    }
}

//Cynthia says should I use these functiosn in switch? is it really a good idea to be logging everything?
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
   // console.log("added walker");
    this.walkers.push(walker);
    this.entities.push(walker);
}

GameEngine.prototype.addIndustry = function (industry) {
    console.log("added industry");
    this.industries.push(industry);
    this.entities.push(industry);
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

    this.entities = this.mergeSort(this.entities);

    for (var i = 0; i < this.map.mapList.length; i++) {
        for (var j = 0; j < this.map.mapList[1].length; j++) {
            this.map.mapList[j][i].draw(this.ctx);
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }

    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    var working = this.gameWorld.workForce;


    //give palace employees first >:)
    if (this.gameWorld.palace != null && working > this.gameWorld.palace.numEmpNeeded) {
        this.gameWorld.palace.numEmployed = 0;
        this.gameWorld.palace.numEmployed = this.gameWorld.palace.numEmpNeeded;
    }

    for (var i = 0; i < this.granaries.length; i++) {
        var granary = this.granaries[i];
        if (working > granary.numEmpNeeded) {
            granary.numEmployed = granary.numEmpNeeded;
            working -= granary.numEmpNeeded;
        }

        if (!granary.removeFromWorld) {
            granary.update();
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        var farm = this.entities[i];
        if ((farm instanceof clayPit || farm instanceof huntLodge
            || farm instanceof goldMine) &&  working > farm.numEmpNeeded) {
                farm.numEmployed = farm.numEmpNeeded;
                working -= farm.numEmpNeeded;
        }
    }

    for (var i = 0; i < this.yards.length; i++) {
        var yard = this.yards[i];
        if (working > yard.numEmpNeeded) {
            yard.numEmployed = yard.numEmpNeeded;
            working -= yard.numEmpNeeded;
        }
        if (!yard.removeFromWorld) {
            yard.update();
        }
    }

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

    for (var i = 0; i < this.walkers.length; i++) {
        var walker = this.walkers[i];

        if (!walker.removeFromWorld) {
            walker.update();
        }
    }

    for (var i = 0; i < this.walkers.length; i++) {
        var walker = this.walkers[i];
        if (walker.dX == 0 && walker.dY == 0) {
            walker.removeFromWorld = true;
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        /*if (this.entities[i].removeFromWorld && this.entities[i] instanceof Well
            || this.entities[i] instanceof Water || this.entities[i] instanceof Potter
            || this.entities[i] instanceof Brewer || this.entities[i] instanceof Weaver) {
            this.entities[i].remove();
        }*/

        if (this.entities[i].removeFromWorld) {
            if (this.entities[i] instanceof Well || this.entities[i] instanceof WaterSupply) {
                this.entities.remove();
            }
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
            if (this.entities[i] instanceof Potter
                    || this.entities[i] instanceof Weaver
                    || this.entities[i] instanceof Brewery) {
                this.entities.remove();
            }
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


//Entity is defined.
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
