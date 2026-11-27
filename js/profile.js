
/* =================================
   LEARNHUB - STUDENT PROFILE
================================= */

// =================================
// 1. GET LOGGED-IN STUDENT
// =================================

let currentUser = null;

try {
    currentUser = JSON.parse(
        sessionStorage.getItem("learnhubCurrentUser")
    );
} catch (error) {
    console.error("Invalid student session:", error);
}

if (!currentUser || !currentUser.email) {
    window.location.href = "login.html";
}


// =================================
// 2. GET HTML ELEMENTS
// =================================

const profileForm = document.getElementById("profileForm");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");
const profileRole = document.getElementById("profileRole");

const displayName = document.getElementById("displayName");
const profileAvatar = document.getElementById("profileAvatar");

const profileMessage = document.getElementById("profileMessage");

const logoutBtn = document.getElementById("logoutBtn");
const sidebarLogout = document.getElementById("sidebarLogout");


// =================================
// 3. PROFILE STORAGE
// =================================

const PROFILE_STORAGE_KEY = "learnhubProfiles";

function getAllProfiles() {

    try {
        const savedProfiles = localStorage.getItem(
            PROFILE_STORAGE_KEY
        );

        const profiles = savedProfiles
            ? JSON.parse(savedProfiles)
            : {};

        return profiles && typeof profiles === "object"
            && !Array.isArray(profiles)
            ? profiles
            : {};

    } catch (error) {
        console.error("Unable to load profiles:", error);
        return {};
    }
}


function getStudentProfile() {

    const allProfiles = getAllProfiles();

    return allProfiles[currentUser.email.toLowerCase()] || {
        name: currentUser.name || "",
        phone: ""
    };
}


// =================================
// 4. CREATE AVATAR INITIALS
// =================================

function getInitials(name) {

    if (!name || !name.trim()) {
        return "ST";
    }

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }

    return (
        words[0][0] + words[words.length - 1][0]
    ).toUpperCase();
}


// =================================
// 5. DISPLAY PROFILE INFORMATION
// =================================

function loadProfile() {

    const studentProfile = getStudentProfile();

    const studentName =
        studentProfile.name || currentUser.name || "Student";

    const studentPhone = studentProfile.phone || "";

    // Input values
    profileName.value = studentName;

    profileEmail.value = currentUser.email;

    profilePhone.value = studentPhone;

    profileRole.value = "Student";

    // Profile heading
    displayName.textContent = studentName;

    // Avatar initials
    profileAvatar.textContent = getInitials(studentName);
}


// =================================
// 6. UPDATE PROFILE
// =================================

profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const updatedName = profileName.value.trim();
    const updatedPhone = profilePhone.value.trim();

    // Name validation
    if (updatedName.length < 2) {

        showProfileMessage(
            "Please enter a valid full name.",
            "error"
        );

        profileName.focus();

        return;
    }

    // Phone validation (optional field)
    if (
        updatedPhone &&
        !/^[0-9+\-\s()]{7,20}$/.test(updatedPhone)
    ) {

        showProfileMessage(
            "Please enter a valid phone number.",
            "error"
        );

        profilePhone.focus();

        return;
    }

    // Get existing profiles
    const allProfiles = getAllProfiles();

    const studentEmail = currentUser.email.toLowerCase();

    // Save updated profile
    allProfiles[studentEmail] = {
        name: updatedName,
        phone: updatedPhone
    };

    try {

        localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify(allProfiles)
        );

        // Update current session name
        currentUser.name = updatedName;

        sessionStorage.setItem(
            "learnhubCurrentUser",
            JSON.stringify(currentUser)
        );

        // Update displayed information
        displayName.textContent = updatedName;

        profileAvatar.textContent = getInitials(updatedName);

        showProfileMessage(
            "Your profile has been updated successfully!",
            "success"
        );

    } catch (error) {

        console.error("Unable to save profile:", error);

        showProfileMessage(
            "Unable to save your profile. Please try again.",
            "error"
        );
    }

});


// =================================
// 7. PROFILE MESSAGE
// =================================

function showProfileMessage(message, type) {

    profileMessage.textContent = message;

    profileMessage.className = "message " + type;

    // Clear message after 4 seconds
    setTimeout(function () {

        profileMessage.textContent = "";

        profileMessage.className = "message";

    }, 4000);
}


// =================================
// 8. LOGOUT
// =================================

function logoutStudent() {

    sessionStorage.removeItem("learnhubCurrentUser");

    window.location.href = "login.html";
}


if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutStudent);
}

if (sidebarLogout) {
    sidebarLogout.addEventListener("click", logoutStudent);
}


// =================================
// 9. INITIALIZE PROFILE PAGE
// =================================

if (currentUser && currentUser.email) {
    loadProfile();
}
