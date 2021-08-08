const fetchAndRender = (sections) => {
  sections.forEach(name => {
    fetch('data/' + name + '.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById(name).innerHTML = Hbs[name](data)
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const now = new Date()
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  const strings = [
    'Gute Nacht, Simon!',
    'Guten Morgen, Simon!',
    'Guten Nachmittag, Simon!',
    'Guten Abend, Simon!'
  ]
  const sections = ['apps','links']

  document.getElementById("date").innerHTML = now.toLocaleDateString("de-CH", dateOptions)
  document.getElementById("greet").innerHTML = strings[Math.floor(now.getHours() / 6)]
  fetchAndRender(sections)

});

