import { Document, connect, model, Schema } from "mongoose";
import validator from "validator";

export interface LocationDocument extends Document {
    country: string,
    region: string,
    coordinates?: {
        lat: number,
        lng: number
    }
}

export interface TrailDocument extends Document {
    name: string,
    description?: string,
    difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Expert',
    distanceKm: number,
    elevationGainM?: number,
    durationMinutes: number,
    location?: LocationDocument,
    tags?: string[],
    createdAt: Date
}

export const LocationsSchema = new Schema<LocationDocument> ({
    country: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    coordinates: {
        type: Object,
        validate: {
            validator: (value) => {
                if (!validator.default.isInt(value.lat.toString(), {min: -90, max: 90}) || !validator.default.isInt(value.lng.toString(), {min: -180, max: 180})) {
                    throw new Error("Introduzca bien latitud y longitud")
                }
            }
        }
    }
});

export const trails = new Schema<TrailDocument> ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        validate: (value: string) => {
          if(!validator.default.isLength(value, {min: 0, max: 500})) {
            throw new Error("La descripción debe tener entre 0 y 500 caracteres")
          }
        }
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Hard', 'Expert']
    },
    distanceKm: {
        type: Number,
        required: true,
        validate: (value: number) => {
            if(value < 0) {
                throw new Error("La distancia debe ser mayor o igual a cero")
            }
        }
    },
    elevationGainM: {
        type: Number,
        validate: (value: number) => {
            if(value < 0) {
                throw new Error("El desnivel debe ser mayor a cero")
            }
        }
    },
    durationMinutes: {
        type: Number,
        required: true,
        validate: (value: number) => {
            if(value < 0) {
                throw new Error("La duración debe ser mayor o igual a cero")
            }
        }
    },
    location: LocationsSchema,
    tags: {
        type: Array<string>,
    },
    createdAt: {
        type: Date,
        default: new Date().getDate()
    }
});

export const Trail = model<TrailDocument>("Trail", trails);