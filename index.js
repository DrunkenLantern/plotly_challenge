function updateMetaData(data) {
    
    var STUFF= document.getElementById("sample-metadata");
    STUFF.innerHTML = '';
    
    for(var key in data) {
        h6tag = document.createElement("h6");
        h6Text = document.createTextNode(`${key}: ${data[key]}`);
        h6tag.append(h6Text);
        STUFF.appendChild(h6tag);
    }
};

function buildCharts(sampleData, otuData) {

    // Loop through sample data and find the OTU Taxonomic Name
    var labels = sampleData[0]['otu_ids'].map(function(item) {
        return otuData[item]
    });

    //Bubble Chart
    var bubbleLayout = {
        margin: { t: 0 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' }
    };
    var bubbleData = [{
        x: sampleData[0]['otu_ids'],
        y: sampleData[0]['sample_values'],
        text: labels,
        mode: 'markers',
        marker: {
            size: sampleData[0]['sample_values'],
            color: sampleData[0]['otu_ids'],
            colorscale: "Spectral",
        }
    }];
    var BUBBLE = document.getElementById('bubble');
    Plotly.plot(BUBBLE, bubbleData, bubbleLayout);

    // Pie Chart
    var pieData = [{
        values: sampleData[0]['sample_values'].slice(0, 10),
        labels: sampleData[0]['otu_ids'].slice(0, 10),
        hovertext: labels.slice(0, 10),
        hoverinfo: 'hovertext',
        type: 'pie',
        marker: {
            colors: ['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf']
        }
    }];

    var pieLayout = {
        margin: { t: 0, l: 0 }
    };

    var PIE = document.getElementById('pies');
    Plotly.plot(PIE, pieData, pieLayout);
};
