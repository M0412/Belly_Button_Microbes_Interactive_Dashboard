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
            
            dropdownMenu.append("option").text(names[i]).property("value", names[i]);
        
        };
        
        // Set the first sample from the list
        let first_sample = names[0];

        // Call the functions that builds the guage chart
        gaugechart(first_sample);
    });
};

// Function that builds the gauge chart
function gaugechart(sample) {

    // Fetch the JSON data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let filteredData = metadata.filter((meta) => meta.id == sample);

        // Get the first index from the array
        let valueData = filteredData[0];

        let washFreq = valueData.wfreq;

        // Set up the trace for the gauge chart
        let trace = {
            value: washFreq,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "black"},
                steps: [
                    { range: [0, 1], color: "red" },
                    { range: [1, 2], color: "orange" },
                    { range: [2, 3], color: "yellow" },
                    { range: [3, 4], color: "beige" },
                    { range: [4, 5], color: "lightyellow" },
                    { range: [5, 6], color: "powderblue" },
                    { range: [6, 7], color: "lightskyblue" },
                    { range: [7, 8], color: "lightgreen" },
                    { range: [8, 9], color: "green" }
                ],
            }
        };

        // Set up the Layout
        let layout = {
            width: 450, 
            height: 450,
            margin: {t: 0, b:0}
        };

        // Call Plotly to plot the gauge chart
        Plotly.newPlot("gauge", [trace], layout)
    
    });

};

// Call the initialize function
init();

