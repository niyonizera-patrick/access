const BASE_URL = "http://localhost:3000/api/categories";

export const fetchCategories = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addCategory = async (category) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return res.json();
};

export const updateCategory = async (id, category) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
