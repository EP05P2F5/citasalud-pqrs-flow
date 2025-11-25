// src/services/usuariosService.ts

import { getAuthToken } from "./authService";

const API_URL =
  "https://citasalud-feature5-h6aqfke8h8c2c3ha.canadacentral-01.azurewebsites.net";

// ---------------------------
// Tipos
// ---------------------------
export interface Rol {
  idRol: number;
  descripcion: string;
}

export interface GestorUsuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  nickname: string;
  rol: Rol;
  fechaDeNacimiento?: string;
  direccion?: string;
  telefono?: string;
}

// ---------------------------
// Servicio: obtener gestores
// ---------------------------
export const getAllGestores = async (): Promise<GestorUsuario[]> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Token no disponible.");

    const response = await fetch(`${API_URL}/usuarios/gestores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Error al obtener la lista de gestores.");
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error obteniendo gestores:", error);
    throw new Error(error.message || "Error al obtener gestores.");
  }
};


// ---------------------------
// Servicio: crear nuevo gestor
// ---------------------------
export const createGestor = async (gestorData: any) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Token no disponible.");

    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gestorData),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Error al crear gestor.");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error creando gestor:", error);
    throw new Error(error.message || "Error al crear gestor.");
  }
};
