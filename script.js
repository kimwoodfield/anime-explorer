const search = document.querySelector("#search");
const searchIcon = document.querySelector("#searchIcon");
const cardList = document.querySelector("#cardList");

document.querySelector('#search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let searchInput = search.value;
        cardList.textContent = '';
    
        let results;
    
        fetch('https://kitsu.io/api/edge/anime?filter[text]=' + search.value)
        .then(response => response.json())
        .then(data => {
            results = data;
            results.data.map(entry => {
    
                // Generate a card
                const card = document.createElement("div");
                card.classList.add("card");
                cardList.appendChild(card);
    
    
                // Organize the left hand container
                // Create a div for left and right side of the cards
                const cardLeft = document.createElement("div");
                cardLeft.classList.add("cardLeft");
                let imageURL = entry.attributes.posterImage.medium;
                cardLeft.style.backgroundImage = "url('" + imageURL + "')";
                card.appendChild(cardLeft);
    
    
                // Create a container that the anime title can sit in over the top of the cardLeft container
                const overlay = document.createElement("div");
                overlay.classList.add("overlay");
                cardLeft.appendChild(overlay);
    
    
                // Create an element for the anime title to sit inside
                const title = document.createElement("p");
                title.classList.add("title");
                title.innerText = entry.attributes.canonicalTitle;
                overlay.appendChild(title);
    
    
                // Create a div that the show status can sit inside
                const statusContainer = document.createElement("div");
                statusContainer.classList.add("statusContainer");
                overlay.appendChild(statusContainer);
    
    
                // Append the actual show status to the statusContainer
                const status = document.createElement("p");
                status.classList.add("status");
                status.innerText = entry.attributes.status;
                if (entry.attributes.status == "current") {
                    status.style.color = "#A9D78C";
                } else if (entry.attributes.status == "finished") {
                    status.style.color = "#6BC8A3";
                } else if (entry.attributes.status == "upcoming") {
                    status.style.color = "#FFB246";
                } else if (entry.attributes.status == "tba") {
                    status.style.color = "#FF8B60";
                    status.style.textTransform = "uppercase";
                } else if (entry.attributes.status == "unreleased") {
                    status.style.color = "#FFD84C";
                }
                statusContainer.appendChild(status);
    
    
                // Organize the right hand side of the card
                const cardRight = document.createElement("div");
                cardRight.classList.add("cardRight");
                card.appendChild(cardRight);
    
    
                // Create a body container for the right hand side of the card
                const cardRightBody = document.createElement("div");
                cardRightBody.classList.add("cardRightBody");
                cardRight.appendChild(cardRightBody);
    
    
                // create three div containers for the top of the right hand side before the description
    
                // create a container that lists total amount of episodes per show
                const episodes = document.createElement("div");
                episodes.classList.add("episodes");
                if (entry.attributes.episodeCount == null) {
                    episodes.innerText = 'Unfinalized ep count.';
                }
                else if (entry.attributes.episodeCount < 2) {
                    episodes.innerText = entry.attributes.episodeCount + ' ep';
                } else if (entry.attributes.episodeCount >= 2) {
                    episodes.innerText = entry.attributes.episodeCount + ' eps';
                }
                cardRightBody.appendChild(episodes);
    
                // create a container that lists what the average rating of the show is out of ten
                const ranking = document.createElement("div");
                ranking.classList.add("ranking");
                let originalRank = parseInt(entry.attributes.averageRating);
                let averageRating = originalRank/10;
                if (!averageRating) {
                    ranking.innerText = 'Rating coming soon.'
                } else {
                    ranking.innerText = averageRating + ' / 10';
                }
                cardRightBody.appendChild(ranking);
    
    
                // create a container that lists the parental rating of the show
                const ageRatingGuide = document.createElement("div");
                ageRatingGuide.classList.add("ageRating");
                let ageRating = entry.attributes.ageRating;
                let ratingGuide = entry.attributes.ageRatingGuide;
                if (!ageRating) {
                    ageRatingGuide.innerText = "Age rating not available."
                } else {
                    ageRatingGuide.innerText = ageRating + ' • ' + ratingGuide;
                }
                cardRightBody.appendChild(ageRatingGuide);
    
    
                // create a container to store the anime description into
                const description = document.createElement("div");
                description.classList.add("description");
                description.innerText = entry.attributes.synopsis;
                cardRightBody.appendChild(description);
    
                // Create a container for the footer
                const cardRightFooter = document.createElement("div");
                cardRightFooter.classList.add("cardRightFooter");
                cardRight.appendChild(cardRightFooter);
    
                const genres = document.createElement("div");
                genres.classList.add("genres");
                cardRightFooter.appendChild(genres);
    
                const genre = document.createElement("div");
                genre.classList.add("genre");
                genre.innerText = entry.attributes.showType;
                if (entry.attributes.showType === "TV") {
                    genre.style.backgroundColor = "#C6221E";
                    genre.style.color = "white";
                } else if (entry.attributes.showType === "movie") {
                    genre.style.backgroundColor = "#FBBC04";
                    genre.style.color = "#3C4043";
                } else if (entry.attributes.showType === "special") {
                    genre.style.backgroundColor = "#1967D2";
                    genre.style.color = "#DEE1E6";
                } else if (entry.attributes.showType === "music") {
                    genre.style.backgroundColor = "#34A853";
                    genre.style.color = "#DEE1E6";
                } else if (entry.attributes.showType === "ONA") {
                    genre.style.backgroundColor = "#4285F4";
                    genre.style.color = "#DEE1E6";
                } else if (entry.attributes.showType === "OVA") {
                    genre.style.backgroundColor = " #188038";
                    genre.style.color = "#DEE1E6";
                }
                genres.appendChild(genre);
            })
        })
    }
});


