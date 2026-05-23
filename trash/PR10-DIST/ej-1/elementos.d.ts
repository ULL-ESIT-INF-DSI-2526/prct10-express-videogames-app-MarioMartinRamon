export declare enum Plataforma {
    PC = "PC",
    PlayStation = "PlayStation",
    Xbox = "Xbox",
    NintendoSwitch = "Nintendo Switch",
    Steam = "Steam"
}
export declare enum Genero {
    Acción = "Acci\u00F3n",
    Aventura = "Aventura",
    Rol = "Rol",
    Estrategia = "Estrategia",
    Deportes = "Deportes",
    Simulación = "Simulaci\u00F3n"
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
