'use strict';
const baseUrl = 'https://nmuwl0ceod.execute-api.us-west-2.amazonaws.com';
const authEndpoint = '/auth';
const formEndPoint = '/song';
let session_token = null;
let formEl = null;
let state = new FormState();

function auth () {}

function submitSong(song) {
  fetch(`${songRepositoryUrl}${songEndpoint}`, {
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

  formEl.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    const songSubmission = new Song(data);
    state.onSubmit(songSubmission);
    submitSong(songSubmission);
  });
});
