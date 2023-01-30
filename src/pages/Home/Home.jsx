import React, { useEffect, useState } from "react";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { me } from "../../api";
import { TOKEN_KEY } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";

function Home(props) {
  const [_, setTokens] = useLocalStorage(TOKEN_KEY, null);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await me();
        console.log({ data });
        setCurrentUser(data);
      } catch (err) {
        // No Store related to account (deleted)
        if (err.response && err.response.status === 404) {
          setTokens(null);
          setCurrentUser({});
          navigate("/signin", { replace: true, state: { noStore: true } });
        }
      }
    };
    init();
  }, []);

  const handleLogout = () => {
    setTokens(null);
    navigate("/login", { replace: true });
  };

  if (!currentUser._id) {
    return null;
  }

  return (
    <div className="home">
      <div className="sidebar">
      <div className="logo"><img src="../src/assets/img/logo.png"/></div>
      <div className="divider"></div>
        {/* sidebar */}
        <aside>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
              {currentUser.role === "admin" ? (
                <>
                  <Link to="/leaves">Leaves</Link>
                  <Link to="/users">Users</Link>
                  <Link to="/calendar">Calendar</Link>
                </>
              ) : (
                <>
                  <Link to="/apply-leave">Apply Leave</Link>
                  <Link to="/my-leaves">My Leaves</Link>
                  <Link to="/calendar">Calendar</Link>
                </>
              )}
            </li>
          </ul>
        </aside>
        <button onClick={handleLogout}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
              fill="currentColor"
            />
            <path
              d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="content">
        <ToastContainer />
        <Outlet context={{ currentUser, setCurrentUser }} />
      </div>
    </div>
  );
}

export default Home;
