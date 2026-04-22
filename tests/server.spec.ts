import axios from 'axios';
import { describe, it, expect } from 'vitest';
import { videojuego, Plataforma, Genero } from '../src/elementos.js';

const API_URL = 'http://localhost:3000/videogames';
const TEST_USER = 'vitest_user';

const testVideogame: videojuego = {
    id: 999,
  nombre: "Juego de Prueba",
  descripcion: "Un juego creado por Vitest",
  plataformas: ["PC" as Plataforma],
  genero: "Acción" as Genero,
  desarrolladora: "Test Devs",
  ano_lanzamiento: 2026,
  multijugador: false,
  horas_juego: 10,
  valor_mercado: 19.99
};

describe('Videogame API', () => {
    it('POST', async () => {
        const response = await axios.post(`${API_URL}?user=${TEST_USER}`, testVideogame);
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject({ success: true });
    }
    );

    it('GET', async () => {
        const response = await axios.get(`${API_URL}?user=${TEST_USER}`);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.videogames.length).toBeGreaterThan(0);
        expect(response.data.videogames[0].id).toBe(999);
    }
    );

    it('PUT', async () => {
        const updatedData = { ...testVideogame, nombre: "Juego de Prueba Actualizado" };
        const response = await axios.put(`${API_URL}?user=${TEST_USER}`, updatedData);
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject({ success: true });
    }
    );

    it('DELETE', async () => {
        const response = await axios.delete(`${API_URL}?user=${TEST_USER}&id=999`);
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject({ success: true });
    }
    );
});