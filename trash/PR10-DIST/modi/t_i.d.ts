export type stado = "alive" | "dead" | "unknown";
export interface Episode {
    id: number;
    name: string;
}
export interface Personaje {
    id: number;
    name: string;
    status: stado;
    species: string;
    gender: string;
    episodes: Episode[];
}
