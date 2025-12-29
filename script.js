function cardshowcasefunc() {
    var cards = document.querySelectorAll('.cards');
    var cardscontainer = document.querySelectorAll('.cards_container');
    var closecontainer = document.querySelectorAll('.close_container');
    var quote_container = document.querySelector('.quote_container');

    function renderCards() {

        cards.forEach((e) => {
            e.addEventListener('click', () => {
                let elem = cardscontainer[e.id - 1];
                elem.classList.add('show');
                if(e.id == 3){
                    quote_container.classList.add('transition');
                }
                window.scrollTo(0,0);
            })
        })


        closecontainer.forEach((e, i) => {
            e.addEventListener('click', () => {
                let elem = cardscontainer[i];
                elem.classList.remove('show');
                
            })
        })
    }

    renderCards();
}


cardshowcasefunc();

// TodoList Functionality

var input = document.getElementById('task_input');

var todo_list_showcase = document.querySelector('.todo_list_showcase');

var alltasks = [];

if (localStorage.getItem('alltasks')) {
    alltasks = JSON.parse(localStorage.getItem('alltasks'));
}

AddElements();

function ChangeStatus(e) {

    const idx = alltasks.findIndex(task => task.title === e.parentNode.innerText)
    var obj = alltasks[idx];
    alltasks[idx] = { ...obj, status: !obj.status };
    localStorage.setItem('alltasks', JSON.stringify(alltasks));
}

function Addtask() {

    let val = input.value;

    var i = alltasks.findIndex(task => task.title === val);

    if (val == "" || i != -1) {
        alert('Please Enter Valid Task');
    }
    else {
        var obj = {
            title: val,
            status: false
        }
        alltasks.push(obj);
        AddElements();
        localStorage.setItem('alltasks', JSON.stringify(alltasks));
    }

}


function deleteElement(e) {
    let findelem = e.parentNode.firstElementChild.innerText;

    let idx = alltasks.findIndex((user) => user.title == findelem);

    alltasks.splice(idx, 1);

    AddElements();

    localStorage.setItem('alltasks', JSON.stringify(alltasks));

}

function AddElements() {
    var list = '';
    alltasks.forEach((e) => {
        list += `<div class="todo_list_showcase_content">
                    <label>
                        <input type="checkbox"  ${(e.status) ? "checked" : ""} onchange="ChangeStatus(this)">
                        ${e.title}
                    </label>
                    <div class="todo_list_delete" onclick="deleteElement(this)">
                        <i class="fa-regular fa-delete-left"></i>
                    </div>
                </div>`
    })

    todo_list_showcase.innerHTML = list;
}

// Daily Planner Functionality 

function dailyplannerFunc() {
    const hours = Array.from({ length: 18 }, (elem, idx) => {

        const amorpm = (6 + idx >= 12) ? "PM" : "AM";
        return `${6 + idx}:00 ${amorpm}`
    })




    function rendertimecoloumn() {
        const div_planner_timing_coloumn = document.querySelector(".div_planner_timing");
        let val = '';

        hours.forEach((e, idx) => {
            console.log(e);

            val += `<div>${e}</div>`;
        })

        div_planner_timing_coloumn.innerHTML = val;
    }

    rendertimecoloumn();

    const div_planner_timing_content = document.querySelector('.div_planner_timing_content');

    let div_planner_content_arr = Array.from({ length: 18 }, (elem, idx) => {
        return "";
    })

    let val1 = '';

    if (localStorage.getItem('allPlans')) {
        div_planner_content_arr = JSON.parse(localStorage.getItem('allPlans'));
    }

    div_planner_content_arr.forEach((elem, idx) => {
        val1 += `<input class="plan_input" type="text" id=${idx} onchange="update(this)" value=${elem}></input>`;
    })

    div_planner_timing_content.innerHTML = val1;
}


function update(elem) {
        div_planner_content_arr[elem.id] = elem.value;
        localStorage.setItem('allPlans', JSON.stringify(div_planner_content_arr));
}

dailyplannerFunc();


// Motivational Quote Functionality


function motivationalQuote(){
    async function getresponse() {
    let response = await fetch('https://quotes-api-self.vercel.app/quote');
    let data = await response.json();
    const quote_container = document.querySelector('.quote_container');
    let quote = data.quote;
    let author = data.author;

    let card = `<div class="quote">
                ${quote}
            </div>
            <div class="auother">
                ${author}
            </div>`

    quote_container.innerHTML = card;
}

getresponse();
}

motivationalQuote();

// Pomodoro Functionality


let totalSeconds = 1500;
const Pomodora_Timer_headers = document.querySelectorAll('.Pomodora_Timer_headers .timer_data');
const Pomodora_Timer_block = document.querySelector('.Pomodora_Timer_block');
let interval = null;

console.log(Pomodora_Timer_headers);

Pomodora_Timer_headers.forEach((e, idx) => {
    e.addEventListener("click", () => {
        timerHandler(e);
    })
})

// Function to Update Pomodoro Headers

function UpdateHeaders(val) {
    Pomodora_Timer_headers.forEach((e, idx) => {
        if (e.innerText == val) {
            e.classList.add('active');
        }
        else {
            e.classList.remove('active');
        }
    })
}

// Function To Set the Timer

