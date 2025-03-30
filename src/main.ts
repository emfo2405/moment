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
      <li class="courseElement">
      ${course.code}, 
      ${course.name}, 
      ${course.progression}, 
      <a href="${course.syllabus}">Kursplan</a></li>
      `;
  }

  saveCourseList();
}

function saveCourseList() {
  let courseEl = document.getElementsByClassName("courseElement") as HTMLCollectionOf<HTMLLIElement>;
  let courseArr: Array<string> = [];

  for (let i = 0; i < courseEl.length; i = i + 1) {
    courseArr.push(courseEl[i].innerHTML);
  }

  let jsonStr: string = JSON.stringify(courseArr);
  localStorage.setItem("courseEl", jsonStr);

  console.log(courseArr);
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



