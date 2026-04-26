const cleanData = (users) => {
  return users.map((user) => ({
    id: user.id,
    name: user.name || "Unknown",
    age: user.age || 0,
    activity: user.activity || {} // KEEP FULL OBJECT
  }));
};

module.exports = cleanData;