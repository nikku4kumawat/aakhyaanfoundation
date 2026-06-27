const locationInput = document.getElementById("locationInput");
const phoneInput = document.getElementById("phoneInput");
const emailInput = document.getElementById("emailInput");

const locationBtn = document.getElementById("locationBtn");
const phoneBtn = document.getElementById("phoneBtn");
const emailBtn = document.getElementById("emailBtn");

const addEventBtn = document.getElementById("addEventBtn");
const eventList = document.getElementById("eventList");

const headlineMarquee = document.getElementById("headlineMarquee");
const locationMarquee = document.getElementById("locationMarquee");

let eventData = JSON.parse(localStorage.getItem("eventPageData")) || {
  location: "",
  phone: "",
  email: "",
  events: []
};

function isAdminLoggedIn() {
  return !!localStorage.getItem("token");
}

function requireAdmin(callback) {
  if (!isAdminLoggedIn()) {
    if (typeof openLoginPopup === "function") {
      window.afterAuthSuccess = () => {
        callback();
        window.afterAuthSuccess = null;
      };
      openLoginPopup();
    } else {
      alert("Please login first");
    }
    return;
  }

  callback();
}

function saveEventData() {
  localStorage.setItem("eventPageData", JSON.stringify(eventData));
}

function updateButton(button, isSaved) {
  if (isSaved) {
    button.className = "action-btn delete";
    button.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  } else {
    button.className = "action-btn save";
    button.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
  }
}

function renderStaticFields() {
  locationInput.value = eventData.location || "";
  phoneInput.value = eventData.phone || "";
  emailInput.value = eventData.email || "";

  locationInput.disabled = !!eventData.location;
  phoneInput.disabled = !!eventData.phone;
  emailInput.disabled = !!eventData.email;

  updateButton(locationBtn, !!eventData.location);
  updateButton(phoneBtn, !!eventData.phone);
  updateButton(emailBtn, !!eventData.email);
}

function renderMarquee() {
  if (eventData.events.length > 0) {
    headlineMarquee.textContent = eventData.events.map(item => item.text).join("   ✦   ");
  } else {
    headlineMarquee.textContent = "No upcoming event added yet";
  }

  if (eventData.location) {
    locationMarquee.textContent = eventData.location;
  } else {
    locationMarquee.textContent = "Location will appear here";
  }
}

function renderEvents() {
  eventList.innerHTML = "";

  eventData.events.forEach((eventItem, index) => {
    const item = document.createElement("div");
    item.className = "event-item";

    item.innerHTML = `
      <textarea disabled>${eventItem.text}</textarea>
      <button class="action-btn delete" onclick="deleteEvent(${index})">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    eventList.appendChild(item);
  });
}

function addNewEventBox() {
  const item = document.createElement("div");
  item.className = "event-item";

  item.innerHTML = `
    <textarea placeholder="Type upcoming event headline"></textarea>
    <button class="action-btn save">
      <i class="fa-solid fa-floppy-disk"></i>
    </button>
  `;

  const textarea = item.querySelector("textarea");
  const saveBtn = item.querySelector("button");

  saveBtn.addEventListener("click", () => {
    requireAdmin(() => {
      const text = textarea.value.trim();

      if (!text) {
        alert("Please type event headline");
        return;
      }

      eventData.events.push({
        id: Date.now(),
        text: text
      });

      saveEventData();
      renderAll();
    });
  });

  eventList.appendChild(item);
  textarea.focus();
}

function deleteEvent(index) {
  requireAdmin(() => {
    eventData.events.splice(index, 1);
    saveEventData();
    renderAll();
  });
}

locationBtn.addEventListener("click", () => {
  requireAdmin(() => {
    if (eventData.location) {
      eventData.location = "";
    } else {
      const value = locationInput.value.trim();

      if (!value) {
        alert("Please enter event location");
        return;
      }

      eventData.location = value;
    }

    saveEventData();
    renderAll();
  });
});

phoneBtn.addEventListener("click", () => {
  requireAdmin(() => {
    if (eventData.phone) {
      eventData.phone = "";
    } else {
      const value = phoneInput.value.trim();

      if (!value) {
        alert("Please enter phone number");
        return;
      }

      eventData.phone = value;
    }

    saveEventData();
    renderAll();
  });
});

emailBtn.addEventListener("click", () => {
  requireAdmin(() => {
    if (eventData.email) {
      eventData.email = "";
    } else {
      const value = emailInput.value.trim();

      if (!value) {
        alert("Please enter email");
        return;
      }

      eventData.email = value;
    }

    saveEventData();
    renderAll();
  });
});

addEventBtn.addEventListener("click", () => {
  requireAdmin(() => {
    addNewEventBox();
  });
});

function renderAll() {
  renderStaticFields();
  renderEvents();
  renderMarquee();
}

renderAll();