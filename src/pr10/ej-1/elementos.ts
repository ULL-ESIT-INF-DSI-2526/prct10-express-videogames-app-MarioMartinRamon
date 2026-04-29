export enum Plataforma {
  PC = "PC",
  PlayStation = "PlayStation",
  Xbox = "Xbox",
  NintendoSwitch = "Nintendo Switch",
  Steam = "Steam",
}

export enum Genero {
  Acción = "Acción",
  Aventura = "Aventura",
  Rol = "Rol",
  Estrategia = "Estrategia",
  Deportes = "Deportes",
  Simulación = "Simulación",
}

export interface videojuego {
  id: number;
  nombre: string;
  descripcion: string;
  plataformas: Plataforma[];
  genero: Genero;
  desarrolladora: string;
  ano_lanzamiento: number;
  multijugador: boolean;
  horas_juego: number;
  valor_mercado: number;
}

export type Respuesta = {
  success: boolean;
  videogames?: videojuego[];
};