const API_URL = "http://localhost:3000";
const API_KEY = "mi_api_key_123";

// ================= TASKS =================

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/getTasks`, {
    headers: {
      Authorization: API_KEY
    }
  });

  return res.json();
};

export const addTask = async (task, deadline) => {
  const res = await fetch(`${API_URL}/addTask`, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task, deadline })
  });

  return res.json();
};

export const removeTask = async (id) => {
  const res = await fetch(`${API_URL}/removeTask`, {
    method: "DELETE",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  });

  return res.json();
};

// ================= GOALS =================

export const getGoals = async () => {
  const res = await fetch(`${API_URL}/getGoals`, {
    headers: {
      Authorization: API_KEY
    }
  });

  return res.json();
};

export const addGoal = async (goal, deadline) => {
  const res = await fetch(`${API_URL}/addGoal`, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ goal, deadline })
  });

  return res.json();
};

export const removeGoal = async (id) => {
  const res = await fetch(`${API_URL}/removeGoal`, {
    method: "DELETE",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  });

  return res.json();
};