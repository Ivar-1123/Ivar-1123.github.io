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
  // map units to numbers so we can use them to access array of factors
  let units = {
    cmps: 0,
    mps: 1,
    kmph: 2,
    fps: 3,
    milesph: 4,
    knots: 5,
    mach: 6,
  };

  let factors = [
    [1, 0.01, 0.036, 0.0328084, 0.0223714, 0.0194401, 0.0000293858],
    [100, 1, 3.6, 3.28084, 2.237136, 1.944012, 0.00293858],
    [27.77778, 0.277778, 1, 0.911344, 0.621427, 0.540003, 0.000816273],
    [30.48, 0.3048, 1.09728, 1, 0.681879, 0.592535, 0.00089568],
    [44.7, 0.447, 1.6092, 1.466535, 1, 0.868974, 0.00131355],
    [51.44, 0.5144, 1.85184, 1.687664, 1.150783, 1, 0.00151161],
    [34030, 340.3, 1225.08, 1116.47, 761.2975, 661.5474, 1],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  // Fact data
  // 1 turtle = 8.9 cmps
  // 1 horse = 72.5 kmph
  // 1 jet = 0.72 mach

  let turtle = parseFloat((result * getFactor(unit2, "cmps")) / 8.9);
  let horse = parseFloat((result * getFactor(unit2, "kmph")) / 72.5);
  let jet = parseFloat((result * getFactor(unit2, "mach")) / 0.72);

  const fact = [];

  if (turtle < 95) {
    fact.push("Thats about: " + turtle.toFixed(1) + " turtles<br>");
    // 95 turtles are close to half a horse, and so on.....
  } else if (horse < 13) {
    fact.push("Thats about: " + horse.toFixed(1) + " horses<br>");
  } else {
    fact.push("Thats about: " + jet.toFixed(1) + " jets<br>");
  }

  return fact;
}

function showAlert() {
  var x = document.getElementById("snackbar");
  // Add the "show" class to DIV
  x.className = "show";
  // After 2.5 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2500);
}
