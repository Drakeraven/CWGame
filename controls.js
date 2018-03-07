//handles buttons changing UI (like categories change select)
$(function () {
    $('.pharoh-button').click(function () {
        //Deals with what button is shaded on UI, one at a time only
        var selectedButtonTitle = $(this).attr('title');
        canHover = true;
        setButton(selectedButtonTitle);
    });
});

function displayStats(gameEngine, x, y) {
    if (gameEngine.map.mapList[y][x].thing) {
        console.log("hi");
        displayStr = gameEngine.map.mapList[y][x].thing.toStringStats();
        $('#toStringStats').empty();
        $('#toStringStats').text(displayStr);
    }
}

function updateGoal(str) {
    $('#current-goal').empty();
    $('#current-goal').text(str);
    $('#Goal-Information').show();
}
function setHotKeys(event, game) {
    if (event.code === "KeyH") {
        setButton("Housing");
    } else if (event.code === "KeyF") {
        setButton("Food and Farm");
    } else if (event.code === "KeyU") {
        setButton("Utilities");
    } else if (event.code === "KeyS") {
        setButton("Storage and Distribution");
    } else if (event.code === "KeyI") {
        setButton("Industrial");
    } else if (event.code === "KeyM") {
        setButton("Raw Materials");
    } else if (event.code === "KeyL") {
        setButton("Municipal");
    } else if (event.code === "KeyR") {
        setButton("Roads");
    } else if (event.code === "KeyC") {
        setButton("Clear Land");
    } else if (event.code === "KeyM") {
        setButton("Controls");
    } else if (event.code === "KeyG") {
        setButton("Manual");
    } else if (event.code === "ArrowRight" && game.cameraoffX > -80) {
        if (game.cameraoffY < 140 && game.cameraoffY > 0) {
            game.cameraoffX -= 1;
        }

    } else if (event.code === "ArrowLeft" && game.cameraoffX < 100) {
        if (game.cameraoffY < 140 && game.cameraoffY > 0) {
            game.cameraoffX += 1;
        }

    } else if (event.code === "ArrowUp" && game.cameraoffY > 0) {
        if (game.cameraoffX > -70 && game.cameraoffX < 150) {
            game.cameraoffY -= 1;
        }

    } else if (event.code === "ArrowDown" && game.cameraoffY < 160) {
        if (game.cameraoffX > -70 && game.cameraoffX < 150) {
            game.cameraoffY += 1;
        }

    }
}

function showPopUpText(displayStr) {
    $("#popup-text").empty();
    displayStr =
        "This is a city simulator where your goal is to design and maintain a prosperous society.\n\n"
        + "To see controls and gameplay information, click the buttons highlighted yellow on the right after closing this menu.";
    $("#popup-text").text(displayStr);
    $("#Game-Information").show();
    $('.pharoh-button[title="Manual"]').addClass('highlighted');
    $('.pharoh-button[title="Controls"]').addClass('highlighted');
};

function updateFunds() {
    //LAMDA EXPRESSION
    $("#current-funds").empty();
    $("#current-funds").text(gameEngine.gameWorld.funds);

};


function updateSelectedItemCost() {
    $("#cost-of-selected").empty();
    let selectedBuilding = $('#selectId').val();
    let itemCost = costsArray.find(function (element) {//see filter, map, find for JS
        return element.name == selectedBuilding;
    });
    if (itemCost) {
        selectedBuildingCost = itemCost.value;
        //notes - shorthand x => x.name == selectedBuilding (single statement rtn ln)
        //see find, map, filter in JS 
        $("#cost-of-selected").text(itemCost.value);
    }
};



function updateCurrentMessage() {
    $("#current-msg").empty();
    $("#current-msg").text(currentMessage);

};
//handles setting the button as selected based on the key listener in the game engine.
function setButton(titleOfCurrentButtonSelection) {
    $('.pharoh-button').removeClass('selected');
    $('.pharoh-button[title="' + titleOfCurrentButtonSelection + '"]').addClass('selected');
    var buttonPaneTitle = titleOfCurrentButtonSelection;

    //General use buttons don't need to change selectmenu
    if (buttonPaneTitle == 'Controls') buttonPaneTitle = 'Default';
    if (buttonPaneTitle == 'Manual') buttonPaneTitle = 'Default';
    if (buttonPaneTitle == 'Select') buttonPaneTitle = 'Default';

    //clears out and displays new button pane
    $('.button-pane img').hide();
    $('.button-pane img[title="' + buttonPaneTitle + '"]').show();
    //Handles creation of new select options in selectmenu
    gameEngine.hoverEntity = null;
    switch (titleOfCurrentButtonSelection) {
        case "Housing":
            setSelectOptions(Constants.Buildings.Housing);
            break;
        case "Food and Farm":
            setSelectOptions(Constants.Buildings.FoodandFarm);
            break;
        case "Utilities":
            setSelectOptions(Constants.Buildings.Utilities);
            break;
        case "Storage and Distribution":
            setSelectOptions(Constants.Buildings.StorageandDistribution);
            break;
        case "Industrial":
            setSelectOptions(Constants.Buildings.Industrial);
            break;
        case "Raw Materials":
            setSelectOptions(Constants.Buildings.RawMaterials);
            break;
        case "Municipal":
            setSelectOptions(Constants.Buildings.Municipal);
            break;
        case "Roads":
            setSelectOptions(Constants.Buildings.Roads);
            canHover = false;
            break;
        case "Controls":
            setSelectOptions(Constants.Buildings.Controls);
            setControlsInfoBox();
            canHover = false;
            break;
        case "Manual":
            setSelectOptions(Constants.Buildings.Manual);
            setManualInfoBox();
            canHover = false;
            break;
        case "Clear Land":
            setSelectOptions(Constants.Buildings.ClearLand);
            canHover = false;
            break;
        case "Select":
            setSelectOptions(Constants.Buildings.Select);
            canHover = false;
            break;
        default:
            console.log('nuthin2seahear');
            break
    };
};

//enables or disables dragability for roads and clear
function setDrag() {
    if ($('#drag').is(":checked")) {
        isDraggable = true;
    } else {
        isDraggable = false;
    }
};
//sets new select options based on button selected
function setSelectOptions(options) {
    let $selectMenu = $('select#selectId');
    $selectMenu.html("");//clears select content
    if (options.length) {
        $(options).each(function (i, v) {
            $selectMenu.append($("<option>", v));
        });
        $selectMenu.removeAttr("disabled");
    } else {
        $selectMenu.attr("disabled", "disabled");
    }
};

function setGameInfoBox() {
    displayStr = gameEngine.gameWorld.toStringGame();
    $("#msg").empty();
    $("#msg").text(displayStr);
}

function setControlsInfoBox() {
    $('#controls-text').empty();
    $('#controls-text').text(controlString);
    $('#Controls-Box').show();
};

function setManualInfoBox() {

    $('#manual-text').empty();
    $('#manual-text').attr("src", "How_to_play.txt");
    $('#Manual-Box').show();
};

