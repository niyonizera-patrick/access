const BASE = "http://localhost:3000/api";

export const fetchStocks = async () => {
  const res = await fetch(`${BASE}/stocks`);
  return res.json();
};

export const fetchAllOptions = async () => {
  const [products, categories, suppliers] = await Promise.all([
    fetch(`${BASE}/products`).then(res => res.json()),
    fetch(`${BASE}/categories`).then(res => res.json()),
    fetch(`${BASE}/suppliers`).then(res => res.json()),
  ]);
  return { products, categories, suppliers };
};

export const addStock = async (stock) => {
  const res = await fetch(`${BASE}/stocks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
  return res.json();
};

export const updateStock = async (id, stock) => {
  const res = await fetch(`${BASE}/stocks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
  return res.json();
};

export const deleteStock = async (id) => {
  const res = await fetch(`${BASE}/stocks/${id}`, { method: "DELETE" });
  return res.json();
};
