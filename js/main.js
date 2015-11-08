import request from 'then-request';
import alertify from 'alertifyjs';
import bonzo from 'bonzo';
import '../styles/app.css';

export default (function() {
  function playSound(item) {
    let val = document.querySelector('[name="output-selection"]:checked').value;
    let shouldPlayLocally = val === 'local';
    let fileName = item.innerText.trim();
    if(shouldPlayLocally) {
      createSoundPlayer(fileName);
    }
    else {
      request('POST', './play', {
        json: {file: fileName}
      });
    }
  }

  function createSoundPlayer(fileName) {
    let sourceTag = bonzo.create('<source>');
    bonzo(sourceTag).attr('type', 'audio/mpeg');
    let audioTag = bonzo.create('<audio>');
    bonzo(audioTag).attr('src', `sounds/${fileName}`)
      .append(sourceTag).appendTo('body');
    audioTag = audioTag[0];
    audioTag.addEventListener('ended', function() {
      bonzo(audioTag).remove();
    });
    audioTag.addEventListener('error', function() {
      alertify.error('Error playing track!');
      bonzo(audioTag).remove();
    });
    audioTag.play();
  }

  function updateServer() {
    request('POST', './update', {
      json: {update: true}
    });
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
    document.querySelector('.upload-form').addEventListener('submit',
        function(e) {
      request('POST', 'upload', {
        body: new FormData(this)
      }).then((res) => {
        if(res.statusCode < 300) {
          alertify.success('File uploaded!');
        }
        else {
          alertify.error('Something bad happened!');
        }
        document.querySelector('.upload-form input[type="file"]').value = null;
      });
      e.preventDefault();
    });
  }

  window.onload = setup;
})();
