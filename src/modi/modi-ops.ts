import { Trail, TrailDocument } from './modi.js'

/**
 * Crea un trail
 * @param trailData - Objeto
 * @returns Promesa
 */
export function createRoute(trailData): Promise<TrailDocument> {
    const newRoute = new Trail(trailData);
    return newRoute.save().then((saved) => {
        return saved;
    }).catch((error) => {
        throw error;
    });
};

export interface Filtrillo {
    difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Expert',
    locationCountry?: string
};

export function getAllRoutes(filtro: Filtrillo = {}): Promise<TrailDocument[]> {
    const filtrillo = {};
    if (filtro.difficulty) {
        filtrillo['difficulty'] = filtro.difficulty
    }
    if (filtro.locationCountry) {
        filtrillo['locationCountry'] = filtro.locationCountry
    }
    return Trail.find(filtrillo).then((trails) => {
        return trails
    }).catch((error) => {
        console.error("Error al obtener trails");
        throw error;
    });
};

export function getTrailbyId(id: string): Promise<TrailDocument | null> {
    return Trail.findById(id).then((trail) => {
        if (trail) {
            console.log("Trail encontrado:", trail);
            return trail;
        } else {
            console.log("Trail no encontrado con ID:", id);
            return null;
        }
    }).catch((error) => {
        console.error("Error al obtener el Trail por ID:", error);
        throw error;
    });
};

export function updateTrail(id: string, updateData): Promise<TrailDocument | undefined> {
    const {createdAt, ...resto} = updateData;
    return Trail.findByIdAndUpdate(id, resto, {new: true, runValidators: true}).then((actualizado) => {
        if(actualizado) {
            console.log("Actualizacion hecha");
            return actualizado;
        }
    }).catch((error) => {
        console.error("Error al actualizar el trail");
        throw error;
    });
}

export function eraseRoutebyId(id: string): Promise<TrailDocument | null> {
    return Trail.findByIdAndDelete(id).then((trail) => {
        if (trail) {
            console.log("Trail borrado:", trail);
            return trail;
        } else {
            console.log("Trail no encontrado con ID:", id);
            return null;
        }
    }).catch((error) => {
        console.error("Error al obtener el Trail por ID:", error);
        throw error;
    });
};