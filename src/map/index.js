import {
  select,
  geoPath,
  geoMercator,
  // scaleThreshold,
  easeLinear,
  selectAll,
} from "d3";
import * as topojson from "topojson-client";
import { cities } from "../data/cities";
import { useRef, useEffect } from "react";

const Map = ({ travel }) => {
  const mapRef = useRef();

  useEffect(() => {
    var width = window.innerWidth,
      height = window.innerHeight;

    // var colorRange = ["#1a9850", "#66bd63"];
    // var travelColorDomain = [0, 1];

    // Select SVG element
    var svg = select(mapRef.current)
      .attr("width", width)
      .attr("height", height * 0.8)
      .attr("class", "map");

    // Projection and path
    var projection = geoMercator()
      .center([118.25, -5])
      .scale(width * 1.2)
      .translate([width / 2, height / 2]);

    var path = geoPath().projection(projection);

    function ready(data) {
      // Color
      // var renderTravelColor = scaleThreshold()
      //   .domain(travelColorDomain)
      //   .range(colorRange);

      var g = svg.append("g");

      // Draw the map
      g.selectAll("path")
        .attr("class", "city")
        .data(topojson.feature(data, data.objects.IDN).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .attr("stroke-width", "0.2")
        .attr("fill", "white")
        .transition()
        .duration(2000)
        .delay(function (d, i) {
          return i * 5;
        })
        .ease(easeLinear)
        .attr("fill", function (d) {
          if (!d.properties.HASC_2) {
            return "lightblue";
          } else {
            const isTravel = travel.find(
              (city) => city.value === d.properties.NAME_2
            );
            if (isTravel) {
              return "#20b061"; // TODO : Change this to dynamic color with renderTravelColor
            } else {
              return "white";
            }
          }
        });

      g.selectAll("path")
        .append("title")
        .text(function (d) {
          return "Kota: " + d.properties.NAME_2;
        });
    }

    select(window).on("resize", resize);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      projection.scale(width * 1.2).translate([width / 2, height / 2]);

      select("svg")
        .attr("width", width)
        .attr("height", height * 0.8);

      selectAll("path").attr("d", path);
    }

    ready(cities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travel]);

  return <svg ref={mapRef}></svg>;
};

export default Map;
