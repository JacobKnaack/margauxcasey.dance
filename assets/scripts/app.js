'use strict';
const baseUrl = 'https://nmuwl0ceod.execute-api.us-west-2.amazonaws.com';
const authEndpoint = '/auth';
const songEndpoint = '/song';
let session_token = null;
let formEl = null;
let state = new FormState();

state.subscribe('submit', (song) => {
  submitSong(song);
  displayMessage('pending');
});
state.subscribe('success', () => displayMessage('success'));
state.subscribe('fail', () => displayMessage('error'));

function auth() { }
function displayMessage(messageType) {
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => message.classList.remove('active'));
  const messageEl = document.querySelector(`.${messageType}`);
  messageEl.classList.toggle('active');
}

function submitSong(song) {
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
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    const songSubmission = new Song(data);
    state.onSubmit(songSubmission);
  });
});
