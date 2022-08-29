const ramensURL = "http://localhost:3000/ramens";

const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetails = document.querySelector("#ramen-detail");
const ramenImages = document.querySelector(".detail-image");
const names = document.querySelector(".name");
const restaurants = document.querySelector(".restaurant");
const ratings = document.querySelector("#rating-display");
const comments = document.querySelector("#comment-display");

//Ramen API
fetch(ramensURL)
  .then((response) => response.json())
  .then(renderRamenImages);

function renderRamenImages(data) {
  data.forEach(addRamenImage);
}

//Adding a Ramen Image
function addRamenImage(ramen) {
  const ramenImage = document.createElement("img");
  ramenImage.src = ramen.image;
  ramenMenu.appendChild(ramenImage);

  //Create button Event
  ramenImage.addEventListener("click", () => {
    renderRamenDetails(ramen);
  });
}

//Rendering Ramen Details
function renderRamenDetails(ramens) {
  ramenImages.src = ramens.image;
  restaurants.textContent = ramens.restaurant;
  names.textContent = ramens.name;
  ratings.textContent = ramens.rating;
  comments.textContent = ramens.comment;
}
// Capturing Ramens Via the Form
document.getElementById('new-ramen').addEventListener('submit', addFormDetails)

function addFormDetails(event) {
    event.preventDefault();
   
    const newMenuDetails = {
      name: event.target["new-name"].value,
      restaurant: event.target["new-restaurant"].value,
      image: event.target["new-image"].value,
      rating: event.target["new-rating"].value,
      comment: event.target["new-comment"].value
  }
   addRamens(newMenuDetails)
   addRamenImage(newMenuDetails)
   event.target.reset()
        
}
// Adding New ramens via the Submit form
const addRamens = (newMenuDetails) => {
  fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
           Accept: "application/json"
      },
      body: JSON.stringify(newMenuDetails)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error.message))
     
}
init()