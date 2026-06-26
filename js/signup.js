function openSignupPopup() {
  closeAuthPopup();

  const overlay = document.createElement("div");
  overlay.className = "auth-modal-overlay active";
  overlay.id = "authModal";

  overlay.innerHTML = `
    <div class="auth-popup-box">
      <button class="auth-close-btn" onclick="closeAuthPopup()">
        <i class="icon-x"></i>
      </button>

      <div class="auth-header">
        <div class="logo-box">
          <i class="icon-file-text"></i>
        </div>
        <h2>Create Account</h2>
        <p>Create admin account to manage gallery</p>
      </div>

      <form id="popupSignupForm" class="auth-form">
        <div class="form-group">
          <label>Full Name</label>
          <div class="input-box">
            <i class="icon-user"></i>
            <input type="text" id="signupName" placeholder="Enter your full name">
          </div>
          <small id="signupNameError"></small>
        </div>

        <div class="form-group">
          <label>Email</label>
          <div class="input-box">
            <i class="icon-mail"></i>
            <input type="email" id="signupEmail" placeholder="Enter your email">
          </div>
          <small id="signupEmailError"></small>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-box">
            <i class="icon-lock"></i>
            <input type="password" id="signupPassword" placeholder="Create password">
            <button type="button" class="eye-btn" id="signupTogglePassword">
              <i class="icon-eye"></i>
            </button>
          </div>
          <small id="signupPasswordError"></small>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <div class="input-box">
            <i class="icon-lock"></i>
            <input type="password" id="signupConfirmPassword" placeholder="Confirm password">
            <button type="button" class="eye-btn" id="signupToggleConfirmPassword">
              <i class="icon-eye"></i>
            </button>
          </div>
          <small id="signupConfirmPasswordError"></small>
        </div>

        <p class="terms">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        <div id="signupMessage" class="auth-message"></div>

        <button type="submit" class="auth-submit-btn" id="popupSignupBtn">
          Create Account
        </button>
      </form>

      <div class="auth-switch-text">
        Already have an account?
        <button type="button" onclick="openLoginPopup()">Sign in</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const form = document.getElementById("popupSignupForm");
  const name = document.getElementById("signupName");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("signupConfirmPassword");

  const nameError = document.getElementById("signupNameError");
  const emailError = document.getElementById("signupEmailError");
  const passwordError = document.getElementById("signupPasswordError");
  const confirmPasswordError = document.getElementById("signupConfirmPasswordError");

  const message = document.getElementById("signupMessage");
  const btn = document.getElementById("popupSignupBtn");

  document.getElementById("signupTogglePassword").addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
  });

  document.getElementById("signupToggleConfirmPassword").addEventListener("click", () => {
    confirmPassword.type =
      confirmPassword.type === "password" ? "text" : "password";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    message.className = "auth-message";
    message.textContent = "";

    let isValid = true;

    if (!name.value.trim()) {
      nameError.textContent = "Name is required";
      name.classList.add("error");
      isValid = false;
    } else {
      name.classList.remove("error");
    }

    if (!email.value.trim()) {
      emailError.textContent = "Email is required";
      email.classList.add("error");
      isValid = false;
    } else {
      email.classList.remove("error");
    }

    if (!password.value.trim()) {
      passwordError.textContent = "Password is required";
      password.classList.add("error");
      isValid = false;
    } else if (password.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      password.classList.add("error");
      isValid = false;
    } else {
      password.classList.remove("error");
    }

    if (!confirmPassword.value.trim()) {
      confirmPasswordError.textContent = "Please confirm your password";
      confirmPassword.classList.add("error");
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      confirmPasswordError.textContent = "Passwords do not match";
      confirmPassword.classList.add("error");
      isValid = false;
    } else {
      confirmPassword.classList.remove("error");
    }

    if (!isValid) return;

    btn.disabled = true;
    btn.textContent = "Creating account...";

    try {
      const res = await fetch(API_PATHS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          password: password.value
        })
      });

      const data = await res.json();

      if (!res.ok) {
        message.className = "auth-message error-msg";
        message.textContent = data.message || "Registration failed";
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      message.className = "auth-message success-msg";
      message.textContent = "Account created successfully";

      setTimeout(() => {
        closeAuthPopup();
      }, 800);

    } catch (error) {
      message.className = "auth-message error-msg";
      message.textContent = "Server error. Please try again.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Create Account";
    }
  });
}