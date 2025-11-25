// src/services/pqrsService.ts
import { getAuthToken, getCurrentUser } from "./authService";

const API_URL =
  "https://citasalud-feature5-h6aqfke8h8c2c3ha.canadacentral-01.azurewebsites.net";

// ---------------------------
// Tipos
// ---------------------------
export interface PQRSRequest {
  tipoId: number;
  estadoId: number;
  descripcion: string;
  fechaDeGeneracion: string;
  radicado: string;
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

export interface PQRSItem {
  idPqrs: number;
  idUsuario: number;
  descripcion: string;
  fechaDeGeneracion: string;
  radicado: string;
  tipo: {
    idTipo: number;
    descripcion: string;
  };
  estado: {
    idEstado: number;
    descripcion: string;
  };
  fechaDeRespuesta: string | null;
  respuesta: string | null;
  // Campos planos opcionales (para compatibilidad)
  idTipo?: number;
  idEstado?: number;
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
      `${API_URL}/usuarios/nickname/${encodeURIComponent(username)}`,
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


// 🔹 Obtener PQRS de un usuario (adaptado al nuevo formato)
export const getPQRSByUser = async (usuarioId: number): Promise<PQRSItem[]> => {
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
      const errorText = await response.text();
      throw new Error(errorText || "Error al obtener las PQRS del usuario.");
    }

    const data = await response.json();

    // 🔹 Normalizamos la estructura para que el front no se rompa
    return data.map((item: any) => ({
      idPqrs: item.idPqrs,
      idUsuario: item.idUsuario,
      descripcion: item.descripcion,
      fechaDeGeneracion: item.fechaDeGeneracion,
      radicado: item.radicado,
      tipo: item.tipo,
      estado: item.estado,
      fechaDeRespuesta: item.fechaDeRespuesta,
      respuesta: item.respuesta,
      idTipo: item.tipo?.idTipo ?? item.idTipo,
      idEstado: item.estado?.idEstado ?? item.idEstado,
    }));
  } catch (error: any) {
    console.error("Error en getPQRSByUser:", error);
    throw new Error(error.message || "Error al obtener PQRS.");
  }
};


// 🔹 Obtener todas las PQRS (para el GESTOR)
export const getAllPQRS = async (): Promise<PQRSItem[]> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Token no disponible.");

    const response = await fetch(`${API_URL}/pqrs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok) throw new Error("Error al obtener todas las PQRS");

    const data = await response.json();

    return data.map((item: any) => ({
      idPqrs: item.idPqrs,
      idUsuario: item.idUsuario,
      descripcion: item.descripcion,
      fechaDeGeneracion: item.fechaDeGeneracion,
      radicado: item.radicado,
      tipo: item.tipo,
      estado: item.estado,
      fechaDeRespuesta: item.fechaDeRespuesta,
      respuesta: item.respuesta,
      idTipo: item.tipo?.idTipo ?? item.idTipo,
      idEstado: item.estado?.idEstado ?? item.idEstado,
    }));
  } catch (error: any) {
    console.error("Error en getAllPQRS:", error);
    throw new Error(error.message);
  }
};


// 🔥 PUT CORREGIDO: ahora envía EXACTAMENTE lo que espera el backend
export const updatePQRS = async (
  id: number,
  pqrs: PQRSItem
): Promise<void> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Token no disponible.");

    const body = {
      idPqrs: pqrs.idPqrs,
      idUsuario: pqrs.idUsuario,

      tipo: {
        idTipo: pqrs.tipo.idTipo,
        descripcion: pqrs.tipo.descripcion,
      },

      descripcion: pqrs.descripcion,
      fechaDeGeneracion: pqrs.fechaDeGeneracion,
      radicado: pqrs.radicado,

      estado: {
        idEstado: pqrs.estado.idEstado,
        descripcion: pqrs.estado.descripcion,
      },

      fechaDeRespuesta: pqrs.fechaDeRespuesta,
      respuesta: pqrs.respuesta,

      idTipo: pqrs.tipo.idTipo,
      idEstado: pqrs.estado.idEstado,
    };

    const response = await fetch(`${API_URL}/pqrs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "No se pudo actualizar la PQRS");
    }
  } catch (error: any) {
    console.error("Error en updatePQRS:", error);
    throw new Error(error.message);
  }
};



