import React, { useEffect, useState } from "react";
import { getLeaves } from "../../api";

function AdminDashboard(props) {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  useEffect(() => {
    const init = async () => {
      const { data } = await getLeaves({
        filter: {
          status: "PENDING",
        },
      });

      setPendingLeaves(data.results.length);
    };

    init();
  }, []);
  return (
    <div className="admin-dash">
      <div className="pending-leave">
      <p>
        <strong>Pending Leaves</strong> 
      </p>
      <p>{pendingLeaves}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
