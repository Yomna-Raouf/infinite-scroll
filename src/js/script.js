import "../style/style.scss";
import "@fortawesome/fontawesome-free/js/all.min";
import moment from "moment";


const postsContainer = document.getElementById("posts");
const loader = document.getElementById("loader");

let ready = false;
let loadedPhotos = 0; 
let totalPhotos = 0;
let photos = [];

// Unsplash API
const count = 30;
const collectionId = 190728;
const apiKey = "API_KEY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collection=${collectionId}`;

// Checking if all photos were loaded
const isPhotoLoaded = () => {
  loadedPhotos++;
  if(loadedPhotos === totalPhotos) {
    ready = true;
    loader.hidden = true;
  }
}; 


// Create Elements for posts and add them to the DOM 
const displayPosts = (photos) => {
  loadedPhotos = 0;
  totalPhotos = photos.length;
  let postHtml;
  // Run function for each object in photos array
  photos.forEach((photo) => {
    postHtml = `
      <div class="post">
        <!-- Creating a container for the post image -->
        <div class="post__imageContainer" id="post__imageContainer">
          <!-- post image creation date -->
          <p class="post__imageCreationDate">
            ${moment(photo.created_at).format("[Created At] MMMM DD, YYYY")}
          </p>
          <!-- Link to unsplash image -->
          <a href="${photo.links.html}" target="_blank" >
            <!-- Adding event Listener to check when each photo is loaded  -->
            <img 
              src="${photo.urls.regular}" 
              alt="${photo.alt_description}"  
              title="${photo.alt_description}"  
             onload="${isPhotoLoaded()}" 
            />
          </a>
        </div>
        <!-- creating a container for the post details -->
        <div class="post__details">
          <div class="post__owner">
              <p class="post__ownerName">
                  By
                  <a href="${photo.user.links.html}" target="_blank" >
                    ${photo.user.name}
                  </a>
              </p>
          </div>
          <div class="post__likes">
            <i class="fab fa-gratipay"></i>
              ${photo.likes}
          </div>
        </div>
      </div>
    `;
    // Appending Posts to PostsContainer Element
    postsContainer.innerHTML += postHtml;
  });
};

// Fetch Data From API

const fetchPictures = async () => {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    // Displaying Posts
    displayPosts(photos);
  } catch (error) {
    alert("Ooops! an error ocuured while trying to get your posts")
  }
};

// Checking if Scrolling near the bottom of the page, & Load more posts
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && ready ){
    ready = false;
    fetchPictures();
  }
});

// On Load
fetchPictures();