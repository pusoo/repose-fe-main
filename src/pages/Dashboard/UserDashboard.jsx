import React from "react";

function UserDashboard({ currentUser }) {
  return (
    <div className="user-dash">
      <div className="used-leave">
        <p>
          <strong>Used Leave</strong>
        </p>
        <p>{currentUser.usedLeave || 0}</p>
      </div>
      <div className="leave-balance">
        <p>
          <strong>Leave Balance</strong>
        </p>
        <p>{currentUser.leaveBalance}</p>
      </div>
    </div>
  );
}

export default UserDashboard;
