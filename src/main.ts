interface courseInfo {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

function printCourseInfo (course: courseInfo) : void {
  let courseList = document.getElementById("course-list");

  if (courseList) {
      courseList.innerHTML += `
      <li>
      ${course.code}, 
      ${course.name}, 
      ${course.progression}, 
      <a href="${course.syllabus}">Kursplan</a></li>
      `;
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
    
    printCourseInfo(newCourse);

    courseForm.reset();
});



