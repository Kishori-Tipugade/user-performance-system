import React, { useEffect, useState } from "react";
import { getUsers, filterUsers } from "./services/api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
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
      setUsers(res.data);
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
        await loadUsers();
        return;
      }

      const res = await filterUsers(cat);
      setUsers(res.data);
    } catch (err) {
      setError("Failed to filter users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>User List</h1>

      {/* FILTER */}
      <div className="filter">
        <label>Filter by Category:</label>
        <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLE */}
      {!loading && !error && (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Posts</th>
              <th>Comments</th>
              <th>Total Activity</th>
              <th>Score</th>
              <th>Category</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.activity?.posts || 0}</td>
                  <td>{u.activity?.comments || 0}</td>

                  {/* ✅ THIS IS WHERE YOU ADD DYNAMIC CALCULATION */}
                  <td>
                    {Object.values(u.activity || {}).reduce(
                      (sum, val) =>
                        typeof val === "number" ? sum + val : sum,
                      0
                    )}
                  </td>

                  {/* Score from backend */}
                  <td>{u.score}</td>

                  <td className={u.category.toLowerCase()}>
                    {u.category}
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
      )}
    </div>
  );
}

export default App;