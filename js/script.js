// =================================
// LMS COURSE SEARCH AND FILTER
// =================================
const exploreSearch = document.getElementById("exploreSearch");
const categoryFilter = document.getElementById("categoryFilter");
const exploreCards = document.querySelectorAll("#exploreCourseGrid .course-card");
const courseCount = document.getElementById("courseCount");
const noCourses = document.getElementById("noCourses");

function filterCourses() {
    if (!exploreSearch || !categoryFilter) return;

    const searchValue = exploreSearch.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    let visibleCourses = 0;

    exploreCards.forEach(function (card) {
        const courseName = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;
        const matchesSearch = courseName.includes(searchValue);
        const matchesCategory = selectedCategory === "all" || category === selectedCategory;
        const isVisible = matchesSearch && matchesCategory;

        card.hidden = !isVisible;
        if (isVisible) visibleCourses++;
    });

    if (courseCount) {
        courseCount.textContent = visibleCourses + (visibleCourses === 1 ? " Course" : " Courses");
    }
    if (noCourses) noCourses.hidden = visibleCourses !== 0;
}

if (exploreSearch && categoryFilter) {
    exploreSearch.addEventListener("input", filterCourses);
    categoryFilter.addEventListener("change", filterCourses);
}

// // =================================
// // DASHBOARD COURSE SEARCH
// // =================================
// const dashboardSearch = document.getElementById("courseSearch");

// if (dashboardSearch) {
//     const dashboardCards = document.querySelectorAll(".dashboard-grid .course-card");

//     dashboardSearch.addEventListener("input", function () {
//         const searchValue = dashboardSearch.value.trim().toLowerCase();

//         dashboardCards.forEach(function (card) {
//             const courseName = card.querySelector("h3").textContent.toLowerCase();
//             card.hidden = !courseName.includes(searchValue);
//         });
//   });
// }
    // =================================
    // DASHBOARD COURSE SEARCH
    // =================================

    const dashboardSearch = document.getElementById("courseSearch");

    if (dashboardSearch) {
        dashboardSearch.addEventListener("input", function () {

            const searchValue = dashboardSearch.value.trim().toLowerCase();

            const dashboardCards = document.querySelectorAll(
                "#dashboardCourseGrid .course-card"
            );

            dashboardCards.forEach(function (card) {

                const courseName = card.querySelector("h3")
                    .textContent.toLowerCase();

                card.hidden = !courseName.includes(searchValue);

            });
        });
    }

// =================================
// COURSE DETAILS DATA
// =================================
const courseData = {
    "web-development": {
        title: "Web Development",
        icon: "💻",
        category: "Programming",
        level: "Beginner",
        duration: "8 Weeks",
        price: "Free",
        description: "Learn how to create modern websites.",
        about: "This course introduces students to HTML, CSS and JavaScript. You will learn how websites are structured, styled and made interactive.",
        objectives: [
            "Understand HTML5 structure",
            "Create websites using CSS3",
            "Learn JavaScript fundamentals",
            "Build responsive websites"
        ],
        curriculum: [
            "Module 01 - Introduction to Web Development",
            "Module 02 - HTML Fundamentals",
            "Module 03 - CSS and Responsive Design",
            "Module 04 - JavaScript Basics"
        ],
        instructor: "John Smith",
        role: "Web Development Instructor"
    },
    "python": {
        title: "Python Programming",
        icon: "🐍",
        category: "Programming",
        level: "Beginner",
        duration: "6 Weeks",
        price: "Free",
        description: "Learn Python programming fundamentals.",
        about: "Learn variables, data types, conditions, loops and functions using Python.",
        objectives: [
            "Understand Python syntax",
            "Use variables and data types",
            "Learn loops and conditions",
            "Create simple Python programs"
        ],
        curriculum: [
            "Module 01 - Python Introduction",
            "Module 02 - Variables and Data Types",
            "Module 03 - Conditions and Loops",
            "Module 04 - Functions"
        ],
        instructor: "David Perera",
        role: "Python Instructor"
    },
    "database": {
        title: "Database Systems",
        icon: "🗄️",
        category: "Database",
        level: "Intermediate",
        duration: "7 Weeks",
        price: "Free",
        description: "Learn SQL and database management.",
        about: "Understand relational databases, SQL queries and database design.",
        objectives: [
            "Understand relational databases",
            "Learn SQL queries",
            "Create database tables",
            "Understand database relationships"
        ],
        curriculum: [
            "Module 01 - Database Introduction",
            "Module 02 - ER Diagrams",
            "Module 03 - SQL Queries",
            "Module 04 - Database Design"
        ],
        instructor: "Michael Silva",
        role: "Database Instructor"
    },
    "uiux": {
        title: "UI/UX Design",
        icon: "🎨",
        category: "Design",
        level: "Beginner",
        duration: "5 Weeks",
        price: "Free",
        description: "Learn user interface and experience design.",
        about: "Explore user research, wireframes, visual design and prototyping.",
        objectives: [
            "Understand UX principles",
            "Create wireframes",
            "Learn UI design",
            "Create prototypes"
        ],
        curriculum: [
            "Module 01 - UX Fundamentals",
            "Module 02 - User Research",
            "Module 03 - Wireframing",
            "Module 04 - UI Prototyping"
        ],
        instructor: "Sarah Fernando",
        role: "UI/UX Design Instructor"
    },
    "business": {
        title: "Business Management",
        icon: "📈",
        category: "Business",
        level: "Beginner",
        duration: "6 Weeks",
        price: "Free",
        description: "Learn business management fundamentals.",
        about: "Explore planning, leadership and business management concepts.",
        objectives: [
            "Understand business planning",
            "Learn management principles",
            "Understand leadership",
            "Explore business strategy"
        ],
        curriculum: [
            "Module 01 - Business Introduction",
            "Module 02 - Management Principles",
            "Module 03 - Leadership",
            "Module 04 - Business Strategy"
        ],
        instructor: "Robert Kumar",
        role: "Business Instructor"
    },
    "react": {
        title: "React Development",
        icon: "⚛️",
        category: "Programming",
        level: "Intermediate",
        duration: "8 Weeks",
        price: "Free",
        description: "Learn modern React frontend development.",
        about: "Learn React components, props, state and interactive web applications.",
        objectives: [
            "Understand React components",
            "Learn props and state",
            "Understand React hooks",
            "Build React applications"
        ],
        curriculum: [
            "Module 01 - React Introduction",
            "Module 02 - Components and Props",
            "Module 03 - State and Events",
            "Module 04 - React Hooks"
        ],
        instructor: "Daniel Perera",
        role: "React Instructor"
    }
};

