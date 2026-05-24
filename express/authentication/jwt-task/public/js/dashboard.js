async function loadDashboard() {
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("userEmail").innerText = `Logged in as: ${data.user.email}`;
        } else {
            sessionStorage.removeItem("token");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}

loadDashboard();