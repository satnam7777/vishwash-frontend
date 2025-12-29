// app/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// -------------------- AUTH --------------------

export async function signin(email: string, password: string) {
  console.log("📤 API: Sending signin request to:", `${API_BASE_URL}/api/auth/login`);
  console.log("📤 API: Request body:", { email, password });
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    console.log("📥 API: Response status:", res.status);
    const data = await res.json();
    console.log("📥 API: Response data:", data);

    if (!res.ok) {
      throw new Error(data.message || "Signin failed");
    }

    return data; // { token, user, message }
  } catch (error) {
    console.error("❌ API: Fetch error:", error);
    throw error;
  }
}

export async function signup({ username, email, password }: { username: string; email: string; password: string }) {
  console.log("📤 API: Sending signup request to:", `${API_BASE_URL}/api/auth/register`);
  console.log("📤 API: Request body:", { username, email, password });
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");
    return data;
  } catch (error) {
    console.error("❌ API: Fetch error:", error);
    throw error;
  }
}

export async function verifyToken(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Token verification failed");
  return data;
}

export async function getUserProfile(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to get user profile");
  return data;
}

export async function logout(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Logout failed");
  return data;
}

// -------------------- STOCKS --------------------

export const getStocks = async () => {
  const res = await fetch(`${API_BASE_URL}/api/dashboard/stocks`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch stocks');
  return res.json();
};

export const getStock = async (symbol: string) => {
  const res = await fetch(`${API_BASE_URL}/api/dashboard/stocks/${symbol}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch stock');
  return res.json();
};

export const getStockHistory = async (symbol: string) => {
  const res = await fetch(`${API_BASE_URL}/api/dashboard/stocks/${symbol}/history`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
};
