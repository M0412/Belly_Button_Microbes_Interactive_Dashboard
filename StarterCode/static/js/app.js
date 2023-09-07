// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Display the default plots
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(data);

    // Set a variable for the sample names
    let names = data.names;

    // Add  samples to dropdown menu
    names.forEach((id) => {
      dropdownMenu.append("option").text(id).property("value", id);
    });

    // Set the first sample from the list
    let first_sample = names[0];

    // Call the functions to make the demographic panel, bar chart, and bubble chart
    demographic(first_sample);
    barchart(first_sample);
    bubblechart(first_sample);
    gauge(first_sample);
});
}

// Function that populates metadata into demographic panel
function demographic(sample) {

  // Fetch the JSON data
  d3.json(url).then((data) => {
    
    // Retrieve all metadata
    let metadata = data.metadata;
    
    // Filter based on the value of the sample
    let filteredData = metadata.filter((meta) => meta.id == sample);

    // Log the array of metadata objects that have been filtered
    console.log(filteredData)

    // Get the first index from the array
    let valueData = value[0];

    // Clear the child elements in div 
    d3.select("#sample-metadata").html("");

    // Use Object.entries to add each key/value pair to the panel
    Object.entries(valueData).forEach(([key,value]) => {

      // Log the individual key/value pairs 
      console.log(key,value);

      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function that builds the bar chart
function barchart(sample) {

  // Fetch the JSON data
  d3.json(url).then((data) => {

    // Retrieve all metadata
    let sampledata = data.samples;

    // Filter based on the value of the sample
    let filteredData = sampledata.filter((value) => value.id == sample);

    // Log the array of metadata objects that have been filtered
    console.log(filteredData)

    // Get the first index from the array
    let valueData = value[0];

    // Trace for the data for the horizontal bar chart
    // Set top ten items to display in descending order
    let yticks = valueData.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
    let xticks = valueData.sample_values.slice(0,10).reverse();
    let labels = valueData.otu_labels.slice(0,10).reverse();

    // Set up the trace for the bar chart
    let trace = {
      x: xticks,
      y: yticks,
      text: labels,
      type: "bar",
      orientation: "h"
  };

  // Call Plotly to plot the bar chart
  Plotly.newPlot("bar", trace);
});
};

// Function that builds the bubble chart
function bubblechart(sample) {

  // Fetch the JSON data
  d3.json(url).then((data) => {
  
    // Retrieve all metadata
    let sampledata = data.samples;
  
    // Filter based on the value of the sample
    let filteredData = sampledata.filter((value) => value.id == sample);
  
    // Get the first index from the array
    let valueData = value[0];
  
    // Set up the trace for the bubble chart
    let trace = {
      x: valueData.otu_ids,
      y: valueData.sample_values,
      text: valueData.otu_labels,
      mode: "markers",
      marker: {
        size: valueData.sample_values,
        color: valueData.otu_ids,
        colorscale: "Earth"
              }
          };
    
    // Set up the layout
    let layout = {
      xaxis: {title: "OTU ID"}
          };
          
          // Call Plotly to plot the bubble chart
          Plotly.newPlot("bubble", trace, layout);
      });
  }
  


