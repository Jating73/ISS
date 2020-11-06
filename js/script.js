//Making a map and tiles
const mymap = L.map('mapid').setView([0, 0], 1);
const attribution= "© OpenStreetMap contributors"

const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl,{attribution})
tiles.addTo(mymap)

//Making a marker with a custom icon
var myIcon = L.icon({
    iconUrl: 'img/ISS.svg.png',
    iconSize: [50, 50],
    iconAnchor: [16, 25],
});
const marker=L.marker([0, 0],{icon: myIcon}).addTo(mymap);

const api_url='https://api.wheretheiss.at/v1/satellites/25544'
let firstTime=true
async function getData()
{
    const response = await fetch(api_url)
    const data = await response.json()

    const time=document.getElementById('time')
    const alt=document.getElementById('alt')
    const vel=document.getElementById('vel')
    const lat=document.getElementById('lat')
    const long=document.getElementById('long')

    time.textContent="Loading..."
    alt.textContent="Loading..."
    vel.textContent="Loading..."
    lat.textContent="Loading..."
    long.textContent="Loading..."

    const date=new Date(data.timestamp)

    marker.setLatLng([data.latitude,data.longitude])
    if(firstTime)
    {
        mymap.setView([data.latitude,data.longitude],2)
        firstTime=false
    }
    time.textContent=date.toLocaleTimeString()
    alt.textContent=data.altitude
    vel.textContent=data.velocity
    lat.textContent=data.latitude
    long.textContent=data.longitude

}

setInterval(getData,1000)
