import axios from 'axios';
import { describe, it, expect } from 'vitest';
import { findCharacter, listEpisodes } from '../src/modi.js'
import { stado, Episode, Personaje } from '../src/t_i.js'

const API_URL = 'https://rickandmortyapi.com/api/character'

const morty: Personaje = {
    id : 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',

}

describe('modificacion', () => {
    it('FindCharacter', () => {
        return findCharacter("Morty Smith").then(response => {
            console.log(response);
            expect(response.length).toBeGreaterThan(0);
            expect(response[0].id).toEqual(2);
        });
    });

    it('Buscar con genero', () => {
        return findCharacter("Morty Smith", "Alive", "Human", "Male").then(response => {
            console.log(response);
            expect(response.length).toBeGreaterThan(0);
            expect(response[0].id).toEqual(2);  
        });
    });

    it('Fallo', () => {
        return findCharacter("Morty Smith", "Dead", "Human", "Male").catch(error => {
            expect(error.message).toBe('Error al obtener personajes: ' + error.message)
    });
});


    it('Listaeps', () => {
        return listEpisodes(1).then(response => {
            expect(response.length).toBeGreaterThan(0);
            expect(response[0].names).toBe("Pilot");
            expect(response[0].air_date).toBe("December 2, 2013");
        });
    });


});
