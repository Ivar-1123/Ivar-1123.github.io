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
  let units = { watts: 0, kilowatts: 1, horsepower: 2, fppm: 3, btuspm: 4 };

  let factors = [
    [1, 0.001, 0.00134102, 44.25373, 0.056869],
    [1000, 1, 1.341022, 44253.73, 56.86902],
    [745.6999, 0.7457, 1, 33000, 42.40722],
    [0.022597, 0.000022597, 0.000030303, 1, 0.00128507],
    [17.58427, 0.0175843, 0.0235809, 778.1694, 1],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  // Fact data
  // 1 light bulb = 60watts
  // 1 horse = 745 watts
  // 1 train engine = 2980 kilowatts

  let lightBulb = parseFloat((result * getFactor(unit2, "watts")) / 60);
  let horses = parseFloat((result * getFactor(unit2, "watts")) / 745);
  let trainEngine = parseFloat((result * getFactor(unit2, "kilowatts")) / 2980);

  const fact = [];

  if (lightBulb < 7) {
    fact.push("Thats about: " + lightBulb.toFixed(1) + " light bulbs<br>");
    // 6 light bulbs are close to half a horse, and so on.....
  } else if (horses < 15) {
    fact.push("Thats about: " + horses.toFixed(1) + " horses<br>");
  } else {
    fact.push("Thats about: " + trainEngine.toFixed(1) + " train engines<br>");
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
