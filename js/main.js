
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = [];




function flipcard() {

    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first Click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second Click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
    


}

//let gameEnded = false ;
let isMatch = true;

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
    
    addMoves(); 
    
}
let all = true;
let theEnd = false;
function matchedAll(){
    $(cards).each(function(){
        return all = isMatch;
    });
    if(all){
        showCongrats();
        theEnd = true;
    }
    
};

function showCongrats() {
    if(cards.length === matchedCards.length){
        alert('Congratulation Winning' , 'with' + movesContainer + 'moves' );
    }
   
}

 /*if(isMatch = true){
        showCongrats();
        gameEnded = true ;
        
    }*/

function disableCards() {
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);
    resetBoard();
    
}

function unflipCards() {
    lockBoard = true;
    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 800);


}

/*(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });

})(); */

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
    
}



const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function () {

    location.reload();
});


let movesContainer = document.querySelector(".moves");
let moves = 0;

function addMoves() {
    moves++;
    movesContainer.innerHTML = moves;

    // set rating
    rating();
}


// Animation
/*let openCards=[];
function matched(openCards){
    for(let i=openCards.length -1; i>=0; i--){
        $(openCards[i]).addClass("animate pulse");
    }
    
}

function unMatched(){
    
}*/

// Rating ...
let starsContainer = document.querySelector(".star");
starsContainer.innerHTML =
    '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';

function rating() {
    if (moves < 25) {

        starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';

    }
    else if(moves > 25 ){
		   
		   starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
		   
	   }else { 
		   starsContainer.innerHTML = 
               '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
	   }
}


let seconds = 0 ;
let minutes = 0;
let hours = 0 ;


function stopWatch(){
    seconds ++;
    if(seconds/60 === 1){
        seconds = 0;
        minutes ++;
        
        if(minutes / 60 === 1 ){
            minutes = 0 ;
            hours ++;
        }
    }
    
    document.getElementById("timer").innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +  (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds: seconds);
    
} 

update = setInterval(stopWatch,1000);


cards.forEach(card => card.addEventListener('click', flipcard));
