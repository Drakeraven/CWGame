var Constants = {
    //Buildings if object that contains and "Object" of each building, static info only
    Buildings: {
        Housing: [
            { value: "House", text: "House" },
        ],
        FoodandFarm: [
            { value: "Grain Farm", text: "Grain Farm" },
            { value: "Barley Farm", text: "Barley Farm" },
            { value: "Flax Farm", text: "Flax Farm" },
            { value: "Hunting Lodge", text: "Hunting Lodge" },
        ],
        Utilities: [
            { value: "Well", text: "Well" },
            { value: "Water Supply", text: "Water Supply" },
        ],
        StorageandDistribution: [
            { value: "Bazaar", text: "Bazaar" },
            { value: "Granary", text: "Granary" },
            { value: "Storage Yard", text: "Storage Yard" },
        ],
        Industrial: [
            { value: "Weaver", text: "Weaver" },
            { value: "Brewery", text: "Brewery" },
            { value: "Potter", text: "Potter" },
        ],
        RawMaterials: [
            { value: "Clay Pit", text: "Clay Pit" },
            { value: "Gold Mine", text: "Gold Mine" },
        ],
        Municipal: [
            { value: "Fire House", text: "Fire House" },
            //{ value: "Police Station", text: "Police Station" },
            { value: "Tax House", text: "Tax House" },
        ],
        //Following classes do not affect select menu
        Roads: [],
        Controls: [],
        Manual: [],
        ClearLand: [],
        Select: [],
    }

}

//note, these are static costs that also need to be updated in individual constructors if changed
var costsArray = [{name: "Bazaar", value:400},{name:"Well", value:10},{name: "Water Supply", value : 10},
{name: "Tax House", value : 10}, {name: "Fire House", value : 10}, {name: "Police Station", value : 10}, {name: "Grain Farm", value : 30},
{name: "Barley Farm", value : 30}, {name: "Flax Farm", value :30}, {name: "House", value :25}, {name: "Granary", value: 50}, {name: "Weaver", value :50}, {name: "Brewery", value: 60},
{name: "Potter", value :70}, {name: "Storage Yard", value :60}, {name: "Gold Mine", value :100}, {name: "Clay Pit", value :20}, {name: "Hunting Lodge", value: 35}];

var controlString =  
                    "Housing: H\tFood and Farm: F\n" +
                    "Utilities: U\tStorage and Distribution: S\n" +
                    "Industrial: I\tRaw Materials: M\n" +
                    "Municipal: L\tRoads: R\tClear Land: C\n" +
                    "Arrows move map camera.\n\nGame Hints:\n\n" +
                    "Objective of the game is to build a city and\n" +
                    "meet each goal displayed in the Current Goal Box\n " +
                    "Lookout for the message box, whether your buildings caught on fire, and many other things.\n\n"
                    + "Pay attention to the game information, your current funds, and building costs as you continue to build your city!";

                    //add elemented as needed, counter in gameengine will help index the correct goal
var goalsArray = ["Achieve 500 people living in your city!",
"Achieve 750 people living in your city, and funds of 10,000!", "Achieve managing 3 Bazaar!"];
