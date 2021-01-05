import "../style/style.scss";
import '@fortawesome/fontawesome-free/js/all.min';

// Unsplash API
const count = 10;
const collectionId = 190728;
const apiKey = "U1S2KhTzek0Eb5UBFbP9HVnY7UnFfq7j-7eCC3101W8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collection=${collectionId}`;

// Fetch Data From API

const fetchPictures = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// On Load
// fetchPictures();
