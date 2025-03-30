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


