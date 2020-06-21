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
    "electron volts": 0,
    joules: 1,
    kilojoules: 2,
    "thermal calories": 3,
    "food calories": 4,
    "foot pounds": 5,
  };

  let factors = [
    [1, 1.602177e-19, 1.602177e-22, 3.829294e-20, 3.29294e-23, 1.182705e-19],
    [6.241509e18, 1, 0.001, 0.239006, 0.000239006, 0.737562],
    [6.21509e21, 1000, 1, 239.0057, 0.239006, 737.5621],
    [2.611448e19, 4.184, 0.004184, 1, 0.001, 3.08596],
    [2.611448e22, 4184, 4.184, 1000, 1, 3085.96],
    [8.46235e18, 1.335818, 0.00135582, 0.324048, 0.000324048, 1],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  // Fact data
  // 1 battery = 9 kilojuoles
  // 1 banana = 44 kilo joules
  // 1 slice of cake = 1050 kilojoules

  let batteries = parseFloat((result * getFactor(unit2, "kilojoules")) / 9);
  let bananas = parseFloat((result * getFactor(unit2, "kilojoules")) / 44);
  let sliceOfCake = parseFloat(
    (result * getFactor(unit2, "kilojoules")) / 1050
  );

  const fact = [];

  if (batteries < 3) {
    fact.push("Thats about: " + batteries.toFixed(1) + " batteries<br>");
  } else if (bananas < 12) {
    fact.push("Thats about: " + bananas.toFixed(1) + " bananas<br>");
  } else {
    fact.push("Thats about: " + sliceOfCake.toFixed(1) + " slices of cake<br>");
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
