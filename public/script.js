// =======================
// SUBSTACK ARTICLES
// =======================

async function loadSubstack() {
  const container = document.getElementById("substack-posts");

  if (!container) return;

  try {
    const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://koyokk.substack.com/feed");
    const data = await res.json();

    if (!data.items) throw new Error("No data");

    let html = "";

    data.items.forEach(post => {
      html += `
        <div class="card horizontal">
          <img src="${post.thumbnail || '/images/article1.jpg'}" alt="">
          <div class="card-content">
            <h3>${post.title}</h3>
            <p>${stripHTML(post.description).substring(0, 120)}...</p>
            <a href="${post.link}" target="_blank">Read →</a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (error) {
    console.error("Substack error:", error);

    container.innerHTML = `
      <p>⚠️ Unable to load articles.</p>
      <a href="https://koyokk.substack.com" target="_blank">
        View all on Substack →
      </a>
    `;
  }
}

// =======================
// CUSTOM ARTICLES (JSON)
// =======================

async function loadCustomArticles() {
  const container = document.getElementById("custom-articles");

  if (!container) return;

  try {
    const res = await fetch("/articles.json"); // FIXED PATH for Render
    const data = await res.json();

    let html = "";

    data.forEach(article => {
      html += `
        <div class="card horizontal">
          <img src="${article.image.startsWith('http') ? article.image : '/images/' + article.image}" alt="">
          <div class="card-content">
            <h3>${article.title}</h3>
            <p>${article.preview}</p>
            <a href="${article.link}" target="_blank">Read →</a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (error) {
    console.error("Custom articles error:", error);
    container.innerHTML = "<p>Failed to load articles.</p>";
  }
}

// =======================
// UTIL
// =======================

function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// =======================
// ANIMATIONS (FADE IN)
// =======================

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".section").forEach(section => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// =======================
// INIT
// =======================

loadSubstack();
loadCustomArticles();

// =======================
// CONTACT (FRONTEND)
// =======================

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Message sent! (Connect EmailJS for real emails)");

    form.reset();
  });
}