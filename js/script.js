'use strict'
const map = L.map('map').setView([0, 0], 2)

const moveISS = function () {
  $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function (
    data,
  ) {
    const lat = data['iss_position']['latitude']
    const lon = data['iss_position']['longitude']
    const coords = [lat, lon]
    iss.setLatLng(coords)
    isscirc.setLatLng(coords)
    map.panTo(coords, (animate = true))
  })
  setTimeout(moveISS, 5000)
}

L.tileLayer(
  'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=XdhfHVF55MjDDnZaIPZh',
  {
    maxZoom: 6,
  },
).addTo(map)

const ISSIcon = L.icon({
  iconUrl: 'img/ISSIcon.png',
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [50, 25],
  shadowUrl: 'img/shadow.png',
  shadowSize: [60, 40],
  shadowAnchor: [30, 15],
})

const iss = L.marker([0, 0], { icon: ISSIcon }).addTo(map)
const isscirc = L.circle([0, 0], 2200e3, {
  color: '#c22',
  opacity: 0.3,
  weight: 1,
  fillColor: '#c22',
  fillOpacity: 0.1,
}).addTo(map)

const loadAstronauts = function () {
  $.getJSON('http://api.open-notify.org/astros.json?callback=?', function (
    data,
  ) {
    //const number = data['number']
    //$('#spacepeeps').html(number)

    data['people'].forEach(function (d) {
      $('.astronames').append(`
      <div>
        <h4>${d['name']}</h4>
        <img class="astronauts--avatar" src="img/astronauts/${d['name']}.jpg" alt="" />
      </div>`)
    })
  })
}

const init = function () {
  moveISS()
  loadAstronauts()
}

init()
