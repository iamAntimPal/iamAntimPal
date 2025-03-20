// Simple Chat Widget Functionality (Placeholder for ChatGPT integration)
    const chatHeader = document.getElementById("chatHeader");
    const chatWidget = document.getElementById("chatWidget");
    chatHeader.addEventListener("click", () => {
      // Toggle chat widget open/close
      if (chatWidget.style.height === "400px") {
        chatWidget.style.height = "40px";
      } else {
        chatWidget.style.height = "400px";
      }
    });
    
    const chatSend = document.getElementById("chatSend");
    chatSend.addEventListener("click", () => {
      const chatInput = document.getElementById("chatInput");
      const chatBody = document.getElementById("chatBody");
      const message = chatInput.value.trim();
      if (message) {
        // Append user message to chat body (Extend for ChatGPT API integration)
        const userMsg = document.createElement("p");
        userMsg.textContent = "You: " + message;
        chatBody.appendChild(userMsg);
        chatInput.value = "";
        // Simulated response (Replace with ChatGPT API call)
        setTimeout(() => {
          const botMsg = document.createElement("p");
          botMsg.textContent = "Bot: This is a placeholder response.";
          chatBody.appendChild(botMsg);
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
      }
    });
    
    // Automatically open chat widget in minimized mode
    window.addEventListener("load", () => {
      document.getElementById("chatWidget").style.height = "40px";
      document.getElementById("chatWidget").style.display = "flex";
    });

    // Fetch GitHub Profile Data to populate the left sidebar
    document.addEventListener("DOMContentLoaded", async () => {
      const username = "iamAntimPal";
      const apiUrl = `https://api.github.com/users/${username}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById("profileImage").src = data.avatar_url;
        document.getElementById("username").textContent = data.name || username;
        document.getElementById("bio").textContent = data.bio || "No bio available.";
        document.getElementById("followers").textContent = data.followers;
        document.getElementById("following").textContent = data.following;
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    });


    function followGithub() {
    // Note:
    // Directly following a GitHub profile programmatically requires proper OAuth authentication
    // and API integration, which isn't possible with a simple button click.
    // This function opens your GitHub profile so the user can follow you manually.
    window.open("https://github.com/iamAntimPal", "_blank");
  }