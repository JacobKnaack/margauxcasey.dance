'use strict';
const apiKeyUrl = null;
const songRepositoryUrl = null;
let API_KEY = null;
let formEl = null;

function onSuccess() {}
function onFail() {}

class Song {
  constructor(songData) {
    this.title = songData.title;
    this.artist = songData.artist;
    this.name = songData.name;
    this.dedication = songData.dedication;
  }
}

function auth () {}
function submitSong(song, { apiKey }) {

  fetch(songRepositoryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `X-API-KEY ${apiKey}`,
    },
    body: JSON.stringify(song)
  })
  .then(response => response.json())
  .then(onSuccess)
  .catch(onFail);
}

document.addEventListener('DOMContentLoaded', function() {
  formEl = document.getElementById('song-dedication-form');
  fetch(apiKeyUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(apiKeyData => {
    console.log('API Key:', apiKeyData.apiKey);
    API_KEY = apiKeyData.apiKey;

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      submitSong(new Song(data), {
        apiKey: API_KEY,
      });
    });
  })
  .catch((error) => {
    console.error('Error fetching API key:', error);
    // Handle error - maybe show an error message to the user
  });
});