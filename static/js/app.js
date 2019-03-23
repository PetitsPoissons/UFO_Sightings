// from data.js
var tableData = data;

// get reference to the table body and the buttons
var tbody = d3.select("tbody");
var buttonFilter = d3.select("#filter-btn");
var buttonAll = d3.select("#all-btn");

// function to help prepare the drop down lists to select from
function makeDropDownList(allItems, distinctItems) {
    allItems.forEach ( item => {
        if (distinctItems.indexOf(item) === -1) {
            distinctItems.push(item);
        };
    });
}

// CITIES - prepare drop-down list of cities to select from
var allCities = tableData.map( sighting => sighting.city);
var distinctCities = []
makeDropDownList(allCities, distinctCities);
distinctCities.sort();
// append each city into the drop-down selection list
distinctCities.forEach(item => {
    d3.select("#cities").append("option").text(item);
})

// STATES - prepare drop-down list of states to select from
var allStates = tableData.map( sighting => sighting.state);
var distinctStates = []
makeDropDownList(allStates, distinctStates);
distinctStates.sort();
// append each city into the drop-down selection list
distinctStates.forEach(item => {
    d3.select("#states").append("option").text(item);
})

// COUNTRIES - prepare drop-down list of countries to select from
var allCountries = tableData.map( sighting => sighting.country);
var distinctCountries = []
makeDropDownList(allCountries, distinctCountries);
distinctCountries.sort();
// append each city into the drop-down selection list
distinctCountries.forEach(item => {
    d3.select("#countries").append("option").text(item);
})

// SHAPES - prepare drop-down list of shapes to select from
var allShapes = tableData.map( sighting => sighting.shape);
var distinctShapes = []
makeDropDownList(allShapes, distinctShapes);
distinctShapes.sort();
// append each city into the drop-down selection list
distinctShapes.forEach(item => {
    d3.select("#shapes").append("option").text(item);
})

// function to populate the table
function populateTable(sightings) {
    sightings.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach( ([key, value]) => {
            row.append("td").text(value);
        });
    });
}

// populate the table with all data when first loading the page
populateTable(tableData);

// function to handle user's click on `Filter Table`
function handleClick (event) {

    // prevent the page from refreshing
    d3.event.preventDefault();

    // grab the user's filters
    var inputDate = d3.select("#datetime").property("value");
    var inputCity = d3.select("#cities").property("value");
    var inputState = d3.select("#states").property("value");
    var inputCountry = d3.select("#countries").property("value");
    var inputShape = d3.select("#shapes").property("value");

    // clear the existing table body
    tbody.html("");

    // filter tableData based on array of user selections
    var filteredData = tableData.filter( sighting => {
        var filter = false;
        if (inputDate === "" || inputDate === sighting.datetime) {
            if (inputCity === "all" || inputCity === sighting.city) {
                if (inputState === "all" || inputState === sighting.state) {
                    if (inputCountry === "all" || inputCountry === sighting.country) {
                        if (inputShape === "all" || inputShape === sighting.shape) {
                            filter = true;
                        };
                    };
                    
                };
            };
        };
        return filter;
    });
    populateTable(filteredData);
}

// event listener
buttonFilter.on("click", handleClick);
buttonAll.on("click", populateTable);

