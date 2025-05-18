    // SVG icons for rock, paper, scissors
    const icons = {
      rock: `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="16" ry="15" fill="#f5a623" stroke="#f08c7d" stroke-width="3"/><ellipse cx="24" cy="24" rx="10" ry="9" fill="#fff" opacity="0.5"/></svg>`,
      paper: `<svg viewBox="0 0 48 48"><rect x="10" y="8" width="28" height="32" rx="6" fill="#fff" stroke="#3bb273" stroke-width="3"/><rect x="14" y="12" width="20" height="24" rx="3" fill="#f5f7fa" opacity="0.7"/></svg>`,
      scissors: `<svg viewBox="0 0 48 48"><circle cx="15" cy="33" r="7" fill="#fff" stroke="#f08c7d" stroke-width="3"/><circle cx="33" cy="33" r="7" fill="#fff" stroke="#f08c7d" stroke-width="3"/><line x1="15" y1="33" x2="24" y2="12" stroke="#38414b" stroke-width="3"/><line x1="33" y1="33" x2="24" y2="12" stroke="#38414b" stroke-width="3"/></svg>`
    };
    const choices = ['rock', 'paper', 'scissors'];
    let p1Choice = null;
    let p2Choice = null;

    function renderChoices(player, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = icons[choice];
        btn.title = choice.charAt(0).toUpperCase() + choice.slice(1);
        if ((player === 1 && p1Choice === choice) || (player === 2 && p2Choice === choice)) {
          btn.classList.add('selected');
        }
        btn.onclick = () => {
          if (player === 1) {
            p1Choice = choice;
            renderChoices(1, 'p1-choices');
          } else {
            p2Choice = choice;
            renderChoices(2, 'p2-choices');
          }
          showResultIfReady();
        };
        container.appendChild(btn);
      });
    }

    function showResultIfReady() {
      const resultDiv = document.getElementById('result');
      if (p1Choice && p2Choice) {
        let winner = '';
        if (p1Choice === p2Choice) {
          winner = "It's a Draw!";
        } else if (
          (p1Choice === 'rock' && p2Choice === 'scissors') ||
          (p1Choice === 'scissors' && p2Choice === 'paper') ||
          (p1Choice === 'paper' && p2Choice === 'rock')
        ) {
          winner = "Player 1 Wins! 🎉";
        } else {
          winner = "Player 2 Wins! 🎉";
        }
        resultDiv.textContent = winner;
      } else {
        resultDiv.textContent = '';
      }
    }

    function resetGame() {
      p1Choice = null;
      p2Choice = null;
      renderChoices(1, 'p1-choices');
      renderChoices(2, 'p2-choices');
      document.getElementById('result').textContent = '';
    }

    document.getElementById('resetBtn').onclick = resetGame;

    // Initial render
    renderChoices(1, 'p1-choices');
    renderChoices(2, 'p2-choices');