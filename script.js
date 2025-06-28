const teams = [
    { name: "Manchester United", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Real Madrid", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Barcelona", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Liverpool", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Bayern Munich", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Paris Saint-Germain", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Manchester City", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Chelsea", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "AC Milan", budget: 100, squad: [], transfersRemaining: 4 },
    { name: "Arsenal", budget: 100, squad: [], transfersRemaining: 4 }
];

const players = [
    { name: "Lionel Messi", value: 50, isTaken: false, position: "Forward" },
    { name: "Cristiano Ronaldo", value: 50, isTaken: false, position: "Forward" },
    { name: "Neymar", value: 40, isTaken: false, position: "Forward" },
    { name: "Rodrygo", value: 25, isTaken: false, position: "Forward" },
    { name: "Kevin De Bruyne", value: 30, isTaken: false, position: "Midfielder" },
    { name: "Virgil van Dijk", value: 35, isTaken: false, position: "Defender" },
    { name: "Mohamed Salah", value: 40, isTaken: false, position: "Forward" },
    { name: "Robert Lewandowski", value: 35, isTaken: false, position: "Forward" },
    { name: "Gabriel", value: 20, isTaken: false, position: "Defender" },
    { name: "Ruben Dias", value: 20, isTaken: false, position: "Defender" },
    { name: "Gvardiol", value: 20, isTaken: false, position: "Defender" },
    { name: "Grimaldo", value: 20, isTaken: false, position: "Defender" },
    { name: "Erling Haaland", value: 5, isTaken: false, position: "Forward" },
    { name: "Harry Kane", value: 50, isTaken: false, position: "Forward" },
    { name: "Trent Alexander-Arnold", value: 30, isTaken: false, position: "Defender" },
    { name: "Vinicius Junior", value: 35, isTaken: false, position: "Forward" },
    { name: "Bruno Fernandes", value: 30, isTaken: false, position: "Midfielder" },
    { name: "Luka Modric", value: 30, isTaken: false, position: "Midfielder" },
    { name: "Andrew Robertson", value: 20, isTaken: false, position: "Defender" },
    { name: "Raphinha", value: 25, isTaken: false, position: "Forward" },
    { name: "Kovacic", value: 20, isTaken: false, position: "Midfielder" },
    { name: "Rodri", value: 30, isTaken: false, position: "Midfielder" },
    { name: "Jude Bellingham", value: 30, isTaken: false, position: "Midfielder" },
    { name: "Pedri", value: 20, isTaken: false, position: "Midfielder" },
    { name: "Gavi", value: 20, isTaken: false, position: "Midfielder" },
    { name: "Lamine Yamal", value: 30, isTaken: false, position: "Forward" },
    { name: "Bukayo Saka", value: 30, isTaken: false, position: "Forward" }
];

let selectedTeamIndex = 0;

function initializeGame() {
    
    const teamSelect = document.getElementById("teamSelect");
    teams.forEach((team, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });

    
    teamSelect.addEventListener("change", () => {
        selectedTeamIndex = teamSelect.value;
        updateTeamInfo();
    });


    updateTeamInfo();
    populateTransferList();
}

function updateTeamInfo() {
    const team = teams[selectedTeamIndex];
    document.getElementById("teamName").textContent = team.name;
    document.getElementById("budget").textContent = `${team.budget}M`;
    document.getElementById("transfersRemaining").textContent = team.transfersRemaining;

    const currentSquad = document.getElementById("currentSquad");
    currentSquad.innerHTML = team.squad.map(player => `<li>${player.name} (${player.value}M)</li>`).join("");
}

function populateTransferList() {
    const transferList = document.getElementById("transferList");

   
    const availablePlayers = players.filter(player => !player.isTaken); 

    const defenderPlayers = availablePlayers.filter(player => player.position === "Defender");
    const midfielderPlayers = availablePlayers.filter(player => player.position === "Midfielder");
    const forwardPlayers = availablePlayers.filter(player => player.position === "Forward");

    
    transferList.innerHTML = `
        <h4>Defenders</h4>
        ${defenderPlayers.length > 0 ? defenderPlayers.map(player => `<li>${player.name} (${player.value}M)</li>`).join("") : "<p>No available defenders</p>"}
        <h4>Midfielders</h4>
        ${midfielderPlayers.length > 0 ? midfielderPlayers.map(player => `<li>${player.name} (${player.value}M)</li>`).join("") : "<p>No available midfielders</p>"}
        <h4>Forwards</h4>
        ${forwardPlayers.length > 0 ? forwardPlayers.map(player => `<li>${player.name} (${player.value}M)</li>`).join("") : "<p>No available forwards</p>"}
    `;
}

function addPlayer() {
    const team = teams[selectedTeamIndex];
    if (team.transfersRemaining <= 0) {
        alert("No transfers remaining!");
        return;
    }

    const playerName = prompt("Enter the Full name of the player you want to add:");
    const player = players.find(p => p.name === playerName);
    if (!player) {
        alert("Player not found!");
        return;
    }

    if (player.isTaken) {
        alert("This player is already taken by another team!");
        return;
    }

    if (team.budget < player.value) {
        alert("Not enough budget!");
        return;
    }

    player.isTaken = true;
    team.squad.push(player);
    team.budget -= player.value;
    team.transfersRemaining -= 1;
    updateTeamInfo();
    populateTransferList();
}

function removePlayer() {
    const team = teams[selectedTeamIndex];
    if (team.transfersRemaining <= 0) {
        alert("No transfers remaining!");
        return;
    }

    const playerName = prompt("Enter the name of the player you want to remove:");
    const playerIndex = team.squad.findIndex(p => p.name === playerName);
    if (playerIndex === -1) {
        alert("Player not found in squad!");
        return;
    }

    const player = team.squad[playerIndex];
    player.isTaken = false;
    team.squad.splice(playerIndex, 1);
    team.budget += player.value;
    team.transfersRemaining -= 1;
    updateTeamInfo();
    populateTransferList();
}

window.onload = initializeGame;
