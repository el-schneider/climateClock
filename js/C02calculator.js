var myVar = setInterval(myTimer, 1);

// 2043-12-17 5:20:04
// months in JS Date() starts with 0 - so Dec is 11 not 12
var doomDate = new Date(2034, 11, 01, 08, 07, 09);

// Constants to be updated each year
var averageRatePast5Years = 0.01866763;
var combinedEmissionsToDate = 2251773000000;
var rateTperyr = 0.01961;
var dTref = 1.061;
// Other constants
var yearstoMs = 3.17098e-11;


// Constants for budget left
var secondsPerYear = 3600. * 24 * 365.25;
var startDate = new Date(2018, 00, 01, 00, 00, 00);
var initialAnnualEmissions = 42.0 * 1e+9;
var annualGrowthRate = 1.000; // 1.022;

var totalBudget = 1170 * 1e+9;


function myTimer() {
    // $("#globaltemp").text("+" + getGlobalTemp());
    $("#globaltemp .value").text(getGlobalTemp());
    // $("#carbontonnes").text(addCommas(getTonsOfEmission()).slice(0, 17));

    var out = [];
    if (getBudgetLeft() > 0) {
        out.push(getBudgetLeft().toFixed(0));
        out.join("")
        $("#carbontonnes .value").text(out.toLocaleString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'"));
    }
    else {
        out.push("exhausted by: " + -getBudgetLeft().toFixed(0));
        out.join("")
        $("#carbontonnes .value").text(out.toLocaleString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'"));
    }


    $("#timecountdown").html(getDateTimeTill(doomDate));
}

function getDateTimeTill(target) { // target should be a Date object
    var now = new Date(), diff, yd, md, dd, hd, nd, sd, ms, out = [];
    diff = Math.floor(now.getTime() - target.getTime()) / 1000;
    yd = target.getFullYear() - now.getFullYear();
    md = target.getMonth() - now.getMonth();
    dd = target.getDate() - now.getDate();
    hd = target.getHours() - now.getHours();
    nd = target.getMinutes() - now.getMinutes();
    sd = target.getSeconds() - now.getSeconds();

    while (true) {
        if (md < 0) { yd--; md += 12; }
        if (dd < 0) { md--; dd += getDaysInMonth(now.getMonth() - 1, now.getFullYear()); }
        if (hd < 0) { dd--; hd += 24; }
        if (nd < 0) { hd--; nd += 60; }
        if (sd < 0) { nd--; sd += 60; }
        if (md >= 0 && yd >= 0 && dd >= 0 && hd >= 0 && nd >= 0 && sd >= 0)
            break;
    }

    if (yd > 0) out.push("<span class='unit years'>years</span>" + yd + ":" + (yd == 1 ? "" : ""));
    if (md < 10 && md >= 0)
        out.push("0" + md + ":" + (md == 1 ? "" : ""));
    else if (md >= 10)
        out.push(md + ":");
    if (dd < 10 && dd >= 0)
        out.push("0" + dd + ":" + (dd == 1 ? "" : ""));
    else if (dd >= 10)
        out.push(dd + ":");
    if (hd < 10 && hd >= 0)
        out.push("0" + hd + ":" + (hd == 1 ? "" : ""));
    else if (hd >= 10)
        out.push(hd + ":");
    if (nd < 10 && nd >= 0)
        out.push("0" + nd + ":" + (nd == 1 ? "" : ""));
    else if (nd >= 10)
        out.push(nd + ":");
    if (sd < 10 && sd >= 0)
        out.push("0" + sd + ":" + (sd == 1 ? "" : ""));
    else if (sd >= 10)
        out.push(sd + ":");
    ms = 99 - now.getMilliseconds().toString().slice(0, 2);
    if (ms < 10 && ms >= 0)
        out.push("0" + ms + "" + (ms == 1 ? "" : ""));
    else if (ms >= 10)
        out.push(ms + "");
    return out.join("");
}

function getDaysInMonth(month, year) {
    if (typeof year == "undefined") year = 1999; // any non-leap-year works as default     
    var currmon = new Date(year, month),
        nextmon = new Date(year, month + 1);
    return Math.floor((nextmon.getTime() - currmon.getTime()) / (24 * 3600 * 1000));
}

function getTonsOfEmission() {
    return (MsFromRefTime(new Date(2018, 00, 00, 00, 00, 00, 00)) * averageRatePast5Years * yearstoMs * combinedEmissionsToDate) + combinedEmissionsToDate;
}

function getGlobalTemp() {
    temp = (MsFromRefTime(new Date(2018, 08, 15, 00, 00, 00, 00)) * rateTperyr * yearstoMs) + dTref;
    return temp.toFixed(13);
}

function MsFromRefTime(target) {
    var now = new Date(), diff = [];
    diff = Math.floor((now.getTime() - target.getTime()));
    return diff;
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


// Functions for budget left

function switchScenarios() {
    $("#buttons a").click(function(event) {
        button = $(this);

        button_id = button.parent().parent().attr("id");
        //console.log(button_id);

        if (button_id === 'deg') {
            $("#deg a").attr("class", "");
            button.attr("class", "active");
        }
        else if (button_id === 'growth') {
            $("#growth a").attr("class", "");
            button.attr("class", "active");
        }
        else {
            $("#range a").attr("class", "");
            button.attr("class", "active");
        }

        range_id = $("#range .active").attr("id");
        deg_id = $("#deg .active").attr("id");
        if (deg_id === "1.5") {
            totalBudget = 420 * 1e+9;
        } else {
            totalBudget = 1170 * 1e+9;
        }

        growth_id = $("#growth .active").attr("id");
        if (growth_id === "current") {
            annualGrowthRate = 1.022;
        } else {
            annualGrowthRate = 1.000;
        }
    });
}

function sPassed() {
    var now = new Date();
    var diff = [];
    diff = Math.floor((now.getTime() - startDate.getTime()) / 1000.);
    return diff;
}

function getCurrentEmissionsPerS() {
    res = initialAnnualEmissions / secondsPerYear * Math.pow(annualGrowthRate, sPassed(startDate) / secondsPerYear);
    return res;
}

function getBudgetLeft() {
    if (annualGrowthRate == 1) {
        budgetUsed = sPassed(startDate) / secondsPerYear * initialAnnualEmissions;
    }
    else {
        budgetUsed = (initialAnnualEmissions / Math.log(annualGrowthRate)) * (Math.pow(annualGrowthRate, sPassed(startDate) / secondsPerYear) - 1);
    }
    res = (totalBudget - budgetUsed);
    return res;
}