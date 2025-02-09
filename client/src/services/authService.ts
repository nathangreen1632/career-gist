export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};
