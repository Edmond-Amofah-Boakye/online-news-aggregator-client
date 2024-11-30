// SocialMediaChart.tsx
import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const MainChart: React.FC = () => {
  useEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Apply themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingBottom: 50,
        paddingTop: 40,
        paddingLeft: 40,
        paddingRight: 40
      })
    );

    // Data
    let data = [
      {
        name: "Monica",
        steps: 45688,
        pictureSettings: { src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg" }
      },
      {
        name: "Joey",
        steps: 35781,
        pictureSettings: { src: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg" }
      },
      {
        name: "Ross",
        steps: 25464,
        pictureSettings: { src: "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg" }
      },
      {
        name: "Phoebe",
        steps: 18788,
        pictureSettings: { src: "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg" }
      },
      {
        name: "Rachel",
        steps: 15465,
        pictureSettings: { src: "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg" }
      },
      {
        name: "Chandler",
        steps: 11561,
        pictureSettings: { src: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg" }
      }
    ];

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 60,
          visible: false
        })
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Add series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Income",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "steps",
        categoryXField: "name",
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          pointerOrientation: "vertical",
          labelText: "{valueY}"
        })
      })
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusTL: 10,
      maxWidth: 50,
      fillOpacity: 0.8
    });

    // Set data for the series and xAxis
    series.data.setAll(data);
    xAxis.data.setAll(data);

    // Add hover and cursor functionality if desired
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    // Make the chart animate on load
    series.appear();
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "400px", backgroundColor: "#E2E8F0" }}></div>;
};

export default MainChart;
