let noButtonAttempts = 0;
let yesScale = 1;
let flyingEnabled = false;
let flyingHovers = 0;

const messages = [
    'Are you sure?',
    'Wow....',
    'Really?',
    "It's not going to work",
    'My heart 💔',
    'So you hate me.',
    'STOPPPPP',
    "I'm not gonna let you...",
    'You want me dead don\'t you',
    'Fine go ahead.... 😢',
    'Uh uh uhhhhh'
];

function runAway() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.yes-btn');
    const card = document.querySelector('.card');

    noButtonAttempts++;

    // Update main message for clicks 1..10
    if (noButtonAttempts <= messages.length) {
        const heading = document.querySelector('h1');
        heading.textContent = messages[noButtonAttempts - 1];
    }

    // For clicks 1-9, increase Yes button by 20% cumulatively with sizing adjustments
    if (noButtonAttempts < 10) {
        yesScale *= 1.15;
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.fontSize = `${yesScale}em`;
        yesBtn.style.padding = `${15 * yesScale}px ${40 * yesScale}px`;
        
        // Push the No button away as Yes button grows
        const pushDistance = (yesScale - 1) * 30;
        noBtn.style.transform = `translateY(${pushDistance}px)`;
        
        // Also increase gap between buttons to create spreading effect
        const buttonContainer = document.querySelector('.button-container');
        buttonContainer.style.gap = `${20 + pushDistance}px`;
        const subHeader = document.querySelector('p');
        subHeader.textContent = '';
    } else if (noButtonAttempts === 10) {
        // On the 10th click, reset Yes button to normal size
        yesScale = 1;
        yesBtn.style.transform = '';
        yesBtn.style.fontSize = '1em';
        yesBtn.style.padding = '12px 30px';
        
        // Reset No button position and container gap
        noBtn.style.transform = '';
        const buttonContainer = document.querySelector('.button-container');
        buttonContainer.style.gap = '20px';
        
        // Update sub-header message
        const subHeader = document.querySelector('p');
        subHeader.textContent = 'if you really don\'t love me that much...';
    } else if (noButtonAttempts === 11) {
        // Enable flying behavior on the 11th click and show the new message (messages[10])
        flyingEnabled = true;
        flyingHovers = 0; // Reset hover counter
        
        // Update sub-header message
        const subHeader = document.querySelector('p');
        subHeader.textContent = 'you thought I would take no for an answer? 😠';

        // Start flying immediately once 11 clicks reached
        flyMove(noBtn, card);

        // Make the No button start avoiding the card on hover and track hovers
        noBtn.addEventListener('mouseenter', () => {
            if (flyingEnabled) {
                flyingHovers++;
                
                // After 10 hovers, enlarge Yes button again
                if (flyingHovers === 10) {
                    yesScale = 1.75;
                    yesBtn.style.transform = `scale(${yesScale})`;
                    yesBtn.style.fontSize = `${yesScale}em`;
                    yesBtn.style.padding = `${15 * yesScale}px ${40 * yesScale}px`;
                    
                    const heading = document.querySelector('h1');
                    heading.textContent = 'You coulllddd just say yes';
                    subHeader.textContent = '...if you really wanted to make me happy 💖';
                }
                
                // After 20 hovers, convert No button to Yes button and return to original position
                if (flyingHovers === 20) {
                    noBtn.innerHTML = 'Yes 💚';
                    noBtn.classList.remove('no-btn');
                    noBtn.classList.add('yes-btn');
                    noBtn.style.position = '';
                    noBtn.style.left = '';
                    noBtn.style.top = '';
                    noBtn.onclick = handleYes;
                    
                    // Reset Yes button to normal size
                    yesScale = 1;
                    yesBtn.style.transform = '';
                    yesBtn.style.fontSize = '1em';
                    yesBtn.style.padding = '12px 30px';
                    
                    const heading = document.querySelector('h1');
                    heading.textContent = 'This should make things easier for you 😁';
                    const subHeader = document.querySelector('p');
                    subHeader.textContent = '';
                    
                    // Stop flying
                    flyingEnabled = false;
                }
                
                if (flyingEnabled) flyMove(noBtn, card);
            }
        });
        // Also make clicks cause it to fly after enabled
        noBtn.addEventListener('click', () => {
            if (flyingEnabled) flyMove(noBtn, card);
        });
    }
}

function flyMove(noBtn, card) {
    // Moves the button to a random position that avoids overlapping the card
    const cardRect = card.getBoundingClientRect();
    const cardLeft = cardRect.left;
    const cardRight = cardRect.right;
    const cardTop = cardRect.top;
    const cardBottom = cardRect.bottom;
    const buttonWidth = noBtn.offsetWidth || 120;
    const buttonHeight = noBtn.offsetHeight || 50;
    const margin = 20; // Safety margin

    let randomX, randomY, validPosition;
    let attempts = 0;
    const maxAttempts = 50;

    do {
        attempts++;
        validPosition = true;
        randomX = Math.random() * Math.max(0, window.innerWidth - buttonWidth);
        randomY = Math.random() * Math.max(0, window.innerHeight - buttonHeight);

        if (randomX + buttonWidth > cardLeft - margin &&
            randomX < cardRight + margin &&
            randomY + buttonHeight > cardTop - margin &&
            randomY < cardBottom + margin) {
            validPosition = false;
        }
    } while (!validPosition && attempts < maxAttempts);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function handleYes() {
    const card = document.querySelector('.card');
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = '🎉 Let\'s makout.... 😏';
    const heading = document.querySelector('h1');
    heading.textContent = 'I always am know you are lomve meeeeee 😍';
    const subHeader = document.querySelector('p');
    subHeader.textContent = '';
    
    // Remove buttons
    document.querySelector('.button-container').style.display = 'none';
    
    // Add success message
    card.appendChild(message);
    
    // Play audio
    const audio = new Audio('Marvin Gaye - Let\'s Get It On.mp3');
    audio.currentTime = 3;
    audio.play();
    
    // Add image
    const img = document.createElement('img');
    img.src = 'image.png';
    img.style.marginTop = '30px';
    img.style.borderRadius = '10px';
    img.style.maxWidth = '300px';
    img.style.height = 'auto';
    card.appendChild(img);
    
    // Add confetti effect
    createConfetti();
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animate falling
        let top = -10;
        let left = parseFloat(confetti.style.left);
        const speed = Math.random() * 3 + 2;
        const drift = (Math.random() - 0.5) * 100;
        
        const fall = setInterval(() => {
            top += speed;
            left += drift / 30;
            confetti.style.top = top + 'px';
            confetti.style.left = left + 'px';
            confetti.style.opacity = 1 - (top / window.innerHeight);
            
            if (top > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 30);
    }
}
