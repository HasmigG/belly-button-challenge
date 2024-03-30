let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"


// Use the D3 library to read in samples.json from the URL
d3.json(url).then(function(data) {
    console.log(data);
})

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");