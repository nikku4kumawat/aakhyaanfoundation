//contact

document.addEventListener("DOMContentLoaded", function () {

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {

      e.preventDefault();

      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let service = document.getElementById("services").value;
      let phone = document.getElementById("phone").value;
      let message = document.getElementById("message").value;

      let text =
`*New Contact Request*

👤 Name: ${name}
📧 Email: ${email}
🛠 Service: ${service}
📱 Phone: ${phone}

📝 Requirements:
${message}`;

      let whatsappNumber = "919001123836";

      let url =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

      window.open(url, "_blank");
    });

});