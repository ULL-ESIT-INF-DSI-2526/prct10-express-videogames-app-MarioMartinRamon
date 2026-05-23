import { Document, connect, model, Schema } from "mongoose";
import validator from "validator";

connect("mongodb://localhost:27017/repaso").then(() => {
    console.log("Conexión exitosa a MongoDB");
}).catch((error) => {
    console.error("Error al conectar a MongoDB");
});

export interface BookDocument extends Document {
    title: string;
    autor: string;
    genre?: 'Fiction' | 'NonFiction' | 'Science' | 'History';
    year?: number;
    isbn: string;
    pages?: number;
    available?: boolean;
    rating?: number;
}

export const books = new Schema<BookDocument>({
    title: {
        type: String,
        required: true,
        validate: (value: string) => {
          if(value != value.trim()) {
            throw new Error("El título no puede tener espacios al inicio o al final");
          }
        }
    },
    autor: {
        type: String,
        required: true
    },
    genre: {
      enum: ['Fiction', 'NonFiction', 'Science', 'History']
    },
    year: {
        type: Number,
        validate: (value: number) => {
            if(value < 1000 || value > new Date().getFullYear()) {
                throw new Error("El año debe ser un número de cuatro dígitos y no puede ser mayor al año actual");
            }
        }
    },
    isbn: {
        type: String,
        unique: true,
        required: true,
        validate: (value: string) => {
            if (!validator.default.isISBN(value, 13)) {
                throw new Error("El ISBN debe ser un número de 13 dígitos");
            }
        }
    },
    pages: {
        type: Number,
        validate: (value: number) => {
            if(value <= 0) {
                throw new Error("El número de páginas debe ser un número positivo");
            }
        }
    },
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

export const Book = model<BookDocument>("Book", books);