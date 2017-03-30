var application = require("application");
var ObservableArray = require("data/observable-array").ObservableArray;
var Observable = require("data/observable").Observable;
var page;

exports.loaded = function onNavigatingTo(args) {
    page = args.object;

    var taplistarray = new ObservableArray([].map(function() {
        return new Observable([]);
    }));
    page.bindingContext = {
        taplist: taplistarray
    };

    fetch(global.wpurl + "/wp-json/whatsontap/v1/taplist/58", {
        method: "GET",
        body: '',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
        .then(handleErrors)
        .then(function(data) {
            var taps = JSON.parse(data._bodyInit);
            taps.forEach(function(tap) {
                console.dump(tap);
                console.log(tap["beer"]);
                console.log(tap["brewery"]);
                taplistarray.push({
                    beer_name: tap["beer"],
                    beer_meta: tap["brewer"]
                });
            });
        });
};

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
