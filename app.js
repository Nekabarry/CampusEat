//about use review slider
let reviews = document.querySelectorAll('.review-wrapper');

let currentReviews = [0, 2];

let updateReviewSlider = (cards) => {

    cards.forEach((card_index) => {
        reviews[card_index].classList.add('active');     
    })
}

setInterval(() =>{
    currentReviews.forEach((card_index, i) => {
        reviews[card_index].classList.remove('active');   

        currentReviews[i] = card_index >= reviews.length - 1 ? 0: card_index + 1;
    })
    setTimeout(() =>{
        updateReviewSlider(currentReviews)

    },250)

} ,5000)

updateReviewSlider(currentReviews)

//faq
let faqs = [...document.querySelectorAll('.faq')];

faqs.map(faq => { 
    let ques = faq.querySelector('.question-box');

    ques.addEventListener('click',() => {
        faq.classList.toggle('active');
    })

})


// map
var map;
var markers = [];

function initMap() {
  // Initialize map centered at Uttar Pradesh, India
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.2209, lng: 33.4166}, // Centered at Uttar Pradesh, India
    zoom: 7 // Zoom level
  });

  // Create a search box and link it to the UI element.
  var input = document.getElementById('searchInput');
  var searchBox = new google.maps.places.SearchBox(input);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Event listener for the search button
  document.getElementById('searchButton').addEventListener('click', function() {
    searchForLocation(searchBox);
  });

  // Event listener for the button to change marker colors
  document.getElementById('changeColorBtn').addEventListener('click', changeMarkerColors);
}

// Function to add a marker with default color
function addMarker(location, color) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 10
    }
  });
  markers.push(marker);
}

// Function to generate a random color between red and blue
function getRandomColor() {
  var colors = ['#4285F4', '#DB4437']; // Blue and Red
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to change the color of markers randomly
function changeMarkerColors() {
  markers.forEach(function(marker) {
    marker.setIcon({
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: getRandomColor(),
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 10
    });
  });
}

// Function to search for a location using the search box
function searchForLocation(searchBox) {
var places = searchBox.getPlaces();

if (places.length == 0) {
return;
}

// Clear out the old markers.
markers.forEach(function(marker) {
marker.setMap(null);
});
markers = [];

// For each place, add a marker and center it on the map
var bounds = new google.maps.LatLngBounds();
places.forEach(function(place) {
if (!place.geometry) {
  console.log("Returned place contains no geometry");
  return;
}

// Add marker for searched location
addMarker(place.geometry.location, '#FFD700'); // Add marker for searched location (color: gold)
bounds.extend(place.geometry.location);

// Move map focus to marker point
map.setCenter(place.geometry.location);

// Add 3-5 markers around the searched location within a 10km radius
var center = place.geometry.location;
for (var i = 0; i < Math.floor(Math.random() * 3) + 3; i++) { // Randomly between 3 to 5 markers
  var randomLatLng = google.maps.geometry.spherical.computeOffset(center, Math.random() * 10000, Math.random() * 360);
  addMarker(randomLatLng, getRandomColor()); // Add random color markers around the searched location
}
});

// Fit the map to the bounds of the searched locations
map.fitBounds(bounds);

document.getElementById('map').scrollIntoView({ behavior: 'smooth' });

}

// Function to update the basket display
function updateBasketDisplay() {
  // Clear the previous content of the basket display
  basketItemsContainer.innerHTML = '';

  // Initialize total price
  let totalPrice = 0;

  // Loop through each selected item
  basketItemsContainer.querySelectorAll('li').forEach(item => {
      // Extract item name and price from the text content
      const itemDetails = item.textContent.split(' - $');
      const itemName = itemDetails[0];
      const itemPrice = parseFloat(itemDetails[1]);

      // Add the item price to the total price
      totalPrice += itemPrice;

      // Append the item to the basket display
      basketItemsContainer.appendChild(item.cloneNode(true));
  });

  // Display the total price
  const totalPriceElement = document.createElement('li');
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  basketItemsContainer.appendChild(totalPriceElement);
}

// Select the basket link
const basketLink = document.querySelector('.cart');

// Add event listener to the basket link
basketLink.addEventListener('click', updateBasketDisplay);
