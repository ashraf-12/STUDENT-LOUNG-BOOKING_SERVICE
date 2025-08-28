document.getElementById("bookingForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const fromDate = new Date(document.getElementById("from").value);
  const now = new Date();
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
  } catch {
    showMessage("❌ Network error. Please try again later.", "error");
  }
});

function showMessage(text, type) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.className = type;
  msg.style.display = "block";
}
