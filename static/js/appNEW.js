
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

d3.json(url).then(({names}) => { //{names} dict specified within data
    console.log(names);

    names.forEach(id => {  //loop through names using "id" as an assigned reference
        // d3.select('#selDataset')   // alternative syntax to select('select')
        d3.select('select').append('option').text(id);  
    });
})





const optionChanged = id => {   //where "id" represents "this.value in html file"
    console.log(id);
}