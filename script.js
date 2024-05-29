window.onload = function() {
    loadDogPictures();    
};

/**
 * If there are any errors during our AJAX work, display them in the page. 
 */
function showError(message) {
    var err = document.querySelector("#error-msg");
    err.classList.remove("hidden");
    err.innerHTML = message;
}

function updateDogPictures(Picture) {
    var imagesContainer = document.getElementById("images-container");

    imagesContainer.innerHTML = "";
    
    Picture.forEach(function(url) {
        var img = document.createElement("img");
        img.src = url;
        imagesContainer.appendChild(img);
    });
}

/**
 * Parse the response Object, which looks something like this:
 * 
 * {
 *   status: "success",
 *   message: {
 *     "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
 *     "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
 *     ...
 *   }
 * }
 *  
 * The `status` tells us if the server was successful at building
 * the list of dog picture URLs.  The `message` is an Object with all the
 * URLs for the dog images as an Array (we don't have to do anything to it). 
 */

/**
 * Dynamically load a list of image URLs
 */
function loadDogPictures() {
    // See https://dog.ceo/dog-api/documentation/breed
    // Use the imageCount and breed variables to create our URL 
    var url = `https://dog.ceo/api/breeds/image/random/15`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.status !== "success") {
            throw new Error("API response wasn't successful");
        }
        var dogPicturesList = data.message;
        updateDogPictures(dogPicturesList);
    })
    .catch(error => {
        showError("Unable to load dog pictures. " + error.message);
    });
}

// Refresh images every 15 seconds
setInterval(loadDogPictures, 15000);