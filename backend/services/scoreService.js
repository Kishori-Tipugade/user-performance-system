const calculateScore = (user) => {
  const values = Object.values(user.activity || {});

  const total = values.reduce((sum, val) => {
    return typeof val === "number" ? sum + val : sum;
  }, 0);

  let category = "Low";
  if (total > 20) category = "High";
  else if (total > 10) category = "Medium";

  return { score: total, category };
};

module.exports = calculateScore;