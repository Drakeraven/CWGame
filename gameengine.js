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
    if (arr.length === 0) {
        return [];
    }
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
        if (this.twodtoisoY(left[indexLeft].x, left[indexLeft].y) < this.twodtoisoY(right[indexRight].x, right[indexRight].y)) {
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
    this.hoverEntity = null;
}
var selectedBuildingCost = 0;
var currentMessage = "";
var selectedItemList = null;
var isDraggable = false;
var isClearing = false;
var isDrawing = false;
var canHover = false;

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
    this.cameraoffX = (this.map.mapList.length / 2);
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

//sets tiles to original.
GameEngine.prototype.removeRoad = function (x, y) {
    walkerMap[y][x] = mapData[x][y];
    this.map.mapList[y][x].tileType = mapData[x][y];
    let str = "";
    if (mapData[y][x] === 0) {
        str = this.map.mapList[y][x].grassImage;
    } else if (mapData[x][y] === 3) {
        str = this.map.maplist[y][x].treeImage;
    }
    gameEngine.map.mapList[y][x].image.src = str;
}

//"removes" building from map
GameEngine.prototype.removeBuilding = function (x, y) {
    if (this.map.mapList[y][x].thing) {
        let thing = this.map.mapList[y][x].thing;
        walkerMap[y][x] = mapData[x][y];
        this.map.mapList[y][x].tileType = mapData[x][y];
        this.map.mapList[y][x].thing.removeFromWorld = true;
        for (i = thing.x; i < thing.x + thing.bWidth; i++) {
            for (j = thing.y; j < thing.y + thing.bHeight; j++) {
                if (this.map.mapList[j][i].thing != null) {
                    this.map.mapList[j][i].thing = null;
                    walkerMap[j][i] = mapData[i][j];
                }
            }
        }
    }
}

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
            that.drawRoad(x, y);
        } else if (selection == "Clear Land") {
            isClearing = true;
            that.clearItems(x, y);
        } else if (selection == "Select") {
            displayStats(that, x, y);
        } else {
            that.buildOnCanvas(x, y);
        }

    });
    this.ctx.canvas.addEventListener("mousemove", function (event) {//click drag
        //adjusts x and y
        let fixX = event.clientX - (event.clientX % 29);
        let fixY = event.clientY - (event.clientY % 15);
        //converts to iso
        let x = that.isototwodX(fixX, fixY);
        let y = that.isototwodY(fixX, fixY);
        //handles hover functionality
        if (canHover) {
            that.hoverEntity = that.getSelectedEntity();
            that.updateHoverEntityPosition(x, y);
        }
        //handles draggable remove and draw functions
        if (isDraggable) {
            that.drawRoad(x, y);
            that.clearItems(x, y);
            that.draw(x, y);
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
GameEngine.prototype.updateHoverEntityPosition = function (x, y) {
    this.hoverEntity.x = x;
    this.hoverEntity.y = y;
}
GameEngine.prototype.drawRoad = function (x, y) {
    if (isDrawing) {
        walkerMap[y][x] = 1;
        this.map.mapList[y][x].tileType = 1;
        this.map.mapList[y][x].image.src = this.map.mapList[y][x].roadImage;
    }
}
GameEngine.prototype.clearItems = function (x, y) {
    if (isClearing) {
        if (walkerMap[y][x] == 1) {
            this.removeRoad(x, y);
        } else if (walkerMap[y][x] == 2) {
            if (!(this.map.mapList[y][x].thing instanceof Palace)) {
                this.removeBuilding(x, y);
            }
        }
    }
}

GameEngine.prototype.buildOnCanvas = function (x, y) {
    let entity = this.getSelectedEntity(x, y)
    if (entity) {//checks that selection is not null/ not default
        let updatedFunds = this.gameWorld.funds - selectedBuildingCost;//peeks if purchaseable
        if (updatedFunds >= 0) {
            if (this.map.addThing(entity, selectedItemList)) {
                this.gameWorld.withdrawFunds(selectedBuildingCost);
                currentMessage = "Building Added!";
            } else {
                currentMessage = "Can't place building here.";
            }
        } else {
            currentMessage = "Insufficient funds!";
        }
        updateCurrentMessage();//uses global var currentMessage to set message
    }
}

GameEngine.prototype.getSelectedEntity = function (x, y) {
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
    selectedItemList = null;
    switch (selection) {
        //addmap function called at the very end, so its not repeated in each case
        //NOTICE: Some are added to special arrays defined above this gameengine, some are pushed to entities[]
        //X and Y have been make ISO friendly before entering this function
        case "House":
            entity = new Housing(that, x, y);
            selectedItemList = that.housingArr;
            break;

        case "Grain Farm":
            entity = new grainFarm(that, x, y);
            break;

        case "Barley Farm":
            entity = new barFarm(that, x, y);
            break;

        case "Flax Farm":
            entity = new flaxFarm(that, x, y);
            break;

        case "Hunting Lodge":
            entity = new huntLodge(that, x, y);
            break;

        case "Well":
            entity = new Well(that, x, y);
            break;

        case "Water Supply":
            entity = new WaterSupply(that, x, y);
            break;

        case "Bazaar":
            entity = new Bazaar(that, x, y);
            console.log("new bazaar");
            selectedItemList = that.industries;
            break;

        case "Granary":
            entity = new Granary(that, x, y);
            selectedItemList = that.granaries;
            break;

        case "Storage Yard":
            entity = new StoreYard(that, x, y);
            selectedItemList = that.yards;
            break;

        case "Weaver":
            entity = new Weaver(that, x, y);
            selectedItemList = that.industries;
            break;

        case "Brewery":
            entity = new Brewery(that, x, y);
            selectedItemList = that.industries;
            break;

        case "Potter":
            entity = new Potter(that, x, y);
            selectedItemList = that.industries;
            break;
        case "Clay Pit":
            entity = new clayPit(that, x, y);
            break;
        case "Gold Mine":
            entity = new goldMine(that, x, y);
            break;
        case "Fire House":
            entity = new FireHouse(that, x, y);
            break;
        case "Police Station":
            entity = new CopHouse(that, x, y);
            break;
        case "Tax House":
            entity = new TaxHouse(that, x, y);
            break;
        default:
            entity = null
            console.log('nuthin2seahear')
            break
    }
    if (!selection) {
        entity = null;
    }
    return entity;
}

GameEngine.prototype.addEntity = function (entity) {
    console.log(entity);
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.addHouse = function (entity) {
    console.log('added house');
    this.housingArr.push(entity);
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

    var ents = this.mergeSort(this.entities);

    for (var i = 0; i < this.map.mapList.length; i++) {
        for (var j = 0; j < this.map.mapList[1].length; j++) {
            this.map.mapList[j][i].draw(this.ctx);
        }
    }

    for (var i = 0; i < this.entities.length; i++) {
        ents[i].draw(this.ctx);
    }

    if (this.hoverEntity && canHover && this.map.isInMapBoundaries(this.hoverEntity)) {
        this.ctx.save();
        if(!this.map.canAddToMap(this.hoverEntity)) {
            this.ctx.shadowColor = 'red';
        } else {
            this.ctx.shadowColor = 'aqua';
        }
        this.ctx.shadowBlur = 1;
        this.ctx.globalAlpha = 0.6;
        this.hoverEntity.draw(this.ctx); //updates for hoverEntity
        this.ctx.restore();
    }

    this.ctx.restore();
}
goalCounter = 1; //used to display messages
GameEngine.prototype.update = function () {
    //checks if goals were met
    if (this.gameWorld.population > 500) {
        goalCounter++;
        //TODO instead of ending game, just pop up a small window
        //that notifies user they met the goal, green goal box
        //will display new goal,
        //goal message selectedItemList will be defined in constants.js
        $('.game-container').hide();
        $('#EndGame').show();
    } else {
        //Updates live info about game on UI
        setGameInfoBox();
        updateFunds();
        updateSelectedItemCost();

        var entitiesCount = this.entities.length;
        this.gameWorld.workForce = this.gameWorld.getWorkForce();
        var working = this.gameWorld.getWorkForce();


        //give palace employees first >:)
        if (this.gameWorld.palace != null && working > this.gameWorld.palace.numEmpNeeded) {
            this.gameWorld.palace.numEmployed = 0;
            this.gameWorld.palace.numEmployed = this.gameWorld.palace.numEmpNeeded;
            working -= this.gameWorld.palace.numEmployed;
        } else if (working < this.gameWorld.palace.numEmpNeeded){ 
            this.gameWorld.palace.numEmployed = 0;
        }


        for (var i = 0; i < this.entities.length; i++) {
            var farm = this.entities[i];
            if ((farm instanceof clayPit || farm instanceof huntLodge
                || farm instanceof goldMine) && working > farm.numEmpNeeded) {
                farm.numEmployed = farm.numEmpNeeded;
                working -= farm.numEmpNeeded;
            } else if ((farm instanceof clayPit || farm instanceof huntLodge
                || farm instanceof goldMine) && working < farm.numEmpNeeded) { 
                farm.numEmployed = 0; 
            }
        }

        for (var i = 0; i < this.granaries.length; i++) {
            var granary = this.granaries[i];
            if (working > granary.numEmpNeeded) {
                granary.numEmployed = granary.numEmpNeeded;
                working -= granary.numEmpNeeded;
            } else if (working < granary.numEmpNeeded) { 
                granary.numEmployed = 0; 
            }

            if (!granary.removeFromWorld) {
                granary.update();
            }
        }

        for (var i = 0; i < this.industries.length; i++) {
            var industry = this.industries[i];
            //console.log(industry instanceof Bazaar);
            //console.log(industry.numEmployed);
            if (working > industry.numEmpNeeded && (industry.numResources > 0 || industry instanceof Bazaar)) {
                industry.numEmployed = industry.numEmpNeeded;
                working -= industry.numEmpNeeded;
            } else if (working < industry.numEmpNeeded) { 
                industry.numEmployed = 0; 
            }
            //console.log(working);
            //console.log()
        }

        for (var i = 0; i < this.yards.length; i++) {
            var yard = this.yards[i];
            if (working > yard.numEmpNeeded) {
                yard.numEmployed = yard.numEmpNeeded;
                working -= yard.numEmpNeeded;
            } else if (working < yard.numEmpNeeded) { 
                yard.numEmployed = 0; 
            }
            if (!yard.removeFromWorld) {
                yard.update();
            }
        }


        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];
            if ((entity instanceof TaxHouse || entity instanceof FireHouse) && working > entity.numEmpNeeded) {
                entity.numEmployed = entity.numEmpNeeded;
                working -= entity.numEmployed; 
            } else if ((entity instanceof TaxHouse || entity instanceof FireHouse) && working < entity.numEmpNeeded){
                entity.numEmployed = 0; 
            }
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

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                if (this.entities[i] instanceof Well || this.entities[i] instanceof WaterSupply) {
                    this.entities[i].remove();
                    console.log("removing");
                }
                this.entities.splice(i, 1);
            }
        }

        for (var i = 0; i < this.housingArr.length; i++) {
            var myHouse = this.housingArr[i];
            if (!myHouse.removeFromWorld) {
                myHouse.update();
            }
        }

        for (var i = this.housingArr.length - 1; i >= 0; --i) {
            if (this.housingArr[i].removeFromWorld) {
                this.gameWorld.population -= this.housingArr[i].numHoused;
                this.housingArr.splice(i, 1);
            }
        }

        for (var i = this.industries.length - 1; i >= 0; --i) {
            if (this.industries[i].removeFromWorld) {
                if (this.industries[i] instanceof Potter
                    || this.industries[i] instanceof Weaver
                    || this.industries[i] instanceof Brewery) {
                    this.industries[i].remove();
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
