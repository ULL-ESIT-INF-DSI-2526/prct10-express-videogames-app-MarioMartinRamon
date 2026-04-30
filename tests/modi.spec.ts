import { describe, it, expect, beforeAll } from 'vitest';
import { connect } from 'mongoose';
import { createRoute, Filtrillo, getAllRoutes, getTrailbyId, updateTrail, eraseRoutebyId} from '../src/modi/modi-ops.js';
import { Trail } from '../src/modi/modi.js';

beforeAll(() => {
    connect("mongodb://localhost:27017/repaso").then(() => {
    console.log("Conexión exitosa a MongoDB");
}).catch((error) => {
    console.error("Error al conectar a MongoDB");
});
});

describe('Creacion base Datos', () => {
    it('Deberia crear un trail', () => {

        const Localizacion = {
            country: 'Ibiza',
            region: 'Espana',
            coordinates: {
                lat: 0,
                lng: 170
            }
        }

        const nuevoTrail = {
            name: 'OLELOSCARACOLES',
            description: 'Muy duro',
            distanceKm: 10,
            elevationGainM: 2,
            durationMinutes: 5,
            location: Localizacion,
            tags: ['ole', 'yeaaa'],
        }
        return createRoute(nuevoTrail).then((saved) => {
            expect(saved).toBeDefined();
            expect(saved.name).toBe("OLELOSCARACOLES");
        })
    })
});

describe('Obtener todas las rutas', () => {
    it('Deberia obtener el trail', () => {

        return getAllRoutes().then((trails) => {
            expect(Array.isArray(trails)).toBe(true);
            expect(trails.length).toBeGreaterThan(0);
            expect(trails[0]).toHaveProperty('name');
            expect(trails[0].name).toBe("yas");
        })
    })
});

describe('Actualizar trail', () => {
    it('Deberia actualizar el trail', () => {

        const Localizacion = {
            country: 'Ibiza',
            region: 'Espana',
            coordinates: {
                lat: 0,
                lng: 170
            }
        }

        const nuevoTrail = {
            name: 'NUEVO',
            description: 'Muy duro',
            distanceKm: 10,
            elevationGainM: 2,
            durationMinutes: 5,
            location: Localizacion,
            tags: ['ole', 'yeaaa'],
        }
        return updateTrail('69f334fb314698dca2839168', nuevoTrail).then((saved) => {
            expect(saved).toBeDefined();
        })
    })
})

describe('Obtener trail', () => {
    it('Deberia obtener el trail', () => {
        return getTrailbyId('69f334fb314698dca2839168').then((saved) => {
            expect(saved).toBeDefined();
        })
    })
})


describe('Borrar trail', () => {
    it('Deberia borrar el trail', () => {
        return eraseRoutebyId('69f334fb314698dca2839168').then((saved) => {
            expect(saved).toBeDefined();
        })
    })
})



