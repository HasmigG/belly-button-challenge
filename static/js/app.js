// Fetch the JSON data from the URL
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const sampleValues = data.sample_values;
    const otuIds = data.otu_ids;
    const otuLabels = data.otu_labels;

    // Combine the data into an array of objects
    const combinedData = otuIds.map((d, i) => ({
      otuId: d,
      sampleValue: sampleValues[i],
      otuLabel: otuLabels[i]
    }));

    // Sort the data based on sample values and get the top 10
    const top10Data = combinedData.sort((a, b) => b.sampleValue - a.sampleValue).slice(0, 10);

    // Create dropdown menu
    const dropdown = d3.select('body')
      .append('select')
      .on('change', updateChart);

    dropdown.selectAll('option')
      .data(top10Data)
      .enter()
      .append('option')
      .attr('value', d => d.otuId)
      .text(d => `OTU ${d.otuId}`);

    // Initial chart creation
    updateChart();

    function updateChart() {
      const selectedOTU = dropdown.property('value');
      const selectedData = top10Data.find(d => d.otuId === selectedOTU);

      // Create or update the bar chart
      d3.select('div.chart').remove();

      const chart = d3.select('body')
        .append('div')
        .attr('class', 'chart')
        .selectAll('div')
        .data([selectedData])
        .enter()
        .append('div')
        .style('width', d => `${d.sampleValue * 10}px`)
        .text(d => `OTU ${d.otuId}: ${d.otuLabel}`);
    }
  })
  .catch(error => console.error('Error fetching data:', error));
