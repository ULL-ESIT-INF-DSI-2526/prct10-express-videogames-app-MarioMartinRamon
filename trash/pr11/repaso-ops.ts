import { Book, BookDocument } from "./repaso.js";

export function createBook(bookData: Partial<BookDocument>): Promise<BookDocument> {
    const newBook = new Book(bookData);
    return newBook.save().then((savedBook) => {
        console.log("Libro creado:", savedBook);
        return savedBook;
    }).catch((error) => {
        console.error("Error al crear el libro:", error);
        throw error;
    });
}

export interface filtroLibros {
    genre?: 'Fiction' | 'NonFiction' | 'Science' | 'History';
    author?: string;
}

export function getAllBooks(filtro: filtroLibros = {}): Promise<BookDocument[]> {
    const filter: any = {};
    if (filtro.genre) {
        filter.genre = filtro.genre;
    }
    if (filtro.author) {
        filter.author = filtro.author;
    }
    return Book.find(filter).then((books) => {
        console.log("Libros encontrados:", books);
        return books;
    }).catch((error) => {
        console.error("Error al obtener los libros:", error);
        throw error;
    });
}

export function getLibroByIdMongo(id: string): Promise<BookDocument | null> {
    return Book.findById(id).then((book) => {
        if (book) {
            console.log("Libro encontrado:", book);
            return book;
        } else {
            console.log("Libro no encontrado con ID:", id);
            return null;
        }
    }).catch((error) => {
        console.error("Error al obtener el libro por ID:", error);
        throw error;
    });
}

export function updateBook(id: string, updateData: Partial<BookDocument>): Promise<BookDocument | null> {
    const { isbn, ...restoUpdateData } = updateData;
    
    return Book.findByIdAndUpdate(id, restoUpdateData, { new: true, runValidators: true }).then((updatedBook) => {
        if (updatedBook) {
            console.log("Libro actualizado:", updatedBook);
            return updatedBook;
        } else {
            console.log("Libro no encontrado para actualizar con ID:", id);
            return null;
        }
    }).catch((error) => {
        console.error("Error al actualizar el libro:", error);
        throw error;
    });
}

export function deleteBook(id: string): Promise<BookDocument | null> {
    return Book.findByIdAndDelete(id).then((deletedBook) => {
        if (deletedBook) {
            console.log("Libro eliminado:", deletedBook);
            return deletedBook;
        } else {
            console.log("Libro no encontrado para eliminar con ID:", id);
            return null;
        }
    }).catch((error) => {
        console.error("Error al eliminar el libro:", error);
        throw error;
    });
}