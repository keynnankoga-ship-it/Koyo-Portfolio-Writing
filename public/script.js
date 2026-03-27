// =======================
// SUBSTACK ARTICLES
// =======================

async function loadSubstack() {
  try {
    const rssURL = "https://api.rss2json.com/v1/api.json?rss_url=https://koyokk.substack.com/feed";

    const res = await fetch(rssURL);
    const data = await res.json();

    let html = "";

    data.items.slice(0, 6).forEach(post => {
      html += `
        <div class="card">
          <img src="${post.thumbnail || 'images/article1.jpg'}" alt="">
          <h3>${post.title}</h3>
          <p>${stripHTML(post.description).substring(0, 120)}...</p>
          <a href="${post.link}" target="_blank">Read →</a>
        </div>
      `;
    });

    document.getElementById("substack-posts").innerHTML = html;

  } catch (error) {
    document.getElementById("substack-posts").innerHTML = "<p>Failed to load Substack articles.</p>";
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