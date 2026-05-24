async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageEl = document.getElementById("message");
  const button = document.getElementById("loginBtn");

  if (!email || !password) {
    messageEl.style.color = "red";
    messageEl.innerText = "Please fill in all fields.";
    return;
  }

  button.disabled = true;
  messageEl.style.color = "blue";
  messageEl.innerText = "Logging in...";

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      messageEl.style.color = "red";
      messageEl.innerText = data.message || "Invalid credentials.";
      button.disabled = false;
    }
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.innerText = "Network error. Please try again.";
    button.disabled = false;
  }
}
