'use strict';
const baseUrl = 'https://nmuwl0ceod.execute-api.us-west-2.amazonaws.com';
const authEndpoint = '/auth';
const songEndpoint = '/song';
let session_token = null;
let formEl = null;
let state = new FormState();

state.subscribe('submit', submitSong);
state.subscribe('success', () => displayMessage('success'));
state.subscribe('fail', (error) => {
  console.log("Form State submission failure: ", error);
  displayMessage('failure');
});

function auth() { }
function displayMessage(messageType) {
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => message.classList.remove('active'));
  const messageEl = document.querySelector(`.${messageType}`);
  messageEl.classList.toggle('active');
}

function submitSong(song) {
  displayMessage('pending');
  fetch(`${baseUrl}${songEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(song)
  })
  .then(response => response.json())
  .then(state.onSuccess)
  .catch(state.onFail)
  .finally(state.onComplete);
}

document.addEventListener('DOMContentLoaded', function() {
  formEl = document.getElementById('song-dedication-form');
  state.load();

  formEl.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(formEl);
    const songValues = {};

    formData.forEach((value, key) => {
      songValues[key] = value;
    });
    
    const songSubmission = new Song(songValues);
    state.onSubmit(songSubmission);
  });
});
