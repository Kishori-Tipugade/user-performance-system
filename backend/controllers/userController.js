const usersData = require("../data/users.json");
const cleanData = require("../utils/cleanData");
const calculateScore = require("../services/scoreService");

// GET /users
exports.getUsers = (req, res) => {
  let cleaned = cleanData(usersData);

  // attach score + category
  cleaned = cleaned.map((user) => {
    const { score, category } = calculateScore(user);
    return { ...user, score, category };
  });

  // SORT FIX (important)
  cleaned.sort((a, b) => b.score - a.score);

  res.json(cleaned);
};

// GET /score/:id
exports.getScore = (req, res) => {
  const id = parseInt(req.params.id);
  const cleaned = cleanData(usersData);

  const user = cleaned.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(calculateScore(user));
};

// GET /filter
exports.filterUsers = (req, res) => {
  const { category } = req.query;

  const valid = ["High", "Medium", "Low"];

  if (!valid.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  let cleaned = cleanData(usersData);

  cleaned = cleaned.map((user) => {
    const { score, category: cat } = calculateScore(user);
    return { ...user, score, category: cat };
  });

  const result = cleaned.filter((u) => u.category === category);

  res.json(result);
};