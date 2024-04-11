
optionChanged();

async function optionChanged(id) {
    let url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

    let { names, metadata, samples } = await d3.json(url);

    if (id == undefined) {
        id = names[0];

        d3.select('select').html('');
        names.forEach(name => {
            d3.select('select').append('option').text(name);
        });
    };

    // Demographic Info
    let meta = metadata.find(dict => dict.id == id);

    d3.select('#sample-metadata').html('');
    Object.entries(meta).forEach(([key, val]) => {
        d3.select('#sample-metadata').append('h6').html(`${key}: ${val}`);
    });

    // Bar Chart
    let {otu_ids, otu_labels, sample_values } = samples.find(dict => dict.id == id);
    
    var top_otus = [
        {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }
    ];

    Plotly.newPlot('bar', top_otus);


    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
          color: otu_ids,
          colorscale: "Earth",
          size: sample_values
        }
      };
      
      var bubble_data = [trace1];
      
      
      Plotly.newPlot('bubble', bubble_data);

    
      var gauge_data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: meta.wfreq,
          title: { text: "<b>Belly Button Wash Frequency</b><br>Scrubs Per Week"},
          type: "indicator",
          mode: "gauge+number",
          delta: { reference: 400 },
          gauge: { axis: { range: [null, 9] } }
        }
      ];
      
      var layout = { width: 600, height: 400 };
      Plotly.newPlot('gauge', gauge_data);
    

};
