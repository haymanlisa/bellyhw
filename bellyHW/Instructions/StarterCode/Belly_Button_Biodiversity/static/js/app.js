function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    
  d3.json(`/metadata/${sample}`).then(function(data) {
  console.log(data);



// Use d3 to select the panel with id of `#sample-metadata`
var biscuit = d3.select("#sample-metadata");

// Use `.html("") to clear any existing metadata

biscuit.html("");

// Use `O// Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.bject.entries` to add each key and value pair to the panel



  Object.entries(data).forEach(([key, value]) => {
     biscuit.append("h6").text(`${key}: ${value}`);
   });



  });



    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

d3.json(`/samples/${sample}`).then(function(data) {
  console.log(data);

var otu_ids = data.otu_ids;
var otu_labels = data.otu_labels;
var sample_values = data.sample_values;

var bubbleLayout = {
     margin: { t: 0 },
     hovermode: "closest",
     xaxis: { title: "OTU ID" }
   };
var bubbleData = [
     {
       x: otu_ids,
       y: sample_values,
       text: otu_labels,
       mode: "markers",
       marker: {
         size: sample_values,
         color: otu_ids,
         colorscale: "Earth"

 

       }
     }
   ];
Plotly.plot("bubble", bubbleData, bubbleLayout);

var top_10_sample_value = sample_values.slice(0, 10); 
var top_10_ids = otu_ids.slice(0, 10); 
var top_10_otu_labels =  otu_labels.slice(0, 10); 

var data = [{
  values: top_10_sample_value,
  labels: top_10_ids,
  text: top_10_otu_labels,
  hoverinfo: "text",
  type: 'pie'
}];

var layout = {
     margin: { t: 0, l: 0 }

};


Plotly.plot('pie', data, layout);



});}





    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
