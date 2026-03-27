/* LOAD ARTICLES FROM BACKEND */
const articlesGrid = document.getElementById("articlesGrid");

async function loadArticles() {
  try {
    const res = await fetch("/api/articles");
    const data = await res.json();

    articlesGrid.innerHTML = "";

    data.forEach(item => {
      articlesGrid.innerHTML += `
        <a href="${item.link}" class="article-card" target="_blank">
          <div class="icon">📝</div>
          <h3>${item.title}</h3>
          <p>${item.preview.substring(0, 120)}...</p>
        </a>
      `;
    });

  } catch (err) {
    articlesGrid.innerHTML = "<p>Failed to load articles.</p>";
  }
}

loadArticles();

/* CONTACT FORM */
document.getElementById("contactForm").onsubmit = async (e) => {
  e.preventDefault();

  const inputs = e.target.elements;

  await fetch("/api/contact", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      name: inputs[0].value,
      email: inputs[1].value,
      message: inputs[2].value
    })
  });

  alert("Message sent!");
};