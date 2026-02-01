let noButtonAttempts = 0;

function runAway() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.yes-btn');
    
    noButtonAttempts++;
    
    // After 10 attempts, grow the Yes button
    if (noButtonAttempts === 10) {
        yesBtn.style.transform = 'scale(1.5)';
        yesBtn.style.fontSize = '1.3em';
        yesBtn.style.padding = '15px 40px';
    }
    
    // After 20 attempts, change message and convert No button to Yes button
    if (noButtonAttempts === 20) {
        const heading = document.querySelector('h1');
        heading.innerHTML = "Fine, if you insist... 😏💕";
        
        // Convert No button to Yes button
        noBtn.innerHTML = 'Yes 💚';
        noBtn.classList.remove('no-btn');
        noBtn.classList.add('yes-btn');
        noBtn.onclick = handleYes;
    }
    
    // Generate random position
    const randomX = Math.random() * (window.innerWidth - 120);
    const randomY = Math.random() * (window.innerHeight - 50);
    
    // Move the button to a random position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function handleYes() {
    const card = document.querySelector('.card');
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = '🎉 Yay! You made me the happiest! 💕';
    
    // Remove buttons
    document.querySelector('.button-container').style.display = 'none';
    
    // Add success message
    card.appendChild(message);
    
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
