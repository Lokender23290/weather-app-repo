
    
      let clockInterval = null;

      // const API_KEY = "fa973867ed194c70a15105725260302";

      function setTheme(color) {
        document.querySelector(".two").style.background =
          `linear-gradient(135deg, ${color}88, rgba(255,255,255,0.6))`;
      }
      
      document.getElementById("locationInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
      async function getWeather() {
        const location = locationInput.value.trim();
        if (!location) {
          alert("Please enter a location");
          return;
        }

        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=fa973867ed194c70a15105725260302&q=${location},In&aqi=yes`
          );

          if (!res.ok) {
            alert("Invalid location");
            return;
          }

          const data = await res.json();
          console.log(data);

          temp.innerText = data.current.temp_c + "°C";
          cityname.innerText = data.location.name;
          weather.innerText = data.current.condition.text;

          const c = data.current.condition.text.toLowerCase();
          const iconEl = document.getElementById("icon");

          if (c.includes("sun") || c.includes("clear")) {
            iconEl.textContent = "☀️";
            setTheme("#ffe066");
          } else if (c.includes("rain")) {
            iconEl.textContent = "🌧️";
            setTheme("#74c0fc");
          } else if (c.includes("cloud")) {
            iconEl.textContent = "☁️";
            setTheme("#adb5bd");
          } else if (c.includes("snow")) {
            iconEl.textContent = "❄️";
            setTheme("#e7f5ff");
          } else if (c.includes("storm") || c.includes("thunder")) {
            iconEl.textContent = "⛈️";
            setTheme("#9775fa");
          } else {
            iconEl.textContent = "🌡️";
            setTheme("#ced4da");
          }

          // ✅ REAL, LIVE, CITY-LOCAL TIME (WORKING)
          let cityEpoch = data.location.localtime_epoch * 1000;

          if (clockInterval) clearInterval(clockInterval);

          function updateClock() {
            const now = new Date(cityEpoch);

            time.innerText = now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            day.innerText = now.toLocaleDateString([], {
              weekday: "short",
            });

            date.innerText = now.toLocaleDateString();

            cityEpoch += 1000;
          }

          updateClock();
          clockInterval = setInterval(updateClock, 1000);

          document.querySelector(".two").classList.add("expanded");
          document
            .querySelectorAll(".idle")
            .forEach((el) => el.classList.remove("idle"));
        } catch (err) {
          alert("Network error");
        }
       
      }
     
   