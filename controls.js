//handles buttons changing UI (like categories change select)

$(function () {
    $('.pharoh-button').click(function () {
        //Deals with what button is shaded on UI, one at a time only
        var selectedButtonTitle = $(this).attr('title');
        setButton(selectedButtonTitle);
    });

    // TODO add callback for selected option
});

function setSelectOptions(options) {
    let $inputProduct = $('select#selectId');
    $inputProduct.html("");
    if (options.length) {
        $(options).each(function (i, v) {
            $inputProduct.append($("<option>", v));
        });
        $inputProduct.removeAttr("disabled");
    } else {
        $inputProduct.attr("disabled", "disabled");
    }
}

//handles options choosing selected- which affects actions in gameengine
//when x and y coordinates are chosen for an entity to be placed on

//handles setting the button as selected based on the key listener in the game engine.
function setButton(titleOfCurrentButtonSelection) {
    $('.pharoh-button').removeClass('selected');
    $('.pharoh-button[title="' + titleOfCurrentButtonSelection + '"]').addClass('selected');
    var buttonPaneTitle = titleOfCurrentButtonSelection;
    if (buttonPaneTitle == 'Messages') buttonPaneTitle = 'Default';
    $('.button-pane img').hide();
    $('.button-pane img[title="' + buttonPaneTitle + '"]').show();

    var newOptions;
    switch (titleOfCurrentButtonSelection) {
        case "Housing":
            setSelectOptions(Constants.Buildings.Housing);
            break;
        case "Food and Farm":
            console.log("itfuud");
            newOptions = {
                "Option 1": "Grain Farm",
                "Option 2": "Barley Farm",
                "Option 3": "Flax Farm"
            };

            break;
        case "Utilities":
            newOptions = {
                "Option 1": "Well",
                "Option 2": "Water Supply",
            };
            break;
        case "Storage and Distribution":
            newOptions = {
                "Option 1": "Bazaar",
                "Option 2": "Granary",
                "Option 3": "Storage Yard"
            };
            break;
        case "Industrial":
            newOptions = {
                "Option 1": "Weaver",
                "Option 2": "Brewery",
                "Option 3": "Potter"
            };
            break;
        case "Raw Materials":
            newOptions = {
                "Option 1": "Gold Mine",
                "Option 2": "Clay Pit"
            };
            break;
        case "Roads":
            setSelectOptions(Constants.Buildings.Roads);
            break;
        //clear select/disable select
        case "Municipal Buildings":
            newOptions = {
                "Option 3": "Police Station",
                "Option 2": "Fire House",
                "Option 3": "Palace",
                "Option 4": "Tax Collector's Office",
            };
        default:
            console.log('nuthin2seahear');
            break
    }
}