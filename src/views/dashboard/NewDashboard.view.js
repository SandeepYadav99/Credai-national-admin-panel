import React, { useEffect, useMemo } from "react";
import styles from "./Style.module.css";

import { useState } from "react";

const NewDashboard = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <div className={styles.tableFlex21}>
        <div className={styles.dashboardFlex} style={{ width: "100%" }}>
          DashBoard
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
