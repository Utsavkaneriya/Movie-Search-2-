// Fetch movie data from OMDB API
const apiKey = "b742e76d";

const fetchmovie = async (title) => {
    try {
        const resp = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
        if (!resp.ok) throw new Error("Failed to fetch movie data");
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error(error);
        alert("Error fetching data. Please try again later.");
    }
};

// Search button function
const searchbttitle = async () => {
    const title = document.querySelector("#moviesearch").value.trim();
    if (!title) {
        alert("Please enter a movie title");
        return;
    }

    const data = await fetchmovie(title);
    displayMovies(data);
};

// Display the fetched movie results
function displayMovies(data) {
    const movieResult = document.querySelector("#movieResult");
    movieResult.innerHTML = ""; // Clear previous results

    if (data.Response === "False") {
        movieResult.innerHTML = `<div class='alert alert-danger'>No movies found 😞</div>`;
        return;
    }

    // Loop through the search results and create movie cards
    data.Search.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("col-lg-3", "col-md-4", "col-sm-6");

        movieDiv.innerHTML = `
            <div class="card movie-card">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div class="card-body">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                </div>
            </div>
        `;

        movieResult.appendChild(movieDiv);
    });
}
