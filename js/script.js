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

// =================================
// DASHBOARD COURSE SEARCH
// =================================
const dashboardSearch = document.getElementById("courseSearch");

if (dashboardSearch) {
    const dashboardCards = document.querySelectorAll(".dashboard-grid .course-card");

    dashboardSearch.addEventListener("input", function () {
        const searchValue = dashboardSearch.value.trim().toLowerCase();

        dashboardCards.forEach(function (card) {
            const courseName = card.querySelector("h3").textContent.toLowerCase();
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

        const enrollButton = document.getElementById("enrollButton");
        const enrollMessage = document.getElementById("enrollMessage");

        enrollButton.addEventListener("click", function () {
            enrollMessage.hidden = false;
            enrollMessage.textContent =
                "You have successfully enrolled in " + course.title + " (demo only)!";
            enrollButton.textContent = "Enrolled";
            enrollButton.disabled = true;
        });
    }
}
