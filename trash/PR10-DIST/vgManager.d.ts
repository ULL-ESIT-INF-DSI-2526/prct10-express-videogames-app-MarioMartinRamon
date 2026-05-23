import { videojuego } from "./elementos.js";
export declare const Add: (user: string, game: videojuego) => Promise<void>;
export declare const Remove: (user: string, id: number) => Promise<void>;
export declare const Modi: (user: string, game: videojuego) => Promise<void>;
export declare const List: (user: string, games?: videojuego[]) => Promise<videojuego[]>;
export declare const Read: (user: string, id: number, game?: videojuego[]) => Promise<videojuego>;
