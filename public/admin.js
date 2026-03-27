let token = "";

async function login() {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      username: user.value,
      password: pass.value
    })
  });

  const data = await res.json();
  token = data.token;
}

document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  await fetch("/api/projects", {
    method: "POST",
    headers: { authorization: token },
    body: formData
  });

  alert("Uploaded!");
};