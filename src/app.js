document.addEventListener('DOMContentLoaded', () => {
  const now = new Date()
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  const render = (data) => {
    document.getElementById("date").innerHTML = now.toLocaleDateString("de-CH", dateOptions)
    document.getElementById("greet").innerHTML = data.strings[Math.floor(now.getHours() / 6)]
    sections = [...document.getElementsByTagName("section")]
    sections.forEach(section => {
      document.getElementById(section.id).innerHTML = Hbs[section.id]({ [section.id] : data[section.id] })
    });
  }

  const access = (data, callback) => {
    if(localStorage.getItem('boobs') != data.notsosecret){
      if(!document.location.href.endsWith(data.notsosecret)){
          document.location.href = "403.html";
      } else {
          localStorage.setItem('boobs', data.notsosecret)
          window.history.pushState("", "Dashboard", "/");
      }
    } else {
        window.history.pushState("", "Dashboard", "/");
    }
    callback(data)
  }

  fetch('settings.json', {cache: "default"})
  .then(response => response.json())
  .then(data => access(data, render))

});

