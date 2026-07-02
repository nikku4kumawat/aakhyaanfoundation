const donorGrid = document.getElementById("donorGrid");
const donorSearchInput = document.getElementById("donorSearchInput");
const donorEmpty = document.getElementById("donorEmpty");

let allDonors = [];

function getDonorPhotoUrl(photo) {
  if (!photo) return "../img/no-image.png";

  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    return photo;
  }

  return `${BASE_URL}${photo}`;
}

async function fetchDonors() {
  try {
    donorGrid.innerHTML = "";

    const res = await fetch(API_PATHS.DONORS);
    const data = await res.json();

    if (!res.ok) {
      console.error("Donors fetch failed:", data);
      showEmpty("No donors found", data.message || "Unable to fetch donor data.");
      return;
    }

    allDonors = Array.isArray(data) ? data : [];
    renderDonors(allDonors);

  } catch (error) {
    console.error("Donors fetch error:", error);
    showEmpty("Server Error", "Unable to load donors right now.");
  }
}

function renderDonors(donors) {
  donorGrid.innerHTML = "";

  if (!donors || donors.length === 0) {
    showEmpty("No donors found", "No matching donor data is available.");
    return;
  }

  donorEmpty.classList.remove("show");

  donors.forEach((donor) => {
    const card = document.createElement("div");
    card.className = "public-donor-card";

    const photoUrl = getDonorPhotoUrl(donor.photo);

    card.innerHTML = `
      <div class="public-donor-image">
        <img src="${photoUrl}" alt="${donor.name || "Donor"}">
      </div>

      <div class="public-donor-info">
        <h3>${donor.name || "Unknown Donor"}</h3>

        <div class="public-donor-row">
          <span>Amount</span>
          <span>${donor.amount || "N/A"}</span>
        </div>

        <div class="public-donor-row">
          <span>Mobile No.</span>
          <span>${donor.mobile || "N/A"}</span>
        </div>
      </div>
    `;

    donorGrid.appendChild(card);
  });
}

function showEmpty(title, message) {
  donorGrid.innerHTML = "";

  donorEmpty.innerHTML = `
    <i class="fa-regular fa-folder-open"></i>
    <h3>${title}</h3>
    <p>${message}</p>
  `;

  donorEmpty.classList.add("show");
}

donorSearchInput.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase().trim();

  const filteredDonors = allDonors.filter((donor) => {
    const name = String(donor.name || "").toLowerCase();
    const amount = String(donor.amount || "").toLowerCase();
    const mobile = String(donor.mobile || "").toLowerCase();

    return (
      name.includes(searchValue) ||
      amount.includes(searchValue) ||
      mobile.includes(searchValue)
    );
  });

  renderDonors(filteredDonors);
});

fetchDonors();