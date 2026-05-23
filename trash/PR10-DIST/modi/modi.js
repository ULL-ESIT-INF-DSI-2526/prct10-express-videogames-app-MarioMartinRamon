import axios from 'axios';
export const findCharacter = (name, status, species, gender) => {
    return axios.get('https://rickandmortyapi.com/api/character').then((response) => {
        const data = response.data;
        let personajes = [];
        if (name) {
            personajes.push(data.results.filter((persona) => persona.name == name));
        }
        if (status) {
            personajes.push(data.results.filter((persona) => persona.status == status));
        }
        if (species) {
            personajes.push(data.results.filter((persona) => persona.species == species));
        }
        if (gender) {
            personajes.push(data.results.filter((persona) => persona.gender == gender));
        }
        if (personajes[0]) {
            return personajes;
        }
    }).catch((error) => {
        throw new Error('Error al obtener personajes: ' + error.message);
    });
};
//# sourceMappingURL=modi.js.map