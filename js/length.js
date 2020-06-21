document.getElementById("convert").addEventListener("click", convert);

document.getElementById("openButton").addEventListener("click", menuOpen);
document.getElementById("closeButton").addEventListener("click", menuOpen);

function menuOpen() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("nav-open");
}

function convert() {
  let unit1 = document.getElementById("inputUnit").value;
  let unit2 = document.getElementById("outputUnit").value;
  let n = document.getElementById("input").value;
  let inputNum = parseFloat(n);

  if (!isNaN(inputNum)) {
    let result = parseFloat(inputNum * getFactor(unit1, unit2));

    const fact = genFacts(result, unit2);

    document.getElementById("result").innerHTML = result + " " + unit2;
    document.getElementById("facts").innerHTML = fact;
  } else {
    // alert("Please enter number");
    showAlert();
  }
}

function getFactor(unit1, unit2) {
  //Returns factor to be multiplied by to get conversion

  let units = {
    mm: 0,
    cm: 1,
    m: 2,
    km: 3,
    inch: 4,
    foot: 5,
    yard: 6,
    mile: 7,
    "nautical mile": 8,
  };
  // map units to numbers so we can use them to access array of factors

  let factors = [
    [
      1,
      0.1,
      0.001,
      0.000001,
      0.039370078740157,
      0.0032808398950131,
      0.0010936132983377,
      0.00000062137119223733,
      0.00000053995680345572,
    ],
    [
      10,
      1,
      0.01,
      0.00001,
      0.39370078740157,
      0.032808398950131,
      0.010936132983377,
      0.0000062137119223733,
      0.0000053995680345572,
    ],
    [
      1000,
      100,
      1,
      0.001,
      39.370078740157,
      3.2808398950131,
      1.0936132983377,
      0.00062137119223733,
      0.00053995680345572,
    ],
    [
      1000000,
      100000,
      1000,
      1,
      39370.078740157,
      3280.8398950131,
      1093.6132983377,
      0.62137119223733,
      0.53995680345572,
    ],
    [
      25.4,
      2.54,
      0.0254,
      0.0000254,
      1,
      0.083333333333333,
      0.027777777777778,
      0.000015782828282828,
      0.000013714902807775,
    ],
    [
      304.8,
      30.48,
      0.3048,
      0.0003048,
      12,
      1,
      0.33333333333333,
      0.00018939393939394,
      0.0001645788336933,
    ],
    [
      914.4,
      91.44,
      0.9144,
      0.0009144,
      36,
      3,
      1,
      0.00056818181818182,
      0.00049373650107991,
    ],
    [
      1609344,
      160934.4,
      1609.344,
      1.609344,
      63360,
      5280,
      1760,
      1,
      0.86897624190065,
    ],
    [
      1852000,
      185200,
      1852,
      1.852,
      72913.385826772,
      6076.1154855643,
      2025.3718285214,
      1.1507794480235,
      1,
    ],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  //Generate facts for conversion

  let paperclip = parseFloat((result * getFactor(unit2, "inch")) / 1.35);
  let hand = parseFloat((result * getFactor(unit2, "inch")) / 7.5);
  let bus = parseFloat((result * getFactor(unit2, "m")) / 12);
  let soccerField = parseFloat((result * getFactor(unit2, "m")) / 110);

  // Fact data
  // 1 bus = 12m
  // 1 paperclip = 1.35 inch
  // 1 hand = 7.5 in
  // 1 soccer field = 110m
  // 365 soccer fields ~= circumference of earth

  const fact = [];

  if (paperclip < 7) {
    fact.push("Thats about: " + paperclip.toFixed(1) + " paperclips<br>");
    // 7 paperclips are close to half a hand, and so on.....
  } else if (hand < 27) {
    fact.push("Thats about: " + hand.toFixed(1) + " hands<br>");
  } else if (bus < 6) {
    fact.push("Thats about: " + bus.toFixed(1) + " buses<br>");
  } else {
    fact.push("Thats about: " + soccerField.toFixed(1) + " soccer fields<br>");
  }

  return fact;
}

function showAlert() {
  const x = document.getElementById("snackbar");
  // Add the "show" class to DIV
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2500);
}
