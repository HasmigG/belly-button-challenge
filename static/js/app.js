
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
        d3.select('#sample-metadata').append('h5').html(`<b><i>${key}:</i></b> ${val}`);
    });

    // Bar Chart

    let {otu_ids, otu_labels, sample_values } = samples.find(dict => dict.id == id);
    
    // console.log(data1.otu_ids, data1.otu_labels, data1.sample_values);

    console.log(otu_ids);

    var data = [
        {
            x: ['giraffes', 'orangutans', 'monkeys'],
            y: [20, 14, 23],
            type: 'bar',
            orientation: 'h'
        }
    ];

    Plotly.newPlot('bar', data);
};
