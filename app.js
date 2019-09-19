/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)


*/

var scores, roundScore, activePlayer, gamePlaying, maxscoren;


function newGame(){
    scores = [0, 0];
    roundScore = 0;
    maxscoren = document.getElementById("maxscore").value;
    console.log(maxscoren);
    
    activePlayer = 0; //0 firstplayer, will use 0, 1 to write the corresponding index of the scores array
    


    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector('.player-0-panel').classList.remove('active'); //I end up with two if I just add it
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    document.querySelector(".dice0").style.display = 'none';
    document.querySelector(".dice1").style.display = 'none';

    gamePlaying = true;
    


    

}

//document.querySelector("#current-" + activePlayer).textContent = dice; //textContent only for plain text, no html
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"; in quotes, js needs to know it is not js




function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore  = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector(".dice0").style.display = 'none';
    document.querySelector(".dice1").style.display = 'none';


}
/* function btn(){
}
document.querySelector(".btn-roll").addEventListener(click, btn); //no btn(), not calling function now, the event will do it */

newGame();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying){
    //random number
    var dice0 = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    //display dice --pics have number in the name so it is simple to change them
    var diceDOM = document.querySelector(".dice0");
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + dice0 + ".png";
    var diceDOM2 = document.querySelector(".dice1");
    diceDOM2.style.display = 'block';
    diceDOM2.src = "dice-" + dice1 + ".png";

    //update score if dice isn't one
    if (dice0 !== 1 && dice1 !== 1) {
    roundScore += dice0;
    roundScore += dice1;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
       nextPlayer();
    }; 
    }

});

document.querySelector(".btn-hold").addEventListener("click", function(){
    if (gamePlaying){
 //add current to global score, check if player won, update ui
 scores[activePlayer] += roundScore;
 document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
 
 if (scores[activePlayer] >= maxscoren) {
     document.querySelector("#name-" + activePlayer).textContent = "winner!";
     document.querySelector(".dice0").style.display = 'none';
     document.querySelector(".dice1").style.display = 'none';

     document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
     document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
     gamePlaying = false;

 } else{
     nextPlayer();

 };
 
    };
   
});

document.querySelector(".btn-new").addEventListener("click", function(){
 newGame();
});

document.querySelector("#maxscore").addEventListener("change", function(){
    newGame();
   });


   
   