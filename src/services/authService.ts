// src/services/authService.ts
export interface LoginRequest {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  message?: string;
  // agrega otros campos que tu backend devuelva
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch("https://citasalud-feature5-h6aqfke8h8c2c3ha.canadacentral-01.azurewebsites.net/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en la autenticación");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error en login:", error);
    throw new Error(error.message || "Error de conexión con el servidor");
  }
};
