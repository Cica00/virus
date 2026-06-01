 // Reasons database
 const wish = [
    { 
        text: "semoga di umur 20 semua impian kamu mulai tercapai satu persatu", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "i wish u all the happiness in the world, u deserve it so much", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "semoga semua lomba yang kamu ikutin bisa menang semua, aamiin ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "semoga kita bisa ketemu yaa ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentWishIndex = 0;
const wishContainer = document.getElementById('wish-container');
const shuffleButton = document.querySelector('.shuffle-button');
const wishCounter = document.querySelector('.wish-counter');
let isTransitioning = false;

// Create wish card with gif
function createWishCard(wish) {
    const card = document.createElement('div');
    card.className = 'wish-card';
    
    const text = document.createElement('div');
    text.className = 'wish-text';
    text.innerHTML = `${wish.emoji} ${wish.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${wish.gif}" alt="Love from Cica">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new wish
function displayNewWish() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentWishIndex < wish.length) {
        const card = createWishCard(wish[currentWishIndex]);
        wishContainer.appendChild(card);
        
        // Update counter
        wishCounter.textContent = `Wish ${currentWishIndex + 1} of ${wish.length}`;
        
        currentWishIndex++;

        // Check if we should transform the button
        if (currentWishIndex === wish.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "click me!";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#clickme!";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewWish();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);