import axios from "axios";

const API_URL = "http://localhost:3000/posts";
const form = document.getElementById("postForm");
const container = document.getElementById("postsContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = form.title.value.trim();
  const content = form.content.value.trim();

  if (!title || !content) return;

  try {
    await axios.post(API_URL, { title, content });
    form.reset();
    loadPosts();
  } catch (err) {
    console.error("Помилка при додаванні поста:", err);
  }
});

async function loadPosts() {
  try {
    const res = await axios.get(API_URL);
    container.innerHTML = res.data
      .map(
        (post) => `
        <div class="post">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error("Помилка завантаження постів:", err);
  }
}

loadPosts();
