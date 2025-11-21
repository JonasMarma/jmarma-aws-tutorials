// Get DOM elements
const catImage = document.getElementById('cat-image');
const newCatBtn = document.getElementById('new-cat-btn');
const loading = document.getElementById('loading');
const catContainer = document.getElementById('cat-container');

// Function to fetch and display a random cat
async function getRandomCat() {
    try {
        // Show loading spinner
        loading.classList.remove('d-none');
        catImage.style.display = 'none';
        
        // Disable button during loading
        newCatBtn.disabled = true;
        newCatBtn.textContent = 'Loading...';
        
        // Fetch random cat image from cataas.com
        const timestamp = new Date().getTime(); // Add timestamp to prevent caching
        const imageUrl = `https://cataas.com/cat?t=${timestamp}`;
        
        // Create a new image element to preload
        const img = new Image();
        
        img.onload = function() {
            // Hide loading spinner
            loading.classList.add('d-none');
            
            // Set the image source and show it
            catImage.src = imageUrl;
            catImage.style.display = 'block';
            catImage.style.opacity = '0';
            
            // Fade in animation
            setTimeout(() => {
                catImage.style.opacity = '1';
            }, 10);
            
            // Re-enable button
            newCatBtn.disabled = false;
            newCatBtn.textContent = 'Get New Cat 🐾';
        };
        
        img.onerror = function() {
            // Handle error
            loading.classList.add('d-none');
            catContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <strong>Oops!</strong> Failed to load cat image. Please try again.
                </div>
            `;
            
            // Re-enable button
            newCatBtn.disabled = false;
            newCatBtn.textContent = 'Get New Cat 🐾';
        };
        
        // Start loading the image
        img.src = imageUrl;
        
    } catch (error) {
        console.error('Error fetching cat:', error);
        loading.classList.add('d-none');
        catContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <strong>Error!</strong> ${error.message}
            </div>
        `;
        
        // Re-enable button
        newCatBtn.disabled = false;
        newCatBtn.textContent = 'Get New Cat 🐾';
    }
}

// Event listener for the button
newCatBtn.addEventListener('click', getRandomCat);

// Load a cat when the page loads
window.addEventListener('load', getRandomCat);

