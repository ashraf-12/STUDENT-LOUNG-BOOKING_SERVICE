document.getElementById("bookingForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const fromDate = new Date(document.getElementById("from").value);
  const now = new Date();

  // Validation: must be at least 3 hours before booking
  const diffHours = (fromDate - now) / (1000 * 60 * 60);
  if (diffHours < 3) {
    showMessage("⚠️ Booking must be made at least 3 hours in advance!", "error");
    return;
  }

  const formData = {
    name: document.getElementById("name").value,
    matric: document.getElementById("matric").value,
    phone: document.getElementById("phone").value,
    from: document.getElementById("from").value,
    to: document.getElementById("to").value
  };

  try {
    const response = await fetch("https://formspree.io/f/xvgbgenj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      showMessage("✅ Booking submitted successfully!", "success");
      document.getElementById("bookingForm").reset();
    } else {
      showMessage("❌ Error submitting booking. Please try again.", "error");
    }
  } catch (error) {
    showMessage("⚠️ Network error. Please try again later.", "error");
  }
});

function showMessage(message, type) {
  const msgBox = document.getElementById("formMessage");
  msgBox.textContent = message;
  msgBox.className = ""; // reset
  msgBox.classList.add(type, "show");
  msgBox.style.display = "block";
}
