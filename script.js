const plantData = [
    {
        name: "Neem",
        scientific: "Azadirachta indica",
        icon: "🌳",
        water: "Water when the soil begins to dry.",
        sunlight: "Sunny location",
        soil: "Well-drained soil"
    },
    {
        name: "Mango",
        scientific: "Mangifera indica",
        icon: "🥭",
        water: "Water regularly while young.",
        sunlight: "Full sunlight",
        soil: "Deep, well-drained soil"
    },
    {
        name: "Tulsi",
        scientific: "Ocimum tenuiflorum",
        icon: "🌿",
        water: "Keep soil lightly moist, not soggy.",
        sunlight: "Bright sunlight",
        soil: "Well-drained soil"
    },
    {
        name: "Aloe Vera",
        scientific: "Aloe barbadensis miller",
        icon: "🪴",
        water: "Water after soil dries.",
        sunlight: "Bright light",
        soil: "Sandy, well-drained soil"
    },
    {
        name: "Guava",
        scientific: "Psidium guajava",
        icon: "🍈",
        water: "Water regularly during early growth.",
        sunlight: "Sunny location",
        soil: "Well-drained soil"
    },
    {
        name: "Coconut",
        scientific: "Cocos nucifera",
        icon: "🥥",
        water: "Needs adequate water, especially when young.",
        sunlight: "Full sunlight",
        soil: "Suitable, well-drained soil"
    }
];

// PLANT EXPLORER

const plantGrid = document.getElementById("plantGrid");
const searchPlant = document.getElementById("searchPlant");

function displayPlants(list) {

    plantGrid.replaceChildren();

    if (list.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No plants found.";
        plantGrid.appendChild(message);
        return;
    }

    list.forEach(plant => {

        const card = document.createElement("div");
        card.className = "plant-card";

        const icon = document.createElement("div");
        icon.className = "plant-icon";
        icon.textContent = plant.icon;

        const name = document.createElement("h3");
        name.textContent = plant.name;

        const scientific = document.createElement("p");
        scientific.textContent = plant.scientific;

        const water = document.createElement("p");
        water.textContent = "💧 " + plant.water;

        const sunlight = document.createElement("p");
        sunlight.textContent = "☀️ " + plant.sunlight;

        const soil = document.createElement("p");
        soil.textContent = "🌱 " + plant.soil;

        card.append(icon, name, scientific, water, sunlight, soil);

        plantGrid.appendChild(card);
    });
}

displayPlants(plantData);

// SEARCH

searchPlant.addEventListener("input", function() {

    const query = searchPlant.value.toLowerCase().trim();

    const filteredPlants = plantData.filter(plant =>
        plant.name.toLowerCase().includes(query) ||
        plant.scientific.toLowerCase().includes(query)
    );

    displayPlants(filteredPlants);
});

// MY GARDEN TRACKER

const plantForm = document.getElementById("plantForm");
const gardenList = document.getElementById("gardenList");

let myPlants = JSON.parse(localStorage.getItem("myTreeCarePlants") || "[]");

function saveGarden() {
    localStorage.setItem("myTreeCarePlants", JSON.stringify(myPlants));
}

function displayGarden() {

    gardenList.replaceChildren();

    myPlants.forEach((plant, index) => {

        const card = document.createElement("div");
        card.className = "garden-card";

        const title = document.createElement("h3");
        title.textContent = "🌱 " + plant.name;

        const type = document.createElement("p");
        type.textContent = "Species: " + plant.type;

        const date = document.createElement("p");
        date.textContent = "Planting Date: " + plant.date;

        const location = document.createElement("p");
        location.textContent = "Location: " + (plant.location || "Not specified");

        const status = document.createElement("p");
        status.textContent = "Status: Growing 🌿";

        const remove = document.createElement("button");
        remove.className = "remove-btn";
        remove.textContent = "Remove Plant";

        remove.addEventListener("click", function() {
            myPlants.splice(index, 1);
            saveGarden();
            displayGarden();
        });

        card.append(title, type, date, location, status, remove);

        gardenList.appendChild(card);
    });
}

// ADD NEW PLANT

plantForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("plantName").value.trim();
    const type = document.getElementById("plantType").value.trim();
    const date = document.getElementById("plantDate").value;
    const location = document.getElementById("plantLocation").value.trim();

    if (!name || !type || !date) {
        alert("Please enter all required details.");
        return;
    }

    const newPlant = {
        name: name,
        type: type,
        date: date,
        location: location
    };

    myPlants.push(newPlant);

    saveGarden();
    displayGarden();

    plantForm.reset();

    alert("Plant added successfully! 🌱");
});

displayGarden();