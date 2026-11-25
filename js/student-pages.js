
// ========================================
// LEARNHUB STUDENT PAGES
// PROFILE + MY COURSES
// ========================================

// Check student login session
const currentUser = JSON.parse(
    sessionStorage.getItem("learnhubCurrentUser") || "null"
);

if (!currentUser) {
    window.location.replace("login.html");
}

// Logout
function logoutStudent() {
    sessionStorage.removeItem("learnhubCurrentUser");
    window.location.href = "login.html";
}

document.getElementById("logoutBtn")?.addEventListener(
    "click", logoutStudent
);

document.getElementById("sidebarLogout")?.addEventListener(
    "click", logoutStudent
);


// ========================================
// STUDENT PROFILE
// ========================================

const profileForm = document.getElementById("profileForm");

if (profileForm && currentUser) {

    const savedProfiles = JSON.parse(
        localStorage.getItem("learnhubProfiles") || "{}"
    );

    const savedProfile = savedProfiles[currentUser.email] || {};

    const nameInput = document.getElementById("profileName");
    const emailInput = document.getElementById("profileEmail");
    const phoneInput = document.getElementById("profilePhone");
    const displayName = document.getElementById("displayName");
    const profileAvatar = document.getElementById("profileAvatar");
    const message = document.getElementById("profileMessage");

    const studentName = savedProfile.name || currentUser.name;

    nameInput.value = studentName;
    emailInput.value = currentUser.email;
    phoneInput.value = savedProfile.phone || "";
    displayName.textContent = studentName;

    function updateAvatar(name) {
        const initials = name.trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0].toUpperCase())
            .join("");

        profileAvatar.textContent = initials || "ST";
    }

    updateAvatar(studentName);

    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name) {
            message.textContent = "Please enter your full name.";
            message.style.color = "#dc2626";
            return;
        }

        savedProfiles[currentUser.email] = {
            name: name,
            phone: phone
        };

        localStorage.setItem(
            "learnhubProfiles",
            JSON.stringify(savedProfiles)
        );

        // Update the current demo session name
        currentUser.name = name;

        sessionStorage.setItem(
            "learnhubCurrentUser",
            JSON.stringify(currentUser)
        );

        displayName.textContent = name;
        updateAvatar(name);

        message.textContent = "Profile updated successfully!";
        message.style.color = "#16a34a";
    });
}


// ========================================
// MY COURSES
// ========================================

const myCourseGrid = document.getElementById("myCourseGrid");

if (myCourseGrid) {

    // Demo enrolled courses.
    // These are sample records, not actual course enrollments.
    // const demoCourses = [
    //     {
    //         id: "web-development",
    //         title: "Web Development",
    //         category: "Programming",
    //         description: "Learn to build modern and responsive websites.",
    //         icon: "〈/〉",
    //         art: "art-blue",
    //         progress: 75
    //     },
    //     {
    //         id: "python",
    //         title: "Python Programming",
    //         category: "Programming",
    //         description: "Build your programming skills with Python.",
    //         icon: "Py",
    //         art: "art-yellow",
    //         progress: 45
    //     },
    //     {
    //         id: "database",
    //         title: "Database Systems",
    //         category: "Database",
    //         description: "Understand SQL and database management.",
    //         icon: "▤",
    //         art: "art-pink",
    //         progress: 100
    //     }
    // ];

    // const courses = JSON.parse(
    //     localStorage.getItem("learnhubMyCourses") || "null"
    // ) || demoCourses;
    const courses = JSON.parse(
    localStorage.getItem("learnhubMyCourses") || "[]"
);

    // Save initial demo course list
    if (!localStorage.getItem("learnhubMyCourses")) {
        localStorage.setItem(
            "learnhubMyCourses",
            JSON.stringify(demoCourses)
        );
    }

    myCourseGrid.innerHTML = "";

    courses.forEach(function (course) {

        const completed = course.progress >= 100;

        const card = document.createElement("article");
        card.className = "my-course-card";

        const art = document.createElement("div");
        art.className = "my-course-art " + course.art;
        art.textContent = course.icon;

        const body = document.createElement("div");
        body.className = "my-course-body";

        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = course.category;

        const title = document.createElement("h3");
        title.textContent = course.title;

        const description = document.createElement("p");
        description.className = "muted";
        description.textContent = course.description;

        const status = document.createElement("span");
        status.className = completed
            ? "course-status completed"
            : "course-status";

        status.textContent = completed
            ? "Completed"
            : "In Progress";

        const progressLabel = document.createElement("div");
        progressLabel.className = "progress-label";

        const progressText = document.createElement("span");
        progressText.textContent = "Course Progress";

        const percentage = document.createElement("strong");
        percentage.textContent = course.progress + "%";

        progressLabel.append(progressText, percentage);

        const track = document.createElement("div");
        track.className = "progress-track";

        const bar = document.createElement("span");
        bar.style.width = course.progress + "%";

        track.appendChild(bar);

        const link = document.createElement("a");
        link.className = "btn btn-primary btn-full";
        link.href = "course-details.html?course=" +
            encodeURIComponent(course.id);

        link.textContent = completed
            ? "View Course"
            : "Continue Learning";

        body.append(
            tag,
            title,
            description,
            status,
            progressLabel,
            track,
            link
        );

        card.append(art, body);
        myCourseGrid.appendChild(card);
    });

    const completedCount = courses.filter(
        course => course.progress >= 100
    ).length;

    const activeCount = courses.length - completedCount;

    document.getElementById("enrolledCount").textContent = courses.length;
    document.getElementById("completedCount").textContent = completedCount;
    document.getElementById("activeCount").textContent = activeCount;

    document.getElementById("emptyCourses").hidden =
        courses.length !== 0;
}
