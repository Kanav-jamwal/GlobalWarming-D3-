function createPie(width, height) {
    var pie = d3.select("#pie")
                  .attr("width", width)
                  .attr("height", height);

    pie.append("g")
         .attr("transform", "translate(" + width / 2 + ", " + (height / 2 + 10) + ")")
         .classed("chart", true);

    pie.append("text")
        .attr("x", width / 2)
        .attr("y", "1em")
        .attr("font-size", "1.5em")
        .style("text-anchor", "middle")
        .classed("pie-title", true);
}

// prettier-ignore
function drawPie(data, currentYear) {
    var pie = d3.select("#pie");

    var arcs = d3.pie()
                 .sort((a, b) => {
                     return a.emissions - b.emissions;
                 })
                 .value(d => d.emissions);

    var path = d3.arc()
                 .outerRadius(+pie.attr("height") / 2 - 50)
                 .innerRadius(0);

    var yearData = data.filter(d => d.year === currentYear);
    var continents = [];
    var counter=0;
    for (var i = 0; i < yearData.length; i++) {
        
        var continent = yearData[i].continent;
        if (!continents.includes(continent)) {
            continents.push(continent);
            ;
        }
    
    }

    var colorScale = d3.scaleOrdinal()
                       .domain(continents)
                       .range(["#ea0716", "#2d5eef", "#00ff2e", "#000000", "#78909c"]);
    var update = pie
                    .select(".chart")
                    .selectAll(".arc")
                    .data(arcs(yearData));

    update
      .exit()
      .remove();

    update  
      .enter()
        .append("path")
        .classed("arc", true)
        .attr("stroke", "#dff1ff")
        .attr("stroke-width", "0.25px")
      .merge(update)
        .attr("fill", d => colorScale(d.data.continent))
        .attr("d", path);

    pie.select(".pie-title")
       .text("Percentage of Total emissions by Country, " + currentYear);
}