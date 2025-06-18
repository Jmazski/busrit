// Function to reset the bus to the initial state with your chosen names
function resetBus() {
    bus = [
        "Ceylan",
        "Jonas",
        "Jan",
        "MX",
        "Pico",
        "Boyfriend",
        "Girlfriend",
        "Darnell",
        "Sharugina",
        "Roan"
    ];
    uitgestapt = [];
    stapIndex = 0;
    nextBtn.disabled = false;
    nextBtn.innerText = "Doorrijden";
    repeatBtn.style.display = "none";
    stappen[0]();
    stapIndex = 1;
}

// All bus ride steps as functions in an array
const stappen = [
    stap1,
    stap2,
    stap3,
    stap4,
    stap5
];

let stapIndex = 0;
let bus = [];
let uitgestapt = [];

const outputDiv = document.getElementById("output");
const nextBtn = document.getElementById("nextBtn");
const repeatBtn = document.getElementById("repeatBtn");

// Step 1: Show the initial list of passengers
function stap1() {
    show("Stap 1: Dit zijn de 10 passagiers in de bus:", bus);
}

// Step 2: Add Raymond as a new passenger
function stap2() {
    bus.push("Raymond");
    show("Stap 2: Raymond stapt in!", bus);
}

// Step 3: Remove the fifth person, and display who left
function stap3() {
    // Get the name of the fifth person
    const vijfdePersoon = bus[4];
    // Remove the fifth person from the array (index 4)
    bus.splice(4, 1);
    show(`Stap 3: De vijfde persoon (${vijfdePersoon}) is uitgestapt!`, bus);
}

// Step 4: Shuffle the bus array (simulate barrel roll)
function stap4() {
    shuffle(bus);
    show("Stap 4: De bus maakt een barrel roll! De passagiers zitten nu zo:", bus);
}

// Step 5: Let passengers leave one by one, show how many remain each time
function stap5() {
    if (bus.length > 0) {
        const persoon = bus.shift(); // Remove first person
        uitgestapt.push(persoon);
        show(
          `Stap 5: ${persoon} stapt uit. Nog ${bus.length} passagier${bus.length === 1 ? "" : "s"} in de bus.`,
          bus
        );
        if (bus.length > 0) {
            stapIndex--; // Stay in step 5 until bus is empty
        } else {
            nextBtn.disabled = true;
            nextBtn.innerText = "Eindhalte!";
            show(
              "Alle passagiers zijn uitgestapt!<br><br>Uitgestapt in deze volgorde:",
              uitgestapt
            );
            repeatBtn.style.display = "block";
        }
    }
}

// Function to display a numbered list of names on the page
function show(titel, lijst) {
    outputDiv.innerHTML = `<strong>${titel}</strong><br>Totaal: <b>${lijst.length}</b> passagier${lijst.length === 1 ? "" : "s"}<ol>${lijst.map((p,i) => `<li>${p}</li>`).join("")}</ol>`;
}

// Fisher-Yates shuffle function to randomize the array
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Handler for the "Doorrijden" button
nextBtn.addEventListener("click", () => {
    if (stapIndex < stappen.length) {
        stappen[stapIndex]();
        stapIndex++;
    }
});

// Handler for the "Herhaal" (Repeat) button
repeatBtn.addEventListener("click", resetBus);

// Start with the initial bus state and show the first step
resetBus();