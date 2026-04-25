// ActivityCard.jsx
import React from "react";

const ActivityCard = ({ title, date, category }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.text}>Date: {date}</p>
      <p style={styles.text}>Category: {category}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #b91515",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px",
    width: "250px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#510303",
  },
  title: {
    margin: "0 0 10px 0",
  },
  text: {
    margin: "5px 0",
  },
};

export default ActivityCard;