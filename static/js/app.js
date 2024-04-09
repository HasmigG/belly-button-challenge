
optionChanged();

async function optionChanged(id) {
    let url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

    let { names, metadata, samples } = await d3.json(url);

    if (id == undefined) {
        id = names[0];

        names.forEach(name => {
            d3.select('select').append('option').text(name);
        });
    };

    // Demographic Info
    let meta = metadata.find(dict => dict.id == id);

    


};
