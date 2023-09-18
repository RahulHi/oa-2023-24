const graphDiv = document.getElementById("graph");

fetch(
    "http://localhost:3000" //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
).then(async res => {
    var data = await res.json();
    Plotly.newPlot( graphDiv, data.data, data.layout); 
})

