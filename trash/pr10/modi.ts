import axios from 'axios'
import { stado, Episode, Personaje } from './t_i.js'

export const findCharacter = (name?: string, status?: stado, species?: string, gender?: string): Promise<Personaje[]> => {
    return axios.get('https://rickandmortyapi.com/api/character').then((response) => {
        const data = response.data;
        let personajes: Personaje[] = response.data.results;
        if (name) {
           personajes = personajes.filter((persona) => persona.name == name);
        }
        if (status) {
            personajes = personajes.filter((persona) => persona.status == status);
        }
        if (species) {
            personajes = personajes.filter((persona) => persona.species == species);
        }
        if (gender) {
            personajes = personajes.filter((persona) => persona.gender == gender);
        }
        if (personajes[0]) {
            return personajes;
        } 
        return personajes;
    }).catch((error) => {
        throw new Error('Error al obtener personajes: ' + error.message);
    })
};

 export const listEpisodes = (id: number): Promise<Episode[]> => {
     return axios.get('https://rickandmortyapi.com/api/episode').then((response) => {
        const data = response.data.results;
        let eps: Episode[] = []
        for (let i = 0; i < data.length; ++i) {
            let chars = data[i].characters;
            for (let ch of chars) {
                const partes = ch.split('/');
                if(partes[partes.length - 1] == id) {
                    let ep: Episode = {
                        names : data[i].name,
                        air_date : data[i].air_date
                    }
                    eps.push(ep);
                };
            }
        }
        return eps; 
    }).catch((error) => {
        throw new Error('Error al obtener eps: ' + error.message);
    });
};

