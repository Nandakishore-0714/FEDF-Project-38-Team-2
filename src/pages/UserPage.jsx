import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";

export default function UserPage() {
  const [webinars, setWebinars] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  // ✅ Load all data
  useEffect(() => {
    const storedWebinars = localStorage.getItem("webinars");
    if (storedWebinars) setWebinars(JSON.parse(storedWebinars));

    const storedRegistrations = localStorage.getItem("registrations");
    if (storedRegistrations) setRegistered(JSON.parse(storedRegistrations));

    const storedResources = localStorage.getItem("resources");
    if (storedResources) setResources(JSON.parse(storedResources));

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) navigate("/");
  }, [navigate]);

  // ✅ Register for Webinar
  const handleRegister = (id) => {
    if (registered.includes(id)) {
      alert("You have already registered for this webinar!");
      return;
    }

    const updated = [...registered, id];
    setRegistered(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
    alert("Successfully registered!");
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="user-page">
      <div className="header">
        <h1>Welcome to User Page</h1>
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Webinars */}
      <h2>Available Webinars</h2>
      {webinars.length === 0 ? (
        <p>No webinars available right now.</p>
      ) : (
        <div className="webinar-list">
          {webinars.map((webinar) => (
            <div className="webinar-card" key={webinar.id}>
              <h3>{webinar.title}</h3>
              <p><strong>Date:</strong> {webinar.date}</p>
              <p>{webinar.description}</p>
              {webinar.link && (
                <p>
                  <a href={webinar.link} target="_blank" rel="noopener noreferrer">
                    Join Link
                  </a>
                </p>
              )}
              <button
                className="btn btn-register"
                onClick={() => handleRegister(webinar.id)}
                disabled={registered.includes(webinar.id)}
              >
                {registered.includes(webinar.id) ? "Registered" : "Register"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Resources */}
      <div className="resources-section">
        <h2>Post-event Resources</h2>
        {resources.length === 0 ? (
          <p>No resources uploaded yet.</p>
        ) : (
          <ul>
            {resources.map((res) => (
              <li key={res.id}>
                <strong>{res.name}</strong> — {res.desc} —{" "}
                <a href={res.fileURL} download>
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
