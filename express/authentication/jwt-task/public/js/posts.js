async function loadPosts() {
  const token = sessionStorage.getItem("token");
  const button = document.getElementById("loadPostsBtn");
  const messageEl = document.getElementById("message");

  button.disabled = true;

  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      const postsDiv = document.getElementById("posts");
      postsDiv.innerHTML = "";
      messageEl.innerText = "";

      data.posts.forEach((post) => {
        postsDiv.innerHTML += `
                    <div class="post">
                        <strong>${post.title}</strong>
                    </div>
                `;
      });
    } else {
      messageEl.innerText = data.message || "Failed to load posts.";
    }
  } catch (error) {
    messageEl.innerText = "Error loading posts.";
  } finally {
    button.disabled = false;
  }
}
