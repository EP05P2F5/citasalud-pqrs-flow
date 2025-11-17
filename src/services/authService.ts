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

// ✅ Credenciales de prueba simuladas para desarrollo
const MOCK_USERS = {
  admin: {
    nickname: "admin",
    password: "admin123",
    rol: "Administrador",
    email: "admin@citasalud.com",
    username: "Administrador CITASalud"
  },
  gestor: {
    nickname: "gestor",
    password: "gestor123",
    rol: "Gestor",
    email: "gestor@citasalud.com",
    username: "Gestor PQRS"
  },
  usuario: {
    nickname: "usuario",
    password: "123456",
    rol: "USER",
    email: "usuario@citasalud.com",
    username: "Usuario Paciente"
  }
};

// ✅ Función de autenticación simulada
const mockLogin = (credentials: LoginRequest): LoginResponse => {
  const user = Object.values(MOCK_USERS).find(
    u => u.nickname === credentials.nickname && u.password === credentials.password
  );

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  return {
    rol: user.rol,
    email: user.email,
    token: `mock-token-${Date.now()}`,
    username: user.username
  };
};

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    // Intentar con el backend real primero
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

    // ✅ Guardar sesión completa
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userRole", data.rol);

    return data;
  } catch (error: any) {
    console.warn("Backend no disponible, usando autenticación simulada:", error.message);
    
    // ✅ Si falla el backend, usar autenticación simulada
    try {
      const mockData = mockLogin(credentials);
      localStorage.setItem("user", JSON.stringify(mockData));
      localStorage.setItem("authToken", mockData.token);
      localStorage.setItem("userRole", mockData.rol);
      return mockData;
    } catch (mockError: any) {
      throw new Error(mockError.message || "Credenciales inválidas");
    }
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
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  window.location.href = "/patient-login";
};
