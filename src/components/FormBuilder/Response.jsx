import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import styles from "./Response.module.css";
import { useSelector } from "react-redux";

function Response({ formData }) {
  const { views, starts, completedCount, elements, entries } = formData;
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Prepare the data for the pie chart
  const pieData = [
    { title: "Started", value: starts, color: "#ffb84d" }, // Yellow for Started
    { title: "Completed", value: completedCount, color: "#66cc66" }, // Green for Completed
  ];

  return (
    <div
      className={`${styles.pageContainer} ${
        darkMode ? styles.pageContainerDark : ""
      }`}
    >
      {/* Check if there are entries, if not show the no responses message */}
      {entries.length === 0 ? (
        <div
          className={styles.noResponsesMessage}
          style={{ color: darkMode ? "rgba(105, 105, 105, 0.45)" : "black" }}
        >
          <p>No responses yet collected</p>
        </div>
      ) : (
        <>
          {/* Metrics */}
          <div className={styles.metrics}>
            <div
              className={styles.metric}
              style={{
                backgroundColor: darkMode
                  ? "rgba(50, 50, 50, 1)"
                  : "transparent",
                border: "1px solid rgba(68, 68, 68, 1)",
              }}
            >
              <h3
                className={styles.metricValue}
                style={{ color: darkMode ? "white" : "black" }}
              >
                {views}
              </h3>
              <p
                className={styles.metricLabel}
                style={{ color: darkMode ? "white" : "black" }}
              >
                Views
              </p>
            </div>
            <div
              className={styles.metric}
              style={{
                backgroundColor: darkMode
                  ? "rgba(50, 50, 50, 1)"
                  : "transparent",
                border: "1px solid rgba(68, 68, 68, 1)",
              }}
            >
              <h3
                className={styles.metricValue}
                style={{ color: darkMode ? "white" : "black" }}
              >
                {starts}
              </h3>
              <p
                className={styles.metricLabel}
                style={{ color: darkMode ? "white" : "black" }}
              >
                Starts
              </p>
            </div>
            <div
              className={styles.metric}
              style={{
                backgroundColor: darkMode
                  ? "rgba(50, 50, 50, 1)"
                  : "transparent",
                border: "1px solid rgba(68, 68, 68, 1)",
              }}
            >
              <h3
                className={styles.metricValue}
                style={{
                  color: darkMode ? "white" : "black",
                }}
              >
                {completedCount}
              </h3>
              <p
                className={styles.metricLabel}
                style={{ color: darkMode ? "white" : "black" }}
              >
                Completed
              </p>
            </div>
          </div>

          {/* Table and Pie Chart container */}
          <div
            className={`${styles.tableContainer} ${
              darkMode ? styles.tableContainerDark : ""
            }`}
          >
            {/* Table */}
            <table
              className={`${styles.table} ${
                darkMode ? styles.tableDark : styles.tableLight
              }`}
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Submitted at</th>
                  {elements.map((el) => (
                    <th key={el.id}>{el.placeholder || el.label || "N/A"}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(entry.submittedAt).toLocaleString()}</td>
                    {elements.map((el) => {
                      const responseObj = entry.responses.find(
                        (resp) => resp.elementId === el.id
                      );
                      return (
                        <td key={el.id}>{responseObj?.response || "N/A"}</td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie Chart */}
          <div className={`${styles.chartContainer} `}>
            <div className={`${darkMode ? styles.chartDark : styles.chart}`}>
              <PieChart
                data={pieData}
                label={({ data, dataIndex }) => {
                  if (dataIndex === 0) {
                    return `Started: ${starts}`;
                  } else if (dataIndex === 1) {
                    return `Completed: ${completedCount}`;
                  }
                  return ""; // Fallback if dataIndex is not recognized
                }}
                labelStyle={{
                  fontSize: "6px",
                  fill: darkMode ? "white" : "black",
                }}
                radius={40}
                lineWidth={50}
                labelPosition={100}
              />
            </div>
            <div
              className={`${
                darkMode
                  ? styles.chartCountsContainerDark
                  : styles.chartCountsContainer
              }`}
              style={{
                backgroundColor: darkMode
                  ? "rgba(50, 50, 50, 1)"
                  : "transparent",
              }}
            >
              <h3>Completion Rate</h3>
              <p>{((starts / completedCount) * 100).toFixed(2)}%</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Response;
