function buildCharts(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      let samples = data.samples;
      let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;
      // Build a Bubble Chart
      let bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      let bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      let yticks = otu_ids.slice(0, 10).map(otuID => OTU ${otu_ids}).reverse();
      let barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot("bar", barData, barLayout);
    });
  }
  function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      let sampleNames = data.names;
      for (let i = 0; i < sampleNames.length; i++){
        selector
          .append("option")
          .text(sampleNames[i])
          .property("value", sampleNames[i]);
      };
      // Use the first sample from the list to build the initial plots
      let firstSample = sampleNames[0];
      buildCharts(firstSample);
    });
  }
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
  }
  // Initialize the dashboard
  init();
