
/* =================================
   LEARNHUB - MY PROGRESS
================================= */

// Check student login
const currentUser = sessionStorage.getItem("learnhubCurrentUser");

if (!currentUser) {
    window.location.href = "login.html";
}


// Get HTML elements
const totalCoursesElement = document.getElementById("totalCourses");
const completedCoursesElement = document.getElementById("completedCourses");
const inProgressCoursesElement = document.getElementById("inProgressCourses");
const overallProgressElement = document.getElementById("overallProgress");

const overallProgressLarge = document.getElementById("overallProgressLarge");
const overallProgressBar = document.getElementById("overallProgressBar");
const overallMessage = document.getElementById("overallMessage");

const courseCountElement = document.getElementById("courseCount");
const progressCourseGrid = document.getElementById("progressCourseGrid");
const emptyProgress = document.getElementById("emptyProgress");


// Read enrolled courses from localStorage
function getEnrolledCourses() {
    try {
        const savedCourses = localStorage.getItem("learnhubMyCourses");

        if (!savedCourses) {
            return [];
        }

        const courses = JSON.parse(savedCourses);

        return Array.isArray(courses) ? courses : [];

    } catch (error) {
        console.error("Unable to read enrolled courses:", error);
        return [];
    }
}


// Prevent HTML injection when displaying saved values
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (character) {
        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return characters[character];
    });
}


// Get a safe progress percentage
function getCourseProgress(course) {
    const progress = Number(course.progress);

    if (!Number.isFinite(progress)) {
        return 0;
    }

    return Math.min(100, Math.max(0, Math.round(progress)));
}


// Get course status
function getCourseStatus(progress) {

    if (progress >= 100) {
        return {
            text: "Completed",
            className: "status-completed"
        };
    }

    if (progress > 0) {
        return {
            text: "In Progress",
            className: "status-progress"
        };
    }

    return {
        text: "Not Started",
        className: "status-not-started"
    };
}


// Display summary statistics
function updateProgressStatistics(courses) {

    const totalCourses = courses.length;

    const completedCourses = courses.filter(course => {
        return getCourseProgress(course) >= 100;
    }).length;

    const inProgressCourses = courses.filter(course => {
        const progress = getCourseProgress(course);
        return progress > 0 && progress < 100;
    }).length;

    const totalProgress = courses.reduce((total, course) => {
        return total + getCourseProgress(course);
    }, 0);

    const overallProgress = totalCourses > 0
        ? Math.round(totalProgress / totalCourses)
        : 0;


    // Update statistics
    totalCoursesElement.textContent = totalCourses;

    completedCoursesElement.textContent = completedCourses;

    inProgressCoursesElement.textContent = inProgressCourses;

    overallProgressElement.textContent = overallProgress + "%";


    // Update overall progress section
    overallProgressLarge.textContent = overallProgress + "%";

    overallProgressBar.style.width = overallProgress + "%";


    // Update message
    if (totalCourses === 0) {
        overallMessage.textContent =
            "Start learning to see your progress here.";

    } else if (overallProgress === 100) {
        overallMessage.textContent =
            "Excellent work! You have completed all your enrolled courses.";

    } else if (overallProgress >= 50) {
        overallMessage.textContent =
            "Great progress! Keep learning and reach your goals.";

    } else {
        overallMessage.textContent =
            "Keep going! Every lesson helps you make progress.";
    }
}


// Display individual course progress cards
function displayCourseProgress(courses) {

    progressCourseGrid.innerHTML = "";

    courseCountElement.textContent =
        courses.length + (courses.length === 1 ? " Course" : " Courses");


    // Empty state
    if (courses.length === 0) {

        progressCourseGrid.hidden = true;
        emptyProgress.hidden = false;

        return;
    }

    progressCourseGrid.hidden = false;
    emptyProgress.hidden = true;


    courses.forEach(course => {

        const progress = getCourseProgress(course);

        const completedLessons = Array.isArray(course.completedLessons)
            ? course.completedLessons.length
            : 0;

        const status = getCourseStatus(progress);

        const courseTitle = escapeHTML(course.title || "Untitled Course");
        const courseCategory = escapeHTML(course.category || "General");
        const courseIcon = escapeHTML(course.icon || "📚");
        const courseId = encodeURIComponent(String(course.id || ""));

        const courseCard = document.createElement("article");

        courseCard.className = "progress-course-card";

        courseCard.innerHTML = `

            <div class="progress-course-top">

                <div class="progress-course-icon">
                    ${courseIcon}
                </div>

                <div class="progress-course-info">

                    <h3>${courseTitle}</h3>

                    <p>${courseCategory}</p>

                </div>

                <span class="course-status ${status.className}">
                    ${status.text}
                </span>

            </div>


            <div class="course-progress-details">

                <span>Learning Progress</span>

                <strong>${progress}%</strong>

            </div>


            <div class="progress-track">

                <div
                    class="progress-fill"
                    style="width: ${progress}%"
                ></div>

            </div>


            <div class="course-progress-bottom">

                <span class="lesson-completed-text">
                    ${completedLessons} lesson(s) completed
                </span>

                <a
                    href="course-details.html?course=${courseId}"
                    class="continue-learning-link"
                >
                    ${progress >= 100 ? "Review Course →" : "Continue Learning →"}
                </a>

            </div>

        `;

        progressCourseGrid.appendChild(courseCard);

    });

}


// Logout
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        sessionStorage.removeItem("learnhubCurrentUser");

        window.location.href = "login.html";

    });

}


// Initialize progress page
function initializeProgressPage() {

    const courses = getEnrolledCourses();

    updateProgressStatistics(courses);

    displayCourseProgress(courses);

}


// Run page
initializeProgressPage();
