import axios from "axios";

const API_URL = "http://localhost:3000/posts";
const form = document.getElementById("postForm");
const container = document.getElementById("postsContainer");

let editingPostId = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = form.title.value.trim();
  const content = form.content.value.trim();

  if (!title || !content) return;

  try {
    if (editingPostId) {
      await axios.put(`${API_URL}/${editingPostId}`, { title, content });
      editingPostId = null;
    } else {
      await axios.post(API_URL, { title, content });
    }

    form.reset();
    loadPosts();
  } catch (err) {
    console.error("Помилка при збереженні поста:", err);
  }
});

async function loadPosts() {
  try {
    const res = await axios.get(API_URL);
    container.innerHTML = "";

    res.data.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button class="edit-btn" data-id="${post.id}">Редагувати</button>
      `;

      postEl.querySelector(".edit-btn").addEventListener("click", () => {
        form.title.value = post.title;
        form.content.value = post.content;
        editingPostId = post.id;
        form.querySelector("button").textContent = "Оновити пост";
      });

      container.appendChild(postEl);
    });

    form.querySelector("button").textContent = editingPostId ? "Оновити пост" : "Додати пост";
  } catch (err) {
    console.error("Помилка при завантаженні постів:", err);
  }
}

loadPosts();
