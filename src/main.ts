
window.onload = loadCourses;

interface courseInfo {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

//Satta kurser
let setCourses: courseInfo[] = [
  {code:"DT057G", name: "Webbutveckling I", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/"},
  {code:"DT084G", name: "Introduktion till programmering i JavaScript", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/"},
  {code:"DT200G", name: "Grafisk teknik för webb", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/"},
  {code:"DT068G", name: "Webbanvändbarhet", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/"},
  {code:"DT003G", name: "Databaser", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/"},
  {code:"DT211G", name: "Frontend-baserad webbutveckling", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/"},
  {code:"DT207G", name: "Backend-baserad webbutveckling", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/"},
  {code:"DT208G", name: "Programmering i TypeScript", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/"},
];

function printCourseInfo (course: courseInfo) : void {
  let courseList = document.getElementById("course-list") as HTMLElement;

 if (courseList) {
        let li = document.createElement("li");
    li.className = "courseElement";
    li.innerHTML =  `
      ${course.code}, 
      ${course.name}, 
      ${course.progression}, 
      <a href="${course.syllabus}">Kursplan</a></li>
      `;

      courseList.appendChild(li);
  }
  }


let courseForm = document.getElementById("courseForm") as HTMLFormElement;

courseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let courseCode = document.getElementById("code") as HTMLInputElement;
    let courseName = document.getElementById("name") as HTMLInputElement;
    let courseProgression = document.getElementById("progression") as HTMLInputElement;
    let courseSyllabus = document.getElementById("url") as HTMLSelectElement;

    let newCourse: courseInfo = {
        code: courseCode.value,
        name: courseName.value,
        progression: courseProgression.value,
        syllabus: courseSyllabus.value

    };

    let setCourses: courseInfo[] = JSON.parse(localStorage.getItem("courseList")|| "[]");

    //Kontrollera om kurskoden finns redan
    let existingCode = setCourses.some(c => c.code === newCourse.code);
    let progressionLetter = setCourses.some(c => c.progression === "A" || c.progression === "B" || c.progression === "C");

    if(!existingCode && progressionLetter) {
      setCourses.push(newCourse);
      localStorage.setItem("courseList", JSON.stringify(setCourses));
      printCourseInfo(newCourse);
    } else {
      alert("Kontrollera att kurskoden inte redan finns och att progressionen är A, B eller C")
    }

    courseForm.reset();

});

function loadCourses() {
  //Hämta kurser från localStorage
  let courseList = document.getElementById("course-list") as HTMLElement;

//Rensa listan för att inte skapa dubletter
courseList.innerHTML = "";

//Återskapa kurserna som redan finns på sidan vid start
let savedCourses: courseInfo[] = JSON.parse(localStorage.getItem("courseList") || "[]");

//Om listan är tom ska endast de förskapade kurserna läggas till i listan
if (savedCourses.length === 0) {
  localStorage.setItem("courseList", JSON.stringify(setCourses));
  savedCourses = setCourses;
}

//Lägg till kurserna från localStorage i kurslistan
savedCourses.forEach(printCourseInfo);

}










