import { describe, it, expect, beforeAll } from 'vitest';
import { connect } from 'mongoose';
import { createBook, getAllBooks, getLibroByIdMongo, updateBook, deleteBook, filtroLibros } from '../src/pr11/repaso-ops.js';
import { Book } from '../src/pr11/repaso.js';

beforeAll(() => {
    connect("mongodb://localhost:27017/repaso").then(() => {
    console.log("Conexión exitosa a MongoDB");
}).catch((error) => {
    console.error("Error al conectar a MongoDB");
});
});

describe('Pruebas de la función createNewBook en BD real', () => {

    it('Debería crear un libro exitosamente en la base de datos', () => {
        const nuevoLibro = {
            title: "Dune",
            autor: "Frank Herbert",
            isbn: "9780441172719"
        };

        return createBook(nuevoLibro).then((savedBook) => {
            expect(savedBook).toBeDefined();
            expect(savedBook.title).toBe("Dune");
        });
    });

    it('Debería fallar al crear un libro con ISBN no válido', () => {
        const libroInvalido = {
            title: "Libro Inválido",
            autor: "Autor Desconocido",
            isbn: "1234567890"
        };

        return createBook(libroInvalido).catch((error) => {
            expect(error).toBeDefined();
            expect(error.message).toContain("El ISBN debe ser un número de 13 dígitos");
        });
    });

    it('Debería fallar al crear un libro con título con espacios al inicio o al final', () => {
        const libroInvalido = {
            title: "  Título Inválido  ",
            autor: "Autor Desconocido",
            isbn: "9781234567897"
        };

        return createBook(libroInvalido).catch((error) => {
            expect(error).toBeDefined();
            expect(error.message).toContain("El título no puede tener espacios al inicio o al final");
        });
    });
});

describe('Pruebas de la función getAllBooks en BD real', () => {

    it('Debería obtener todos los libros sin filtros', () => {
        return getAllBooks().then((books) => {
            expect(Array.isArray(books)).toBe(true);
            expect(books.length).toBeGreaterThan(0);
            expect(books[0]).toHaveProperty('title');
            expect(books[0].title).toBe("Dune");
        });
    });

    it('Debería obtener libros filtrados por género', () => {
        const filtro: filtroLibros = { genre: 'Science' };
        return getAllBooks(filtro).then((books) => {
            expect(Array.isArray(books)).toBe(true);
            books.forEach(book => {
                expect(book.genre).toBe('Science');
            });
        });
    });

    it('Debería obtener libros filtrados por autor', () => {
        const filtro: filtroLibros = { author: 'Frank Herbert' };
        return getAllBooks(filtro).then((books) => {
            expect(Array.isArray(books)).toBe(true);
            books.forEach(book => {
                expect(book.autor).toBe('Frank Herbert');
            });
        });
    });

    it('Debería obtener libros filtrados por género y autor', () => {
        const filtro: filtroLibros = { genre: 'Science', author: 'Frank Herbert' };
        return getAllBooks(filtro).then((books) => {
            expect(Array.isArray(books)).toBe(true);
            books.forEach(book => {
                expect(book.genre).toBe('Science');
                expect(book.autor).toBe('Frank Herbert');
            });
        });
    });
});

describe('Pruebas de la función updateBook en BD real', () => {

    it('Debería actualizar un libro existente', () => {
        const nuevoLibro = {
            title: "Harry Potter",
            autor: "J.K. Rowling",
            isbn: "9780545582889"
        };

        return createBook(nuevoLibro).then((savedBook) => {
            const updateData = { pages: 412, available: true };
            return updateBook(savedBook._id.toString(), updateData).then((updatedBook) => {
                expect(updatedBook).toBeDefined();
                expect(updatedBook?.pages).toBe(412);
                expect(updatedBook?.available).toBe(true);
            });
        });
    });

    it('Debería fallar al intentar actualizar el ISBN de un libro', () => {
        const nuevoLibro = {
            title: "Los Juegos del Hambre",
            autor: "Suzanne Collins",
            isbn: "9780439023528"
        };

        return createBook(nuevoLibro).then((savedBook) => {
            const updateData = { isbn: "9781234567897" };
            return updateBook(savedBook._id.toString(), updateData).catch((error) => {
                expect(error).toBeDefined();
                expect(error.message).toContain("ISBN no se puede actualizar");
            });
        });
    });
});

// describe('Pruebas de la función deleteBook en BD real', () => {
// 
//     it('Debería eliminar un libro existente', () => {
//         const nuevoLibro = {
//             title: "El Hobbit",
//             autor: "J.R.R. Tolkien",
//             isbn: "9780547928227"
//         };
// 
//         return createBook(nuevoLibro).then((savedBook) => {
//             return deleteBook(savedBook._id.toString()).then((deletedBook) => {
//                 expect(deletedBook).toBeDefined();
//                 expect(deletedBook?._id.toString()).toBe(savedBook._id.toString());
//             });
//         });
//     });
// 
//     it('Debería retornar null al intentar eliminar un libro que no existe', () => {
//         const idInexistente = "64b8f0c2f1a2b3c4d5e6f7g";
//         return deleteBook(idInexistente).then((deletedBook) => {
//             expect(deletedBook).toBeNull();
//         });
//     });
// });

// describe('Pruebas de la función getLibroByIdMongo en BD real', () => {
// 
//     it('Debería obtener un libro por su ID', () => {
//         const nuevoLibro = {
//             title: "1984",
//             autor: "George Orwell",
//             isbn: "9780451524935"
//         };
// 
//         return createBook(nuevoLibro).then((savedBook) => {
//             return getLibroByIdMongo(savedBook._id.toString()).then((foundBook) => {
//                 expect(foundBook).toBeDefined();
//                 expect(foundBook?._id.toString()).toBe(savedBook._id.toString());
//                 expect(foundBook?.title).toBe("1984");
//             });
//         });
//     });
// });