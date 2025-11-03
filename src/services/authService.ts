// src/services/authService.ts
export interface LoginRequest {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  rol: string;
  email: string;
  token: string;
  username: string;
}

const API_URL = "https://citasalud-feature5-h6aqfke8h8c2c3ha.canadacentral-01.azurewebsites.net";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en la autenticación");
    }

    const data: LoginResponse = await response.json();

    // ✅ Guardar sesión
    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error: any) {
    console.error("Error en login:", error);
    throw new Error(error.message || "Error de conexión con el servidor");
  }
};

// ✅ Obtener usuario actual
export const getCurrentUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

// ✅ Obtener token
export const getAuthToken = () => {
  const user = getCurrentUser();
  return user?.token || null;
};

// ✅ Cerrar sesión
export const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/admin-login";
};
