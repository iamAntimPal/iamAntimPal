// Replace with your actual YouTube API key
    const API_KEY = "YOUR_API_KEY";
    // Array of video IDs to display
    const videoIDs = ["SKgahaGHtlI", "hUe1iD5rpno", "4Bub9PwFRXU", "xL85kMWcbJM"];
    const videosGrid = document.getElementById("videos-grid");

    // Fetch video details from YouTube Data API
    async function fetchVideoDetails(videoID) {
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${API_KEY}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          return data.items[0].snippet;
        } else {
          console.warn(`No details found for video ${videoID}`);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
      return { title: "Video Title" }; // Fallback title
    }

    // Create a video card element with dynamic title
    async function createVideoCard(videoID) {
      const snippet = await fetchVideoDetails(videoID);
      const title = snippet.title || "Video Title";
      const card = document.createElement("div");
      card.classList.add("video-item");
      card.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${videoID}" target="_blank">
          <iframe src="https://www.youtube.com/embed/${videoID}" 
                  title="${title}" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
          <p class="video-title">${title}</p>
        </a>
      `;
      return card;
    }

    // Load video cards dynamically
    async function loadVideos() {
      for (const videoID of videoIDs) {
        const videoCard = await createVideoCard(videoID);
        videosGrid.appendChild(videoCard);
      }
    }

    loadVideos();