document.addEventListener("DOMContentLoaded", function() {
    // Fetch dog details from JSON server
    fetch('http://localhost:3000/dog')
      .then(response => response.json())
      .then(data => {
        const dogSelect = document.getElementById('dogSelect');
        const dogListContainer = document.getElementById('dogList');
  
        // Iterate over each dog in the data and create an option for the select element
        data.dog.forEach(dog => {
          const option = document.createElement('option');
          option.value = dog.id;
          option.textContent = dog.breed;
          dogSelect.appendChild(option);
  
          // Create a list item for each dog with its image
          const listItem = document.createElement('div');
          listItem.classList.add('dog-item');
          listItem.innerHTML = `
            <img src="${dog.image}" alt="${dog.breed}">
            <p>${dog.breed}</p>
            <p>Age: ${dog.age}</p>
          `;
          dogListContainer.appendChild(listItem);
        });
  
        // Display dog image when selecting a dog breed
        dogSelect.addEventListener('change', function() {
          const selectedDogId = parseInt(this.value);
          const selectedDog = data.dogs.find(dog => dog.id === selectedDogId);
          if (selectedDog) {
            const dogImage = document.createElement('img');
            dogImage.src = selectedDog.image;
            dogImage.alt = selectedDog.breed;
            dogImage.classList.add('dog-image');
  
            // Remove previous dog image if exists
            const existingDogImage = document.querySelector('.dog-image');
            if (existingDogImage) {
              existingDogImage.remove();
            }
  
            // Append new dog image to the DOM
            document.getElementById('message').appendChild(dogImage);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching dog details:', error);
      });
  
    // Form submission
    document.getElementById("adoptionForm").addEventListener("submit", function(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
    
      const url = "http://localhost:5000/users"; 
  
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(json => {
        document.getElementById("message").innerText = "Adoption request submitted successfully!";
        form.reset();
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error submitting adoption request.";
      });
    });
  });