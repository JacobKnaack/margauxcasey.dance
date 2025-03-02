'use strict';
const apiKeyUrl = null;
const songRepositoryUrl = null;

document.addEventListener('DOMContentLoaded', function() {
  fetch(apiKeyUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(apiKeyData => {
    console.log('API Key:', apiKeyData.apiKey);
    const apiKey = apiKeyData.apiKey;

    const form = document.querySelector('form'); // Adjust the selector to target your form

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      fetch(songRepositoryUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}` // Use the fetched API key
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success - maybe show a message to the user
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error - maybe show an error message to the user
      });
    });
  })
  .catch((error) => {
    console.error('Error fetching API key:', error);
    // Handle error - maybe show an error message to the user
  });
});