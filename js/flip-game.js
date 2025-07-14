let gameInitialized = false;

// Audio objects for sound effects
let flipSound, matchSound, wrongSound, winSound;

function initFlipGame() {
    console.log('=== INIT FLIP GAME STARTED ===');
    
    if (gameInitialized) {
        console.log('Game already initialized, skipping...');
        return;
    }
    
    console.log('Initializing flip game...');
    
    // Initialize audio objects with error handling
    try {
        flipSound = new Audio('./tunes/flip.mp3');
        matchSound = new Audio('./tunes/match.mp3');
        wrongSound = new Audio('./tunes/wrong.mp3');
        winSound = new Audio('./tunes/win.mp3');
        
        // Set volume for all sounds
        flipSound.volume = 0.4;
        matchSound.volume = 0.6;
        wrongSound.volume = 0.3;
        winSound.volume = 0.7;
        
        // Preload audio files
        flipSound.load();
        matchSound.load();
        wrongSound.load();
        winSound.load();
        
        console.log('Audio files loaded successfully');
    } catch (error) {
        console.error('Error loading audio files:', error);
    }
    
    const cards = document.querySelectorAll(".card");
    console.log('Found cards:', cards.length);
    
    if (cards.length === 0) {
        console.log('No cards found, retrying in 100ms...');
        setTimeout(initFlipGame, 100);
        return;
    }
    
    let matched = 0;
    let cardOne, cardTwo;
    let disableDeck = false;

    function flipCard(e) {
        console.log('Card clicked!');
        const clickedCard = e.currentTarget;
        const inner = clickedCard.querySelector('.card-inner');
        if(cardOne !== clickedCard && !disableDeck) {
            console.log('Flipping card...');
            inner.classList.add("flip");
            
            // Play flip sound
            playSound(flipSound);
            
            if(!cardOne) {
                cardOne = clickedCard;
                console.log('First card selected');
                return;
            }
            
            cardTwo = clickedCard;
            disableDeck = true;
            console.log('Second card selected, checking match...');
            
            let cardOneImg = cardOne.querySelector(".back-view img").src;
            let cardTwoImg = cardTwo.querySelector(".back-view img").src;
            
            console.log('Card 1 image:', cardOneImg);
            console.log('Card 2 image:', cardTwoImg);
            
            matchCards(cardOneImg, cardTwoImg);
        } else {
            console.log('Card click ignored - already selected or deck disabled');
        }
    }

    function matchCards(img1, img2) {
        const innerOne = cardOne.querySelector('.card-inner');
        const innerTwo = cardTwo.querySelector('.card-inner');
        if(img1 === img2) {
            matched++;
            console.log('Match found! Total matches:', matched);
            
            // Play match sound
            playSound(matchSound);
            
            if(matched == 8) {
                console.log('Game completed! Shuffling...');
                // Play win sound
                setTimeout(() => {
                    playSound(winSound);
                }, 500);
                setTimeout(() => {
                    shuffleCard();
                }, 1000);
            }
            cardOne.removeEventListener("click", flipCard);
            cardTwo.removeEventListener("click", flipCard);
            cardOne = cardTwo = "";
            disableDeck = false;
            return;
        }
        
        console.log('No match, shaking cards...');
        // Play wrong sound
        playSound(wrongSound);
        
        setTimeout(() => {
            innerOne.classList.add("shake");
            innerTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            innerOne.classList.remove("shake", "flip");
            innerTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
            console.log('Cards reset');
        }, 1200);
    }

    function shuffleCard() {
        console.log('Shuffling cards...');
        matched = 0;
        disableDeck = false;
        cardOne = cardTwo = "";
        
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
        
        cards.forEach((card, i) => {
            const inner = card.querySelector('.card-inner');
            inner.classList.remove("flip");
            let imgTag = card.querySelector(".back-view img");
            imgTag.src = `images/${arr[i]}.png`;
            
            // Remove existing event listeners and add new ones
            card.removeEventListener("click", flipCard);
            card.addEventListener("click", flipCard);
        });
        console.log('Shuffle complete');
    }

    // Initialize the game
    shuffleCard();
    
    // Add event listeners to all cards
    cards.forEach((card, index) => {
        card.addEventListener("click", flipCard);
        console.log(`Event listener added to card ${index + 1}`);
    });
    
    // Enable audio after first user interaction
    document.addEventListener('click', enableAudio, { once: true });
    
    gameInitialized = true;
    console.log('=== GAME INITIALIZATION COMPLETE ===');
}

let audioEnabled = false;

// Function to enable audio after user interaction
function enableAudio() {
    audioEnabled = true;
    console.log('Audio enabled after user interaction');
}

// Function to play sound with better error handling
function playSound(audio) {
    if (!audioEnabled) {
        console.log('Audio not enabled yet, waiting for user interaction');
        return;
    }
    
    if (audio && audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        try {
            audio.currentTime = 0;
            audio.play().then(() => {
                console.log('Sound played successfully');
            }).catch(e => {
                console.log('Audio play failed:', e);
            });
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    } else {
        console.log('Audio not ready, readyState:', audio ? audio.readyState : 'null');
    }
}



// Export the function for use in script.js
export { initFlipGame };