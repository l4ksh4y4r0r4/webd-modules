document.getElementById('github-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    let usernameInput = document.getElementById('username');
    let username = usernameInput.value;
    let resultDiv = document.getElementById('result');

    console.log("Fetching GitHub data for:", username);

    try {
        let response = await fetch("https://api.github.com/users/" + username);
        
        if (response.ok === false) {
            throw new Error("User not found or network issue");
        }

        let responseData = await response.json();

        let profilePic = document.createElement('img');
        profilePic.src = responseData.avatar_url;
        profilePic.alt = "Profile Picture";

        let namePara = document.createElement('p');
        namePara.innerHTML = "<strong>Name:</strong> " + (responseData.name ? responseData.name : "Not available");

        let bioPara = document.createElement('p');
        bioPara.innerHTML = "<strong>Bio:</strong> " + (responseData.bio ? responseData.bio : "Not available");

        let reposPara = document.createElement('p');
        reposPara.innerHTML = "<strong>Public Repositories:</strong> " + responseData.public_repos;

        let followersPara = document.createElement('p');
        followersPara.innerHTML = "<strong>Followers:</strong> " + responseData.followers;

        let followingPara = document.createElement('p');
        followingPara.innerHTML = "<strong>Following:</strong> " + responseData.following;

        resultDiv.innerHTML = "";
        resultDiv.appendChild(profilePic);
        resultDiv.appendChild(namePara);
        resultDiv.appendChild(bioPara);
        resultDiv.appendChild(reposPara);
        resultDiv.appendChild(followersPara);
        resultDiv.appendChild(followingPara);

    } catch (error) {
        console.log("Error fetching data:", error);
        resultDiv.innerHTML = "<p style='color: red;'>Error: " + error.message + "</p>";
    }
});
