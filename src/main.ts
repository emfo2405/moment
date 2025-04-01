//När sidan startas laddas sparad kursinformation in genom funktionen loadCourses
window.onload = loadCourses;

//Ett interface skapat för kursinformation
interface courseInfo {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

//Redan inmatade kurser som visas när sidan laddas
let setCourses: courseInfo[] = [
  { code: "DT057G", name: "Webbutveckling I", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/" },
  { code: "DT084G", name: "Introduktion till programmering i JavaScript", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/" },
  { code: "DT200G", name: "Grafisk teknik för webb", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/" },
  { code: "DT068G", name: "Webbanvändbarhet", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/" },
  { code: "DT003G", name: "Databaser", progression: "A", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/" },
  { code: "DT211G", name: "Frontend-baserad webbutveckling", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/" },
  { code: "DT207G", name: "Backend-baserad webbutveckling", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/" },
  { code: "DT208G", name: "Programmering i TypeScript", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/" },
];

//Funktion som skriver ut kurser med interface som grund
//Argumentet är course utformad som courseInfo, funktionen returnerar inget värde därmed :void
function printCourseInfo(course: courseInfo): void {

  //Hämtar in listan courseList som ett HTML-element
  let courseList = document.getElementById("course-list") as HTMLElement;

  //Om courseList-elementet finns skapas ett li-element med klassen courseElement med information enligt courseInfo
  if (courseList) {
    let li: HTMLElement = document.createElement("li");
    li.className = "courseElement";
    li.innerHTML = `
      ${course.code}, 
      ${course.name}, 
      ${course.progression}, 
      <a href="${course.syllabus}">Kursplan</a></li>
      `;

    //Den nya kursen (li-elementet) läggs till i den hämtade listan över kurser
    courseList.appendChild(li);
  }
}

//Hämtar in formulär som HTML-element
let courseForm = document.getElementById("courseForm") as HTMLFormElement;

/*När användaren klickar på submit körs funktionen medan preventDefault hindrar sidan från att laddas om när 
formuläret skickas och istället hanterar vi händelsen med TypeScript*/
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //Data hämtas in från formuläret som användaren fyller i
  let courseCode = document.getElementById("code") as HTMLInputElement;
  let courseName = document.getElementById("name") as HTMLInputElement;
  let courseProgression = document.getElementById("progression") as HTMLInputElement;
  let courseSyllabus = document.getElementById("url") as HTMLInputElement;


  //En ny kurs får värden baserat på ifyllt formulär med objektet courseInfo som grund
  let newCourse: courseInfo = {
    code: courseCode.value,
    name: courseName.value,
    progression: courseProgression.value,
    syllabus: courseSyllabus.value

  };

  //Hämtar de lagrade kurserna från localStorage, om inga kurser är lagrade returneras en tom array
  let setCourses: courseInfo[] = JSON.parse(localStorage.getItem("courseList") || "[]");

  //Kontrollera om en kurskod i de lagrade kurserna är samma som för den nya kursen
  let existingCode: boolean = setCourses.some(c => c.code === newCourse.code);
  //Kontrollera om progressionen i den nya kursen är A, B eller C
  let progressionLetter: boolean = (courseProgression.value === "A" || courseProgression.value === "B" || courseProgression.value === "C");

  //Om kurskoden inte redan finns och progressionen är A, B eller C läggs den nya kursen till
  if (!existingCode && progressionLetter) {
    //Kursen läggs till i kurslistan
    setCourses.push(newCourse);
    //LocalStorage uppdateras med den nya kursen
    localStorage.setItem("courseList", JSON.stringify(setCourses));
    //Funktionen printCourseInfo skriver ut den nya kursen till webbplatsen
    printCourseInfo(newCourse);

    //Om kurskoden redan finns eller om progressionen är fel skrivs meddelandet ut
  } else {
    alert("Kontrollera att kurskoden inte redan finns och att progressionen är A, B eller C")
  }

  //Formuläret töms efter att man klickat på knappen
  courseForm.reset();

});

function loadCourses() {
  //Hämtar in HTML-elementet course-list som visar kurslistan
  let courseList = document.getElementById("course-list") as HTMLElement;

  //Rensa listan för att inte skapa dubletter
  courseList.innerHTML = "";

  //Här hämtas kurserna från localStorage in, om inga kurser är sparade hämtas en tom array
  let savedCourses: courseInfo[] = JSON.parse(localStorage.getItem("courseList") || "[]");

  //Om listan är tom ska endast de förskapade kurserna läggas till i listan
  if (savedCourses.length === 0) {
    localStorage.setItem("courseList", JSON.stringify(setCourses));
    savedCourses = setCourses;
  }

  //Skriver ut varje kurs i listan på webbplatsen
  savedCourses.forEach(printCourseInfo);

}










