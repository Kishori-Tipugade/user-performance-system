import React, { useEffect, useState } from "react";
import { getUsers, filterUsers } from "./services/api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);       // filtered (table)
  const [allUsers, setAllUsers] = useState([]); // full data (stats)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getUsers();

      setUsers(res.data);     // table
      setAllUsers(res.data);  // stats (IMPORTANT)

    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (cat) => {
    try {
      setLoading(true);
      setError("");

      if (!cat) {
        setUsers(allUsers); // reset table only
        return;
      }

      const res = await filterUsers(cat);
      setUsers(res.data); // only table updates

    } catch (err) {
      setError("Failed to filter users");
    } finally {
      setLoading(false);
    }
  };

  
  const totalUsers = allUsers.length;
  const high = allUsers.filter((u) => u.category === "High").length;
  const medium = allUsers.filter((u) => u.category === "Medium").length;
  const low = allUsers.filter((u) => u.category === "Low").length;

  return (
    <div className="container">
      <h1>User Performance Dashboard</h1>

      {/* STATS */}
      <div className="stats">
        <div className="card">Users: {totalUsers}</div>
        <div className="card high-card">High: {high}</div>
        <div className="card medium-card">Medium: {medium}</div>
        <div className="card low-card">Low: {low}</div>
      </div>

      {/* FILTER */}
      <div className="filter">
        <label>Filter:</label>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* TABLE */}
      {!loading && !error && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Posts</th>
                <th>Comments</th>
                <th>Total</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.activity?.posts || 0}</td>
                    <td>{u.activity?.comments || 0}</td>

                    <td>
                      {Object.values(u.activity || {}).reduce(
                        (sum, val) =>
                          typeof val === "number" ? sum + val : sum,
                        0
                      )}
                    </td>

                    <td>{u.score}</td>

                    <td>
                      <span className={`badge ${u.category.toLowerCase()}`}>
                        {u.category}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;