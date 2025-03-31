
//window.onload = loadCourses;

interface courseInfo {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

function printCourseInfo (course: courseInfo) : void {
  let courseList = document.getElementById("course-list") as HTMLElement;

 if (courseList) {
  //Hämta in alla element
  let existingCode = document.getElementsByClassName("courseElement") as HTMLCollectionOf<HTMLLIElement>;
  //Kolla om kurskoden redan existerar
  let codeExists = Array.from(existingCode).some(courseEl => {
    let codeCheck = courseEl.innerHTML.split(",")[0].trim();
    return codeCheck === course.code;
  });
 
  if (!codeExists){
        let li = document.createElement("li");
    li.className = "courseElement";
    li.innerHTML =  `
      ${course.code}, 
      ${course.name}, 
      ${course.progression}, 
      <a href="${course.syllabus}">Kursplan</a></li>
      `;

      courseList.appendChild(li);
  } else {
    alert("Kurskoden existerar redan, lägg till en ny kurs")
  }
  }
  //saveCourseList();
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










