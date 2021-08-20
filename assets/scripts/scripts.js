const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"



startGame();

function startGame() {

    initilizeCards(game.createCardsFromTechs());
}

function initilizeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);


        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
    })


}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}



function flipCard() {

    if (game.firstMove) {
        game.timer();
        game.firstMove = false;
    }

    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    clearInterval(control);
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);

            };
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    game.minutos = 0;
    game.segundos = 0;
    game.attempts = 0;
    setClock();
    setattempts();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}

function setClock() {
    let secondsTag = document.getElementById("seconds");
    let minutesTag = document.getElementById("minutes");

    if (game.segundos < 10) {
        secondsTag.innerText = `: 0${game.segundos}`;
    } else {
        secondsTag.innerText = `: ${game.segundos}`;
    }

    if (game.minutos < 10) {
        minutesTag.innerText = `0${game.minutos}`
    } else {
        minutesTag.innerText = `${game.minutos}`
    }

}

function setattempts() {
    let attempts = document.getElementById("tpm");

    if (game.attempts < 10) {
        attempts.innerHTML = `0${game.attempts}`;
    } else {
        attempts.innerHTML = `${game.attempts}`;
    }
}