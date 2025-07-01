const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

let turn = true;

player1.style.pointerEvents = "auto";
player1.style.backgroundColor = "white";
player2.style.pointerEvents = "none";
player2.style.backgroundColor = "gray";

player1.addEventListener("click", () => {   
    if(turn){
        turn = false;
        player1.style.backgroundColor = "red";
        player1.style.pointerEvents = "none";
        // Re-enable player2 for their turn
        player2.style.pointerEvents = "auto";
        player2.style.backgroundColor = "white";
    }
    console.log(turn); // Fixed: removed quotes
});

player2.addEventListener("click", () => {   
    if(!turn){
        turn = true;
        player2.style.backgroundColor = "red";
        player2.style.pointerEvents = "none";
        // Re-enable player1 for their turn
        player1.style.pointerEvents = "auto";
        player1.style.backgroundColor = "white";
    }
    console.log(turn);
});