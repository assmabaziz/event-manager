/*================================ Variables ==================================== */
const form = document.getElementById("form");
const eventName = document.getElementById("eventName");
const eventOrganizer = document.getElementById("eventOrganizer");
const eventDate = document.getElementById("eventDate");
const eventCard = document.getElementById("eventCard");
const btnAdd = document.getElementById("btnAdd");
const btnUppdate = document.getElementById("btnUppdate");
const inputs = document.querySelectorAll("input");
const allValidations = document.getElementById("allValidations");
// const searchValue = document.getElementById("searchValue");
let indexEvent = 0;
let regex = {};
let eventsList = JSON.parse(localStorage.getItem("events")) || [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
/*================================ Set MinDate Function ==================================== */
function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  eventDate.min = today;
  eventDate.addEventListener("input", () => {
    if (eventDate.value < today) {
      eventDate.value = today;
    }
  });
}
setMinDate();
/*================================ Add Event Function ==================================== */
btnAdd.addEventListener("click", () => {
  if (
    regex[eventName.id].test([eventName.value]) &&
    regex[eventOrganizer.id].test([eventOrganizer.value]) &&
    regex[eventDate.id].test([eventDate.value])
  ) {
    const eventTimeLeft = new Date(eventDate.value).getTime();
    let event = {
      eventName: eventName.value,
      eventOrganizer: eventOrganizer.value,
      eventDate: eventDate.value,
      timeLeft: eventTimeLeft,
    };
    eventsList.push(event);
    allValidations.classList.add("hidden");
    uppdateLocalStorage();
    clearForm();
    displayEvents();
  } else {
    allValidations.classList.remove("hidden");
  }
});
/*================================ Clear Form Function ==================================== */
function clearForm() {
  inputs.forEach((input) => {
    input.value = "";
  });
}
/*================================ Display Events Function ==================================== */
function displayEvents() {
  eventCard.innerHTML = "";
  for (let i = 0; i < eventsList.length; i++) {
    const now = new Date().getTime();
    const timeRest = eventsList[i].timeLeft - now;
    const days = Math.floor(timeRest / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRest % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeRest % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRest % (1000 * 60)) / 1000);
    const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (days === 0) {
      eventCard.innerHTML += `
    <div class="event-card p-3 bg-red-300 shadow-md shadow-slate-900 duration-300 hover:shadow-xl hover:shadow-slate-900">
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
            <span>event:</span>
            <span>${eventsList[i].eventName}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
            <span>organizer:</span>
            <span>${eventsList[i].eventOrganizer}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black  py-3 ">
            <span>date:</span>
            <span>${eventsList[i].eventDate}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] py-3">
            <span>time left:</span>
            <span>${countdown}</span>
        </div>
        <div class="btns">
      <button class="bg-red-500 btn-style  mb-2 hover:bg-red-600" onClick="deleteEvent(${i})">delete</button>
      <button class="bg-orange-500 btn-style hover:bg-orange-600" onClick="setEventToUppdate(${i})">uppdate</button>
    </div>
    </div>
`;
    } else if (days < 2) {
      eventCard.innerHTML += `
    <div class="event-card p-3 bg-orange-300 shadow-md shadow-slate-900 duration-300 hover:shadow-xl hover:shadow-slate-900">
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
            <span>event:</span>
            <span>${eventsList[i].eventName}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
            <span>organizer:</span>
            <span>${eventsList[i].eventOrganizer}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black  py-3 ">
            <span>date:</span>
            <span>${eventsList[i].eventDate}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] py-3">
            <span>time left:</span>
            <span>${countdown}</span>
        </div>
        <div class="btns">
      <button class="bg-red-500 btn-style  mb-2 hover:bg-red-600" onClick="deleteEvent(${i})">delete</button>
      <button class="bg-orange-500 btn-style hover:bg-orange-600" onClick="setEventToUppdate(${i})">uppdate</button>
    </div>
    </div>
`;
    } else {
      eventCard.innerHTML += `
    <div class="event-card p-3 bg-white shadow-md shadow-slate-900 duration-300 hover:shadow-xl hover:shadow-slate-900">
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
            <span>event:</span>
            <span>${eventsList[i].eventName}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
            <span>organizer:</span>
            <span>${eventsList[i].eventOrganizer}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black  py-3 ">
            <span>date:</span>
            <span>${eventsList[i].eventDate}</span>
        </div>
        <div class="flex justify-between items-center capitalize font-semibold text-[18px] py-3">
            <span>time left:</span>
            <span>${countdown}</span>
        </div>
        <div class="btns">
      <button class="bg-red-500 btn-style  mb-2 hover:bg-red-600" onClick="deleteEvent(${i})">delete</button>
      <button class="bg-orange-500 btn-style hover:bg-orange-600" onClick="setEventToUppdate(${i})">uppdate</button>
    </div>
    </div>
`;
    }
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      deleteEvent(eventsList[i]);
    }
  }
}
setInterval(displayEvents, 1000);
/*================================ Delete Events Function ==================================== */
function deleteEvent(index) {
  eventsList.splice(index, 1);
  uppdateLocalStorage();
  displayEvents();
}
/*================================ Uppdate LocalStorage Function ==================================== */
function uppdateLocalStorage() {
  localStorage.setItem("events", JSON.stringify(eventsList));
}
/*================================ Set Event To Uppdate  ==================================== */
function setEventToUppdate(index) {
  btnAdd.classList.add("hidden");
  btnUppdate.classList.replace("hidden", "visible");
  eventName.value = eventsList[index].eventName;
  eventOrganizer.value = eventsList[index].eventOrganizer;
  eventDate.value = eventsList[index].eventDate;
  indexEvent = index;
}
/*================================ Uppdate Event Function ==================================== */
btnUppdate.addEventListener("click", function () {
  const eventTimeLeft = new Date(eventDate.value).getTime();
  let event = {
    eventName: eventName.value,
    eventOrganizer: eventOrganizer.value,
    eventDate: eventDate.value,
    timeLeft: eventTimeLeft,
  };
  eventsList.splice(indexEvent, 1, event);
  uppdateLocalStorage();
  clearForm();
  displayEvents();
  btnAdd.classList.remove("hidden");
  btnUppdate.classList.replace("visible", "hidden");
  // console.log(`new event ${event}`);
});
/*================================ Search Event Function ==================================== */
// searchValue.addEventListener("input", function () {
//   eventCard.innerHTML = "";
//   let searchItem = searchValue.value;
//   for (let i = 0; i < eventsList.length; i++) {
//     if (
//       eventsList[i].eventName
//         .toLowerCase()
//         .includes(searchItem.toLowerCase()) ||
//       eventsList[i].eventOrganizer.toLowerCase().includes(searchItem.toLowerCase() ||
//       eventsList[i].eventDate.includes(searchItem )
//      )
//     ) {
//       eventCard.innerHTML += `
//       <div class="event-card p-3 bg-white shadow-md shadow-slate-900 duration-300 hover:shadow-xl hover:shadow-slate-900">
//           <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
//               <span>event:</span>
//               <span>${eventsList[i].eventName}</span>
//           </div>
//           <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black py-3">
//               <span>organizer:</span>
//               <span>${eventsList[i].eventOrganizer}</span>
//           </div>
//           <div class="flex justify-between items-center capitalize font-semibold text-[18px] border-b-[1px] border-black  py-3 ">
//               <span>date:</span>
//               <span>${eventsList[i].eventDate}</span>
//           </div>
//           <div class="flex justify-between items-center capitalize font-semibold text-[18px] py-3">
//               <span>time left:</span>
//               <span>${countdown}</span>
//           </div>
//           <div class="btns">
//         <button class="bg-red-500 btn-style  mb-2 hover:bg-red-600" onClick="deleteEvent(${i})">delete</button>
//         <button class="bg-orange-500 btn-style hover:bg-orange-600" onClick="setEventToUppdate(${i})">uppdate</button>
//       </div>
//       </div>
//   `;
//   // console.log(eventsList);
//   // console.log(eventCard);
//     }
//   }
// });
/*================================ Validation Function ==================================== */
for (const input of inputs) {
  input.addEventListener("keyup", function () {
    let nextelement = this.nextElementSibling;
    regex = {
      eventName: /^[A-Za-z0-9]{3,}$/,
      eventOrganizer: /^[A-Za-z0-9]{3,}$/,
      eventDate:
        /^[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])$/,
    };
    if (regex[this.id].test([this.value])) {
      this.classList.add("bg-green-200");
      this.classList.remove("bg-red-200");
      nextelement.classList.add("hidden");
      return true;
    } else {
      this.classList.remove("bg-green-200");
      this.classList.add("bg-red-200");
      nextelement.classList.remove("hidden");
      return false;
    }
  });
}
