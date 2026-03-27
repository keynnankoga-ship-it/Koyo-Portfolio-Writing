const articlesGrid = document.getElementById("articlesGrid");
const featuredContainer = document.getElementById("featuredArticle");

async function loadArticles() {
  try {
    const res = await fetch("/api/articles");
    const data = await res.json();

    const featured = data[0];

    featuredContainer.style.backgroundImage = featured.image 
      ? `url(${featured.image})` 
      : "none";

    featuredContainer.innerHTML = `
      <div class="date">${formatDate(featured.date)}</div>
      <h3>${featured.title}</h3>
      <p>${featured.preview.substring(0, 180)}...</p>
      <a href="${featured.link}" target="_blank">Read Full Article →</a>
    `;

    articlesGrid.innerHTML = "";

    data.slice(1).forEach(item => {
      articlesGrid.innerHTML += `
        <a href="${item.link}" class="article-card" target="_blank">
          <div class="date">${formatDate(item.date)}</div>
          <h3>${item.title}</h3>
          <p>${item.preview.substring(0, 120)}...</p>
        </a>
      `;
    });

  } catch {
    articlesGrid.innerHTML = "<p>Failed to load articles.</p>";
  }
}

function formatDate(date) {
  return new Date(date).toDateString();
}

loadArticles();

/* CONTACT */
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