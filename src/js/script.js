import "../style/style.scss";
import "@fortawesome/fontawesome-free/js/all.min";
import moment from "moment";


const postsContainer = document.getElementById("posts");
const loader = document.getElementById("loader");

let photos = [];

// Unsplash API
const count = 10;
const collectionId = 190728;
const apiKey = "U1S2KhTzek0Eb5UBFbP9HVnY7UnFfq7j-7eCC3101W8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collection=${collectionId}`;

// Create Elements for posts and add them to the DOM 
const displayPosts = (photos) => {
  let postHtml;
  // Run function for each object in photos array
  photos.forEach((photo) => {
    postHtml = `
      <div class="post">
        <!-- Creating a container for the post image -->
        <div class="post__imageContainer" id="post__imageContainer">
          <!-- post image creation date -->
          <p class="post__imageCreationDate">
            ${moment(photo.created_at).format(
              "[Created At] MMMM DD, YYYY"
            )}
          </p>
          <!-- Link to unsplash image -->
          <a href="${photo.links.html}" target="_blank" >
            <img src="${photo.urls.regular}" alt="${photo.alt_description}"  title="${photo.alt_description}" />
          </a>
        </div>
        <!-- creating a container for the post details -->
        <div class="post__details">
          <div class="post__owner">
              <p class="post__ownerName">
                  By:
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
    console.log(photos);
    // Displaying Posts
    displayPosts(photos);
  } catch (error) {
    console.log(error);
  }
};

// On Load
fetchPictures();
