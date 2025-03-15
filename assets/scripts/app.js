'use strict';
const baseUrl = 'https://nmuwl0ceod.execute-api.us-west-2.amazonaws.com';
const authEndpoint = '/auth';
const songEndpoint = '/song';
let session_token = null;
let formEl = null;
let resetBtnEl = null;
let state = new FormState();

state.subscribe('submit', submitSong);
state.subscribe('success', () => displayMessage('success'));
state.subscribe('fail', (error) => {
  console.log("Form State submission failure: ", error);
  displayMessage('failure');
});
state.subscribe('complete', () => {
  disableForm(formEl, true);
});

function auth() { }
function displayMessage(messageType) {
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => message.classList.remove('active'));
  if (messageType) {
    const messageEl = document.querySelector(`.${messageType}`);
    messageEl.classList.toggle('active');  
  }
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

function disableForm(formElement, disabled) {
  const formElements = formElement.elements;
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = disabled;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  formEl = document.getElementById('song-dedication-form');
  resetBtnEl = document.getElementById('reset-btn');
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
  resetBtnEl.addEventListener('click', function() {
    formEl.reset();
    state.reset();
    disableForm(formEl, false);
    displayMessage();
  });
});
