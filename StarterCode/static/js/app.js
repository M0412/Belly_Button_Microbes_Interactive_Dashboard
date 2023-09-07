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
        names.forEach((id) => {
            
            // Console log the value of id for each iteration of the loop
            console.log(id);
            
            dropdownMenu.append("option").text(id).property("value", id);
        
        });
        
        // Set the first sample from the list
        let first_sample = names[0];
        
        // Log the value of first_sample
        console.log(first_sample);
        
        // Call the functions to make the demographic panel, bar chart, and bubble chart
        demographic(first_sample);
        barchart(first_sample);
        bubblechart(first_sample);
        gauge(first_sample);

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
        let valueData = value[0];

        // Clear the child elements in div 
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Console log the individual key/value pairs 
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        
        });

    });

};