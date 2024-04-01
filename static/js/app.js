let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
// Promise pending
let data = d3.json(url);
// Use the D3 library to read in samples.json from the URL
d3.json(url).then(function(data) {
    console.log(data);
})

    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

  let trace1 = {
  y: sample_values,
  x: otu_ids,
  hoverinfo: names.map(otu_labels),
  type: "bar",
  orientation: "h"
};

    // Create plot
    Plotly.newPlot("plot", [trace1], layout);
