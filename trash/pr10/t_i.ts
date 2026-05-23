export type stado = "Alive" | "Dead" | "Unknown";

export interface Episode {
    names: string,
    air_date: string
}

export interface Personaje {
    id : number,
    name: string,
    status: stado,
    species: string,
    gender: string,
    episodes?: Episode[]
}