// =================================
// DISPLAY COURSE DETAILS
// =================================
const detailTitle = document.getElementById("detailTitle");

if (detailTitle) {
    const parameters = new URLSearchParams(window.location.search);
    const courseId = parameters.get("course");
    const course = courseData[courseId];

    if (!course) {
        detailTitle.textContent = "Course Not Found";
        document.getElementById("detailDescription").textContent =
            "The requested course could not be found. Please return to the course list.";
        document.getElementById("enrollButton").hidden = true;
        document.getElementById("detailCategory").hidden = true;
    } else {
        document.getElementById("detailIcon").textContent = course.icon;
        document.getElementById("detailCategory").textContent = course.category;
        detailTitle.textContent = course.title;
        document.getElementById("detailDescription").textContent = course.description;
        document.getElementById("detailLevel").textContent = course.level;
        document.getElementById("detailDuration").textContent = course.duration;
        document.getElementById("detailPrice").textContent = course.price;
        document.getElementById("detailAbout").textContent = course.about;
        document.getElementById("instructorName").textContent = course.instructor;
        document.getElementById("instructorRole").textContent = course.role;

        const objectiveList = document.getElementById("learningObjectives");
        course.objectives.forEach(function (objective) {
            const item = document.createElement("li");
            item.textContent = objective;
            objectiveList.appendChild(item);
        });

        const curriculum = document.getElementById("courseCurriculum");
        course.curriculum.forEach(function (module) {
            const item = document.createElement("div");
            item.className = "curriculum-item";
            item.textContent = module;
            curriculum.appendChild(item);
        });

        // const enrollButton = document.getElementById("enrollButton");
        // const enrollMessage = document.getElementById("enrollMessage");

        // enrollButton.addEventListener("click", function () {
        //     enrollMessage.hidden = false;
        //     enrollMessage.textContent =
        //         "You have successfully enrolled in " + course.title + " (demo only)!";
        //     enrollButton.textContent = "Enrolled";
        //     enrollButton.disabled = true;
        // });
        const enrollButton = document.getElementById("enrollButton");
const enrollMessage = document.getElementById("enrollMessage");

const currentUser = JSON.parse(
    sessionStorage.getItem("learnhubCurrentUser") || "null"
);

function getEnrolledCourses() {
    return JSON.parse(
        localStorage.getItem("learnhubMyCourses") || "[]"
    );
}

// Check whether student already enrolled
const existingCourses = getEnrolledCourses();

const alreadyEnrolled = existingCourses.some(
    enrolledCourse => enrolledCourse.id === courseId
);

if (alreadyEnrolled) {
    enrollButton.textContent = "Already Enrolled";
    enrollButton.disabled = true;

    enrollMessage.hidden = false;
    enrollMessage.textContent =
        "You are already enrolled in this course.";
}

enrollButton.addEventListener("click", function () {

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const courses = getEnrolledCourses();

    // Prevent duplicate enrollment
    const alreadyExists = courses.some(
        enrolledCourse => enrolledCourse.id === courseId
    );

    if (alreadyExists) {
        enrollMessage.hidden = false;
        enrollMessage.textContent =
            "You are already enrolled in this course.";
        return;
    }

    // Create new enrollment
    const newCourse = {
        id: courseId,
        title: course.title,
        category: course.category,
        description: course.description,
        icon: course.icon,
        art: "art-blue",
        progress: 0
    };

    courses.push(newCourse);

    // Save enrollment
    localStorage.setItem(
        "learnhubMyCourses",
        JSON.stringify(courses)
    );

    // Update button and message
    enrollButton.textContent = "Enrolled";
    enrollButton.disabled = true;

    enrollMessage.hidden = false;
    enrollMessage.textContent =
        "Successfully enrolled in " + course.title + "!";

});
    }
}
// ========================================
// STUDENT SESSION MANAGEMENT
// ========================================

