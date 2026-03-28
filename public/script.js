// =======================
// SUBSTACK ARTICLES
// =======================

async function loadSubstack() {
  const container = document.getElementById("substack-posts");

  try {
    const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://koyokk.substack.com/feed");
    const data = await res.json();

    if (!data.items) throw new Error("No data");

    let html = "";

    data.items.forEach(post => {
      html += `
        <div class="card">
          <img src="${post.thumbnail || 'images/article1.jpg'}" alt="">
          <h3>${post.title}</h3>
          <p>${stripHTML(post.description).substring(0, 120)}...</p>
          <a href="${post.link}" target="_blank">Read →</a>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (error) {
    console.error("Substack error:", error);

    container.innerHTML = `
      <p>⚠️ Unable to load articles.</p>
      <a href="https://koyokk.substack.com" target="_blank">
        View on Substack →
      </a>
    `;
  }
}

// =======================
// CUSTOM ARTICLES (JSON)
// =======================

async function loadCustomArticles() {
  try {
    const res = await fetch("articles.json");
    const data = await res.json();

    let html = "";

    data.forEach(article => {
      html += `
        <div class="card">
          <img src="${article.image}" alt="">
          <h3>${article.title}</h3>
          <p>${article.preview}</p>
          <a href="${article.link}" target="_blank">Read →</a>
        </div>
      `;
    });

    document.getElementById("custom-articles").innerHTML = html;

  } catch (error) {
    document.getElementById("custom-articles").innerHTML = "<p>Failed to load articles.</p>";
  }
}


// =======================
// UTIL
// =======================

function stripHTML(html) {
  let div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}


// =======================
// INIT
// =======================

loadSubstack();
loadCustomArticles();


// =======================
// CONTACT (FRONTEND ONLY)
// =======================

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Message sent! (Connect backend later for real emails)");

    form.reset();
  });
}