searchIcon.addEventListener("click", function() {
    let searchInput = search.value;
    cardList.textContent = '';

    let results;

    fetch('https://kitsu.io/api/edge/anime?filter[text]=' + search.value)
    .then(response => response.json())
    .then(data => {
        results = data;
        results.data.map(entry => {

            // Generate a card
            const card = document.createElement("div");
            card.classList.add("card");
            cardList.appendChild(card);


            // Organize the left hand container
            // Create a div for left and right side of the cards
            const cardLeft = document.createElement("div");
            cardLeft.classList.add("cardLeft");
            let imageURL = entry.attributes.posterImage.medium;
            cardLeft.style.backgroundImage = "url('" + imageURL + "')";
            card.appendChild(cardLeft);


            // Create a container that the anime title can sit in over the top of the cardLeft container
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");
            cardLeft.appendChild(overlay);


            // Create an element for the anime title to sit inside
            const title = document.createElement("p");
            title.classList.add("title");
            title.innerText = entry.attributes.canonicalTitle;
            overlay.appendChild(title);


            // Create a div that the show status can sit inside
            const statusContainer = document.createElement("div");
            statusContainer.classList.add("statusContainer");
            overlay.appendChild(statusContainer);


            // Append the actual show status to the statusContainer
            const status = document.createElement("p");
            status.classList.add("status");
            status.innerText = entry.attributes.status;
            if (entry.attributes.status == "current") {
                status.style.color = "#A9D78C";
            } else if (entry.attributes.status == "finished") {
                status.style.color = "#6BC8A3";
            } else if (entry.attributes.status == "upcoming") {
                status.style.color = "#FFB246";
            } else if (entry.attributes.status == "tba") {
                status.style.color = "#FF8B60";
                status.style.textTransform = "uppercase";
            } else if (entry.attributes.status == "unreleased") {
                status.style.color = "#FFD84C";
            }
            statusContainer.appendChild(status);


            // Organize the right hand side of the card
            const cardRight = document.createElement("div");
            cardRight.classList.add("cardRight");
            card.appendChild(cardRight);


            // Create a body container for the right hand side of the card
            const cardRightBody = document.createElement("div");
            cardRightBody.classList.add("cardRightBody");
            cardRight.appendChild(cardRightBody);


            // create three div containers for the top of the right hand side before the description

            // create a container that lists total amount of episodes per show
            const episodes = document.createElement("div");
            episodes.classList.add("episodes");
            if (entry.attributes.episodeCount == null) {
                episodes.innerText = 'Unfinalized ep count.';
            }
            else if (entry.attributes.episodeCount < 2) {
                episodes.innerText = entry.attributes.episodeCount + ' ep';
            } else if (entry.attributes.episodeCount >= 2) {
                episodes.innerText = entry.attributes.episodeCount + ' eps';
            }
            cardRightBody.appendChild(episodes);

            // create a container that lists what the average rating of the show is out of ten
            const ranking = document.createElement("div");
            ranking.classList.add("ranking");
            let originalRank = parseInt(entry.attributes.averageRating);
            let averageRating = originalRank/10;
            if (!averageRating) {
                ranking.innerText = 'Rating coming soon.'
            } else {
                ranking.innerText = averageRating + ' / 10';
            }
            cardRightBody.appendChild(ranking);


            // create a container that lists the parental rating of the show
            const ageRatingGuide = document.createElement("div");
            ageRatingGuide.classList.add("ageRating");
            let ageRating = entry.attributes.ageRating;
            let ratingGuide = entry.attributes.ageRatingGuide;
            if (!ageRating) {
                ageRatingGuide.innerText = "Age rating not available."
            } else {
                ageRatingGuide.innerText = ageRating + ' • ' + ratingGuide;
            }
            cardRightBody.appendChild(ageRatingGuide);


            // create a container to store the anime description into
            const description = document.createElement("div");
            description.classList.add("description");
            description.innerText = entry.attributes.synopsis;
            cardRightBody.appendChild(description);

            // Create a container for the footer
            const cardRightFooter = document.createElement("div");
            cardRightFooter.classList.add("cardRightFooter");
            cardRight.appendChild(cardRightFooter);

            const genres = document.createElement("div");
            genres.classList.add("genres");
            cardRightFooter.appendChild(genres);

            const genre = document.createElement("div");
            genre.classList.add("genre");
            genre.innerText = entry.attributes.showType;
            if (entry.attributes.showType === "TV") {
                genre.style.backgroundColor = "#C6221E";
                genre.style.color = "white";
            } else if (entry.attributes.showType === "movie") {
                genre.style.backgroundColor = "#FBBC04";
                genre.style.color = "#3C4043";
            } else if (entry.attributes.showType === "special") {
                genre.style.backgroundColor = "#1967D2";
                genre.style.color = "#DEE1E6";
            } else if (entry.attributes.showType === "music") {
                genre.style.backgroundColor = "#34A853";
                genre.style.color = "#DEE1E6";
            } else if (entry.attributes.showType === "ONA") {
                genre.style.backgroundColor = "#4285F4";
                genre.style.color = "#DEE1E6";
            } else if (entry.attributes.showType === "OVA") {
                genre.style.backgroundColor = " #188038";
                genre.style.color = "#DEE1E6";
            }
            genres.appendChild(genre);
        })
    })
});