//handles buttons changing UI (like categories change select)
$(function () {
    $('.pharoh-button').click(function () {
        //Deals with what button is shaded on UI, one at a time only
        var selectedButtonTitle = $(this).attr('title');
        setButton(selectedButtonTitle);
    });
});

function setHotKeys(event) {
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
        setButton("Messages");
    } else if (event.code === "KeyG") {
        setButton("Game Information");
    } else if (event.code === "ArrowRight") {
        that.cameraoffX += 1;
    } else if (event.code === "ArrowLeft") {
        that.cameraoffX -= 1;
    } else if (event.code === "ArrowUp") {
        that.cameraoffY += 1;
    } else if (event.code === "ArrowDown") {
        that.cameraoffY -= 1;
    }
}

//handles setting the button as selected based on the key listener in the game engine.
function setButton(titleOfCurrentButtonSelection) {
    $('.pharoh-button').removeClass('selected');
    $('.pharoh-button[title="' + titleOfCurrentButtonSelection + '"]').addClass('selected');
    var buttonPaneTitle = titleOfCurrentButtonSelection;

    //General use buttons don't need to change selectmenu
    if (buttonPaneTitle == 'Messages') buttonPaneTitle = 'Default';
    if (buttonPaneTitle == 'Game Information') buttonPaneTitle = 'Default';
    if (buttonPaneTitle == 'Select') buttonPaneTitle = 'Default';

    //clears out and displays new button pane
    $('.button-pane img').hide();
    $('.button-pane img[title="' + buttonPaneTitle + '"]').show();

    //Handles creation of new select options in selectmenu
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
            break;
        case "Messages":
            setSelectOptions(Constants.Buildings.Messages);
            break;
        case "Game Information":
            setSelectOptions(Constants.Buildings.GameInformation);
            break;
        case "Clear Land":
            setSelectOptions(Constants.Buildings.ClearLand);
            break;
        case "Select":
            setSelectOptions(Constants.Buildings.ClearLand);
            break;
        default:
            console.log('nuthin2seahear');
            break
    }
}

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
}