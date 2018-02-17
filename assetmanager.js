function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    /**map of path to images*/
    this.cache = [];
    this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function (path) {
    console.log("Queueing " + path);
    this.downloadQueue.push(path);
}

AssetManager.prototype.isDone = function () {
    return this.downloadQueue.length === this.successCount + this.errorCount;
}

AssetManager.prototype.downloadAll = function (callback) {
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var img = new Image();
        var that = this;

        var path = this.downloadQueue[i];
        console.log(path);

        img.addEventListener("load", function () {
            console.log("Loaded " + this.src);
            that.successCount++;
            if(that.isDone()) callback();
        });

        img.addEventListener("error", function () {
            console.log("Error loading " + this.src);
            that.errorCount++;
            if (that.isDone()) callback();
        });

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}
AssetManager.prototype.assetQueueDownloads = function() {
    ASSET_MANAGER.queueDownload("./img/Weaver.png");
    ASSET_MANAGER.queueDownload("./img/grass.png");
    ASSET_MANAGER.queueDownload("./img/Land1a_00002.png");
    ASSET_MANAGER.queueDownload("./img/emptyCartMan.png");
    ASSET_MANAGER.queueDownload("./img/barleyCartMan.png");
    ASSET_MANAGER.queueDownload("./img/beerCartMan.png");
    ASSET_MANAGER.queueDownload("./img/clayCartMan.png");
    ASSET_MANAGER.queueDownload("./img/flaxCartMan.png");
    ASSET_MANAGER.queueDownload("./img/goldCartMan.png");
    ASSET_MANAGER.queueDownload("./img/grainCartMan.png");
    ASSET_MANAGER.queueDownload("./img/linenCartMan.png");
    ASSET_MANAGER.queueDownload("./img/meatCartMan.png");
    ASSET_MANAGER.queueDownload("./img/potsCartMan.png");
    ASSET_MANAGER.queueDownload("./img/WatahMan.png");
    ASSET_MANAGER.queueDownload("./img/Weaver.png");
    ASSET_MANAGER.queueDownload("./img/ArchBuild-1.png");
    ASSET_MANAGER.queueDownload("./img/Bazaar.png");
    ASSET_MANAGER.queueDownload("./img/COPS-1.png");
    ASSET_MANAGER.queueDownload("./img/Brewery.png");
    ASSET_MANAGER.queueDownload("./img/Firehouse-1.png");
    ASSET_MANAGER.queueDownload("./img/GoldMine.png");
    ASSET_MANAGER.queueDownload("./img/HousingAlone.png");
    ASSET_MANAGER.queueDownload("./img/HuntingLodge.png");
    ASSET_MANAGER.queueDownload("./img/mansion.png");
    ASSET_MANAGER.queueDownload("./img/Potter.png");
    ASSET_MANAGER.queueDownload("./img/farm1.png");
    ASSET_MANAGER.queueDownload("./img/taxHouse.png");
    ASSET_MANAGER.queueDownload("./img/palace.png");
    ASSET_MANAGER.queueDownload("./img/FarmPlots.png");
    ASSET_MANAGER.queueDownload("./img/bazaarLady 22x42.png");
    ASSET_MANAGER.queueDownload("./img/FireDude1.png")
    ASSET_MANAGER.queueDownload("./img/Firedude2.png");
    ASSET_MANAGER.queueDownload("./img/Hunter1.5.png");
    ASSET_MANAGER.queueDownload("./img/Hunter2.png");
    ASSET_MANAGER.queueDownload("./img/immig.png");
    ASSET_MANAGER.queueDownload("./img/ClayThingy.png");
    ASSET_MANAGER.queueDownload("./img/smallWell.png");
    ASSET_MANAGER.queueDownload("./img/bigWell.png");
    ASSET_MANAGER.queueDownload("./img/Granary.png");
    ASSET_MANAGER.queueDownload('./img/StoreYard.png');
    ASSET_MANAGER.queueDownload("./img/DONUTSTEAL.png");
}