const currentUser = JSON.parse(
    sessionStorage.getItem("learnhubCurrentUser")
);

// Protect dashboard
if (!currentUser) {
    window.location.href = "login.html";
} else {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const studentEmail = document.getElementById("studentEmail");

    // if (welcomeMessage) {
    //     welcomeMessage.textContent = `Welcome back, ${currentUser.name}!`;
    // }
     
    const savedProfiles = JSON.parse(
    localStorage.getItem("learnhubProfiles") || "{}"
);

const studentName =
    savedProfiles[currentUser.email]?.name || currentUser.name;

if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${studentName}!`;
}

const headerStudentName = document.getElementById("headerStudentName");
const studentAvatar = document.getElementById("studentAvatar");

if (headerStudentName) {
    headerStudentName.textContent = studentName;
}

if (studentAvatar) {
    studentAvatar.textContent = studentName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join("");
}

    if (studentEmail) {
        studentEmail.textContent = currentUser.email;
    }
}

// Logout
// const logoutBtn = document.getElementById("logoutBtn");

// if (logoutBtn) {
//     logoutBtn.addEventListener("click", function () {
//         sessionStorage.removeItem("learnhubCurrentUser");
//         window.location.href = "login.html";
//     });
// }
// ========================================
// LOGOUT
// ========================================

    function logoutStudent() {
        sessionStorage.removeItem("learnhubCurrentUser");
        window.location.href = "login.html";
    }

    const logoutBtn = document.getElementById("logoutBtn");
    const sidebarLogout = document.getElementById("sidebarLogout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutStudent);
    }

    if (sidebarLogout) {
        sidebarLogout.addEventListener("click", logoutStudent);
    }

// ========================================
// DYNAMIC DASHBOARD COURSES
// ========================================

const dashboardCourseGrid = document.getElementById(
    "dashboardCourseGrid"
);

if (dashboardCourseGrid) {

    // Get saved enrolled courses
    const enrolledCourses = JSON.parse(
        localStorage.getItem("learnhubMyCourses") || "[]"
    );

    // Dashboard elements
    const enrolledNumber = document.getElementById(
        "dashboardEnrolled"
    );

    const completedNumber = document.getElementById(
        "dashboardCompleted"
    );

    const emptyMessage = document.getElementById(
        "dashboardEmptyMessage"
    );

    const overallBar = document.getElementById(
        "dashboardOverallBar"
    );

    const overallText = document.getElementById(
        "dashboardOverallText"
    );

    // Clear existing cards
    dashboardCourseGrid.innerHTML = "";

    // Display enrolled courses
    enrolledCourses.forEach(function (course) {

        const card = document.createElement("article");
        card.className = "course-card";

        const art = document.createElement("div");
        art.className = "course-art " + (course.art || "art-blue");
        art.textContent = course.icon || "📚";

        const body = document.createElement("div");
        body.className = "course-card-body";

        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = course.category;

        const title = document.createElement("h3");
        title.textContent = course.title;

        const description = document.createElement("p");
        description.className = "muted";
        description.textContent = course.description;

        const progressLabel = document.createElement("div");
        progressLabel.className = "progress-label";

        const progressText = document.createElement("span");
        progressText.textContent = "Progress";

        const percentage = document.createElement("strong");
        percentage.textContent = course.progress + "%";

        progressLabel.append(progressText, percentage);

        const track = document.createElement("div");
        track.className = "progress-track";

        const bar = document.createElement("span");

        const progress = Math.min(
            100,
            Math.max(0, Number(course.progress) || 0)
        );

        bar.style.width = progress + "%";

        track.appendChild(bar);

        const link = document.createElement("a");

        link.className = "btn btn-primary btn-full";

        link.href = "course-details.html?course=" +
            encodeURIComponent(course.id);

        link.textContent = progress >= 100
            ? "View Course"
            : "Continue Learning";

        body.append(
            tag,
            title,
            description,
            progressLabel,
            track,
            link
        );

        card.append(art, body);

        dashboardCourseGrid.appendChild(card);

    });

    // Calculate statistics
    const totalCourses = enrolledCourses.length;

    const completedCourses = enrolledCourses.filter(
        course => Number(course.progress) >= 100
    ).length;

    const totalProgress = enrolledCourses.reduce(
        (total, course) => {
            return total + Math.min(
                100,
                Math.max(0, Number(course.progress) || 0)
            );
        },
        0
    );

    const overallProgress = totalCourses > 0
        ? Math.round(totalProgress / totalCourses)
        : 0;

    // Update dashboard numbers
    enrolledNumber.textContent = String(totalCourses).padStart(2, "0");

    completedNumber.textContent = String(completedCourses).padStart(2, "0");

    // Update overall progress
    overallBar.style.width = overallProgress + "%";

    overallText.textContent = overallProgress + "%";

    // Show empty message if no enrollments
    emptyMessage.hidden = totalCourses !== 0;

}