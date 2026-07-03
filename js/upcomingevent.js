const headlineMarquee = document.getElementById("headlineMarquee");
const locationMarquee = document.getElementById("locationMarquee");
const eventLocationText = document.getElementById("eventLocationText");
const publicEventList = document.getElementById("publicEventList");

let eventData = {
  location: "",
  events: [],
};

async function fetchPublicUpcomingEvents() {
  try {
    const res = await fetch(API_PATHS.UPCOMING_EVENT);
    const data = await res.json();

    if (!res.ok) {
      showEmptyData();
      return;
    }

    eventData = data;
    renderPublicData();

  } catch (error) {
    showEmptyData();
  }
}

function renderPublicData() {
  renderMarquee();
  renderLocation();
  renderEvents();
}

function renderMarquee() {
  if (eventData.events && eventData.events.length > 0) {
    headlineMarquee.textContent = eventData.events
      .map(item => item.text)
      .join("   ✦   ");
  } else {
    headlineMarquee.textContent = "No upcoming event added yet";
  }

  locationMarquee.textContent = eventData.location || "Location will appear here";
}

function renderLocation() {
  eventLocationText.textContent = eventData.location || "Location will appear here";
}

function renderEvents() {
  publicEventList.innerHTML = "";

  if (!eventData.events || eventData.events.length === 0) {
    publicEventList.innerHTML = `
      <p class="public-empty-text">No upcoming event added yet.</p>
    `;
    return;
  }

  eventData.events.forEach((eventItem, index) => {
    const card = document.createElement("div");
    card.className = "public-event-item";

    card.innerHTML = `
      <div class="event-number">${String(index + 1).padStart(2, "0")}</div>
      <div class="event-text">
        <h4>${eventItem.text}</h4>
      </div>
    `;

    publicEventList.appendChild(card);
  });
}

function showEmptyData() {
  headlineMarquee.textContent = "No upcoming event added yet";
  locationMarquee.textContent = "Location will appear here";
  eventLocationText.textContent = "Location will appear here";

  publicEventList.innerHTML = `
    <p class="public-empty-text">No upcoming event added yet.</p>
  `;
}

fetchPublicUpcomingEvents();