const date = new Date();
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentTime = date.getHours() + ":" + date.getMinutes();
const currentDate =
  date.getDate() + " " + month[date.getMonth()] + ", " + date.getFullYear();
const form = document.querySelector(".form");
const button = document.querySelector(".button");

const locationId = [];

button.addEventListener("click", (evt) => {
  const msg = document.querySelector(".msg");
  const input = document.querySelector(".inputField");
  const apiKey = "a3239f2695d286354a689cb5e11bd5ec";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  const loader = document.querySelector(".loadingio-spinner-spin-qf7pvy38fs");
  const section = document.querySelector(".section");
  evt.preventDefault();
  msg.textContent = "";
  input.value ="";
  section.style.opacity = "0.2";
  loader.style.display = "inline-block";
  if (navigator.onLine !== true) {
    msg.textContent = "Pls check your internet!";
    msg.style.dipslay = "block";
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { name, main, sys, weather, id } = data;
        console.log(data);
        if (data.cod === 200) {
          if (!locationId.includes(id)) {
            locationId.push(id);
            console.log(true);
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const newChild = document.createElement("div");
            const markup = `
                <div class="div">
                <h2 data-name="${name}, ${sys.country}">
                <span class="span">${name}</span>
                <sup>${sys.country}</sup>
                </h2>
                <br/>
                <figure>
                <img src="${icon}" alt=${weather[0]["main"]} />
                <figcaption>${weather[0]["description"]}</figcaption>
                </figure>
                </div>
                <div>
                <h3 class="temp">
                <span>${Math.round(main.temp)}
                <sup class="degree">°c</sup>
                </h3>
                <span class="date">${currentTime}</span>
                <span class="date">${currentDate}</span>
                </div>
                </div>`;
            console.log(data);
            newChild.classList.add("container");
            newChild.innerHTML = markup;
            section.insertAdjacentElement("afterbegin", newChild );
            loader.style.display = "none";
            section.style.opacity = "1";
          } else {
            console.log(false);
            msg.innerHTML = `You already know the weather for <strong> ${name}😉</strong>`;
            loader.style.display = "none";
            section.style.opacity = "1";
          }
        } else {
          loader.style.display = "none";
          section.style.opacity = "1";
          msg.innerHTML =
            "Please input a valid city 😩<br/> Or specify city and country(two-letter) seperated by comma e.g: <strong> Lagos, NG 😉 </strong>";
        }
      })
      .catch();

  }
});
