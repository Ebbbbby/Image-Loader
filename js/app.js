

const accessKey = "-GppcampSPHuj-CIIlzb_gm9mf8xfjq2cSA-5jbNb0Y";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;


const searchImagges = async () => {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=-GppcampSPHuj-CIIlzb_gm9mf8xfjq2cSA-5jbNb0Y`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || !Array.isArray(data.results)) {
            console.error('Invalid response format:', data);
            return;
        }

        const results = data.results;

        if (page === 1) {
            // Clear existing content if needed
            searchResult.innerHTML = "";
        }

        results.forEach((result) => {
            if (result && result.urls && result.urls.small && result.alt_description) {
                const imageWrapper = document.createElement("div");
                imageWrapper.classList.add("search-result");

                const image = document.createElement("img");
                image.src = result.urls.small;
                image.alt = result.alt_description;

                const imageLink = document.createElement("a");
                if (result.links && result.links.html) {
                    imageLink.href = result.links.html;
                    imageLink.target = "_blank";
                    imageLink.textContent = result.alt_description;
                }

                imageWrapper.appendChild(image);
                imageWrapper.appendChild(imageLink);
                searchResult.appendChild(imageWrapper);
            }
        });

        page++;

        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImagges();
});
showMore.addEventListener("click", () => {
    searchImagges();
});
