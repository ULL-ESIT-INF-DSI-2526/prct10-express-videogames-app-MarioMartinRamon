import { stado, Personaje } from './t_i.js';
export declare const findCharacter: (name?: string, status?: stado, species?: string, gender?: string) => Promise<Personaje[] | undefined>;
