// src/services/pqrsService.ts
//sr
import { getAuthToken, getCurrentUser } from "./authService";

const API_URL =
  "https://citasalud-feature5-h6aqfke8h8c2c3ha.canadacentral-01.azurewebsites.net";

// ---------------------------
// Tipos
// ---------------------------
export interface PQRSRequest {
  usuarioId: number;
  tipoId: number;
  estadoId: number;
  estadoTexto: string;
  descripcion: string;
  fechaDeGeneracion: string;
  radicado: string;
  fechaDeRespuesta: string | null;
  respuesta: string | null;
}

export interface PQRSResponse {
  idPqrs: number;
  radicado: string;
  estadoTexto: string;
}

export interface UsuarioResponse {
  idUsuario: number;
  nombre: string;
  email: string;
  username: string;
  rol: string;
}

// ---------------------------
// Utilidades
// ---------------------------

// 🔹 Generar radicado único
export const generarRadicado = (): string => {
  const now = new Date();
  const timestamp = now.getTime().toString(36);
  const random = Math.floor(Math.random() * 10000).toString(36);
  return `PQRS-${timestamp}-${random}`.toUpperCase();
};

// ---------------------------
// Servicios principales
// ---------------------------

// 🔹 Obtener usuario por username
export const getUsuarioByUsername = async (
  username: string
): Promise<UsuarioResponse> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Token no disponible.");

    const response = await fetch(
      `${API_URL}/usuarios/${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la información del usuario.");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error en getUsuarioByUsername:", error);
    throw new Error(error.message || "Error al consultar el usuario.");
  }
};


// 🔹 Crear nueva PQRS
export const crearPQRS = async (
  pqrs: PQRSRequest,
  token?: string
): Promise<PQRSResponse> => {
  try {
    const authToken = token || getAuthToken();
    if (!authToken) throw new Error("Token no disponible.");

    const response = await fetch(`${API_URL}/pqrs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(pqrs),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al registrar la PQRS.");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error en crearPQRS:", error);
    throw new Error(error.message || "Error al enviar la PQRS.");
  }
};

// 🔹 Obtener PQRS de un usuario (opcional)
export const getPQRSByUser = async (usuarioId: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Token no disponible.");

    const response = await fetch(`${API_URL}/pqrs/usuario/${usuarioId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las PQRS del usuario.");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error en getPQRSByUser:", error);
    throw new Error(error.message || "Error al obtener PQRS.");
  }
};

// 🔹 Obtener PQRS por radicado (opcional)
export const getPQRSByRadicado = async (radicado: string) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Token no disponible.");

    const response = await fetch(`${API_URL}/pqrs/radicado/${radicado}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al consultar PQRS por radicado.");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error en getPQRSByRadicado:", error);
    throw new Error(error.message || "Error al consultar PQRS.");
  }
};

