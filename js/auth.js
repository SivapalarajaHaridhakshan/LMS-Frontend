
// ========================================
// LEARNHUB - DEMO AUTHENTICATION SYSTEM
// ========================================

// Get saved demo accounts from browser storage
function getUsers() {
    return JSON.parse(localStorage.getItem("learnhubUsers")) || [];
}

// Save demo accounts
function saveUsers(users) {
    localStorage.setItem("learnhubUsers", JSON.stringify(users));
}


// ========================================
// REGISTRATION
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        // Check empty fields
        if (!name || !email || !password || !confirmPassword) {
            showMessage(message, "Please fill in all fields.", "error");
            return;
        }

        // Check password length
        if (password.length < 8) {
            showMessage(message, "Password must contain at least 8 characters.", "error");
            return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            showMessage(message, "Passwords do not match.", "error");
            return;
        }

        // Get existing accounts
        const users = getUsers();

        // Check duplicate email
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            showMessage(message, "This email is already registered. Please log in.", "error");
            return;
        }

        // Create demo account
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);

        // Save account
        saveUsers(users);

        showMessage(message, "Account created successfully! Redirecting to login...", "success");

        registerForm.reset();

        // Go to login page
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}


// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        if (!email || !password) {
            showMessage(message, "Please fill in all fields.", "error");
            return;
        }

        // Get registered accounts
        const users = getUsers();

        // Find matching account
        const user = users.find(
            account => account.email === email && account.password === password
        );

        if (!user) {
            showMessage(message, "Invalid email or password. Please try again.", "error");
            return;
        }

        // Save current login session (demo only)
        sessionStorage.setItem("learnhubCurrentUser", JSON.stringify({
            name: user.name,
            email: user.email
        }));

        showMessage(message, "Login successful! Welcome to LearnHub.", "success");

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    });
}


// ========================================
// MESSAGE FUNCTION
// ========================================

function showMessage(element, text, type) {
    element.textContent = text;

    element.style.color =
        type === "success" ? "#16a34a" : "#dc2626";
}
