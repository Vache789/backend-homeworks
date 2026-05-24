async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageEl = document.getElementById("message");
  const button = document.getElementById("registerBtn");

  if (!email || !password) {
    messageEl.style.color = "red";
    messageEl.innerText = "Please fill in all fields.";
    return;
  }

  button.disabled = true;
  messageEl.style.color = "blue";
  messageEl.innerText = "Registering...";

  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.style.color = "green";
      messageEl.innerText = "Registration successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      messageEl.style.color = "red";
      messageEl.innerText = data.message || "Registration failed.";
      button.disabled = false;
    }
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.innerText = "Network error. Please try again.";
    button.disabled = false;
  }
}
