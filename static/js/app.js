let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

// Promise pending
let dataPromise = d3.json(url);
console.log("Data Promise: " dataPromise);

// Use the D3 library to read in samples.json from the URL
d3.json(url).then(function(data) {
    console.log(data);
})

// Extract Data
let names = data.names
let sampleValues = data.sample_values;
let otuIds = data.otu_ids;
// let otuLabels = data.otu.labels;
let result = sampleValues.filter(object => object.id == sampleValues);

// sort & slice to get top 10 OTUs
// let top10otus = sampleValues.slice(0, 10);

let selector = d3.select(dataPromise);

let trace1 = {
  y: otuIds,
  x: sampleValues,
  // hoverinfo: otuLabels,
  type: "bar",
  orientation: "h"
};

let layout = {
  title: "Top 10 OTUs Found",
};

// Create plot
Plotly.newPlot("plot", trace1, layout);

 
// Build the bubble chart
let trace2 = {
  x: otuIds,
  y: sampleValues,
  // text: otuLabels,
};

let layout2 = {
  title: "All Samples",
  // hoverinfo: ,
  xaxis: {title: "OTU ID" },
  marker: {
    size: sampleValues,
    color: otuIds,
    colorscale: "Earth",
    // text: otuLabels
};

Plotly.newPlot("bubble", trace2, layout2);