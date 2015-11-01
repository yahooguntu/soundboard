import request from 'then-request';
import '../styles/app.css';

export default (function() {
  function playSound(item) {
    let val = document.querySelector('[name="output-selection"]:checked').value;
    let shouldPlayLocally = val === 'local';
    let fileName = item.innerText.trim();
    if(shouldPlayLocally) {
      let player = document.getElementById('sound-player');
      player.setAttribute('src', `sounds/${fileName}`);
      player.play();
    }
    else {
      request('POST', './play', {
        json: {file: fileName}
      });
    }
  }

  function updateServer() {
    request('POST', './update', {
      json: {update: true}
    })
  }

  function setup() {
    let playButtons = document.querySelectorAll('.play-btn');
    Array.from(playButtons).forEach((el) => {
      el.addEventListener('click', function() {
        playSound(this);
      });
    });
    document.querySelector('.update-btn').addEventListener('click', function() {
      updateServer(this);
    });
  }

  window.onload = setup;
})();
