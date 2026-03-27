const grid = document.getElementById("grid");

async function loadProjects() {
  const res = await fetch("/api/projects");
  const data = await res.json();

  grid.innerHTML = "";

  data.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        ${p.image ? `<img src="${p.image}">` : ""}
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">View</a>
      </div>
    `;
  });
}

loadProjects();

/* Contact */
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