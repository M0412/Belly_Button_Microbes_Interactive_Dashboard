// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);  
});

// Display the default plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch the JSON data
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        for (let i = 0; i< names.length; i++){
            
            // Console log the value of id for each iteration of the loop
            console.log(names[i]);
            
            dropdownMenu.append("option").text(names[i]).property("value", names[i]);
        
        };
        
        // Set the first sample from the list
        let first_sample = names[0];
        
        // Log the value of first_sample
        console.log(first_sample);
        
        // Call the functions to make the demographic panel, bar chart, and bubble chart
        demographic(first_sample);
        barchart(first_sample);
        bubblechart(first_sample);
       
    });

};

// Function that populates metadata into demographic panel
function demographic(sample) {

    // Fetch the JSON data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let filteredData = metadata.filter((meta) => meta.id == sample);

        // Console log the array of metadata objects that have been filtered
        console.log(filteredData)

        // Get the first index from the array
        let valueData = filteredData[0];

        // Clear the child elements in div 
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        for (key in valueData){

            // Console log the individual key/value pairs 
            console.log(key,valueData[key]);

            d3.select("#sample-metadata").append("h5").text(`${key.toUpperCase()}: ${valueData[key]}`);
        
        };

    });

};

// Function that builds the bar chart
function barchart(sample) {

    // Fetch the JSON data
    d3.json(url).then((data) => {
       
        // Retrieve all sample data
        let sampledata = data.samples;

        // Filter based on the value of the sample
        let filteredData = sampledata.filter((value) => value.id == sample);

        // Console log the array of the sample data that has been filtered
        console.log(filteredData)

        // Get the first index from the array
        let valueData = filteredData[0];
        
        // Trace for the data for the horizontal bar chart
        // Set top ten items to display in descending order
        let yticks = valueData.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse();
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
        Plotly.newPlot("bar", [trace]);
    });

};

// Function that builds the bubble chart
function bubblechart(sample) {

    // Fetch the JSON data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampledata = data.samples;

        // Filter based on the value of the sample
        let filteredData = sampledata.filter((value) => value.id == sample);

        // Get the first index from the array
        let valueData = filteredData[0];

        // Set up the trace for bubble chart
        let trace = {
            x: valueData.otu_ids,
            y: valueData.sample_values,
            text: valueData.sample_values,
            mode: "markers",
            marker: {
                size: valueData.sample_values,
                color: valueData.otu_ids,
                colorscale: "Earth"
            }
        }

        // Set up the layout the layout
        let layout = {
            xaxis: {title: "OTU ID"}
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bubble", [trace], layout);

    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Call all functions 
    demographic(value);
    barchart(value);
    bubblechart(value);
    
};

// Call the initialize function
init();