function setTimer(totalSeconds) {
    let min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    let sec = String(totalSeconds % 60).padStart(2, '0');

    console.log(`${min}:${sec}`);


    Pomodora_Timer_block.innerText = `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}

setTimer(totalSeconds);

// To Start the Timer

function startTimer() {
    clearInterval(interval);

    interval = setInterval(() => {
        totalSeconds--;
        if (totalSeconds == 0) {
            clearInterval(interval);
            let activeelem = currentActive();
            timerHandler(activeelem);
        }
        setTimer(totalSeconds);
    }, 1000);
}

// Pause Timer

function pauseTimer() {
    clearInterval(interval);
}

// Timer Handler

function timerHandler(e) {
    if (e.innerText == 'Work' && (!e.classList.contains('active') || totalSeconds == 0)) {
        totalSeconds = 1500;
        setTimer(totalSeconds);
        clearInterval(interval);
    }
    else if (e.innerText == 'Short Break' && (!e.classList.contains('active') || totalSeconds == 0)) {
        totalSeconds = 300;
        setTimer(totalSeconds);
        clearInterval(interval);
    }
    else if (e.innerText == 'Long Break' && (!e.classList.contains('active') || totalSeconds == 0)) {
        totalSeconds = 900;
        setTimer(totalSeconds);
        clearInterval(interval);
    }
    UpdateHeaders(e.innerText);
}

// Get Currently Active Pomodor Functionality

function currentActive() {
    return [...Pomodora_Timer_headers].find(e =>
        e.classList.contains('active')
    );
}

// Reset Timer 

function resetTimer() {
    startTimer();
    totalSeconds = 1;
}


// Daily Goal Functionality

let allgoals = []


if (!localStorage.getItem('dailygoals')) {
    localStorage.setItem('dailygoals', JSON.stringify(allgoals));
}
else {
    allgoals = JSON.parse(localStorage.getItem('dailygoals'));
}

let goal_list = document.querySelector('.goal-list');
let goal_input = document.getElementById('goal_input');
let progress_fill = document.querySelector('.progress-fill');
let box_content = document.querySelector('.progress-box_content');

// Function to Set Goals

function setgoals() {

    let goal_html = "";

    allgoals.forEach((e, idx) => {
        goal_html += `<li>
        <input id=${idx} onchange="changegoalStatus(this)" type="checkbox" ${e.status ? "checked" : ""}>
        <span>${e.goal}</span>
        <i onclick="deletegoals(this)" id=${idx} class="fa-solid fa-trash"></i>
      </li>`
    })
    goal_list.innerHTML = goal_html;
}

setgoals();

// Function to Handle Progress Bar

function progressbarHandler() {

    let el = 0;
    let len = allgoals.length;

    allgoals.forEach((e) => {
        if (e.status) {
            el++;
        }
    })

    let per = (el / len) * 100;

    box_content.innerText = `${el} of ${len} Completed`;

    progress_fill.style.width = `${per}%`;

}

progressbarHandler();

// Function to Delete Goal Status

function deletegoals(e) {

    allgoals.splice(e.id, 1);
    setgoals();
    progressbarHandler();
    localStorage.setItem('dailygoals', JSON.stringify(allgoals));

}

// Function to change goal Status

function changegoalStatus(e) {

    let elem = allgoals[e.id];

    allgoals[e.id] = { ...elem, status: e.checked };

    progressbarHandler();

    localStorage.setItem('dailygoals', JSON.stringify(allgoals));

}

// Function to addgoals

function addgoals() {

    if (!goal_input.value) {
        alert('empty');
    }
    else {
        allgoals = [...allgoals, { goal: goal_input.value, status: false }]
    }

    setgoals();
    progressbarHandler();
    localStorage.setItem('dailygoals', JSON.stringify(allgoals));
    goal_input.value = "";

}
// Toggle theme Functionality

const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

toggleBtn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
    toggleBtn.textContent = isDark ? "🌙" : "☀️";
});

root.setAttribute("data-theme", "light");

// function to update time

function updateDateTime() {
    const now = new Date();

    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, '0');

    const time = `${hours}:${minutes} ${ampm}`;

    const spans = document.querySelectorAll('.datetime span');

    spans[0].innerText = day;
    spans[1].innerText = date;
    spans[2].innerText = time;
}

updateDateTime();

setInterval(updateDateTime, 60000);

// to get the geolocation

navigator.geolocation.getCurrentPosition((position) => {

    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    getlocation(lat, long);


})

const locationText = document.querySelector(".location_text");

// api keys 

const accessKey = 'pk.bbbdeae431f3834cac3b504619f1948c';
const wheatherkey = 'debb3c3c4ccd40a3b68132543252912';

// async function to get location

async function getlocation(lat, long) {

    const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=${accessKey}&lat=${lat}&lon=${long}&format=json&`);

    const data = await response.json();

    const obj = data.address;

    console.log(obj);

    locationText.textContent =
        `${obj.city}, ${obj.state}, ${obj.country}`;

    getwheatherdata(obj.city);


}
// async function to get Wheather data

async function getwheatherdata(city) {

    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${wheatherkey}&q=${city}`);

    const data = await res.json();

    console.log(data.current);

    const { temp_c, wind_kph, humidity, precip_in } = data.current;

    document.querySelector(".temp").innerText = `${Math.round(temp_c)}°`;
    document.querySelector(".humidity").innerText = `${humidity}%`;
    document.querySelector(".wind").innerText = `${wind_kph} km/h`;
    document.querySelector(".precip").innerText = `${precip_in}%`;

}

document.querySelectorAll(".value, .temp").forEach(el => {
    el.classList.add("fade-in");
});
