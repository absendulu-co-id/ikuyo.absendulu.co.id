  import PropTypes from "prop-types";
  import Chart from "react-apexcharts";
  
  export function DonutChart({ chart }) {
    return <Chart {...chart} />
  }
  
  DonutChart.defaultProps = {
    color: "green",
    footer: null,
  };
  
  DonutChart.propTypes = {
    chart: PropTypes.object.isRequired,
  };
  
  DonutChart.displayName = "/src/widgets/charts/statistics-chart.jsx";
  
  export default DonutChart;
  