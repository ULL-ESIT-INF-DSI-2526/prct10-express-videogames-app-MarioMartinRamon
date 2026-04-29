import axios from 'axios';

export interface Category {
    id: number;
    name: string;
}

export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export const getCategories = async (): Promise<Category[]> => {
    // Axios lanza un error automáticamente si falla la red, así que no hace falta el if (!res.ok)
    return axios.get('https://opentdb.com/api_category.php').then((response) => {
        const data = response.data;

        if (!data.trivia_categories || data.trivia_categories.length === 0) {
        throw new Error('La lista de categorías está vacía');
    }

        return data.trivia_categories;
    })
    .catch((error) => {
        throw new Error('Error al obtener las categorías: ' + error.message);
    });
};

export const findQuestions = async (
    category?: number,
    difficulty?: 'easy' | 'medium' | 'hard',
    type?: 'multiple' | 'boolean'
): Promise<Question[]> => {
    
    // construye la URL con los interrogantes y los '&'
    return axios.get('https://opentdb.com/api.php', {
        params: {
            amount: 10,
            category: category,
            difficulty: difficulty,
            type: type
        }
    }).then((response) => {
        const data =  response.data;
        if (data.response_code !== 0 || !data.results || data.results.length === 0) {
        throw new Error('No se encontraron resultados para los filtros aplicados');
        }
        return data.results;
    }).catch((error) => {
        throw new Error('Error al obtener las preguntas: ' + error.message);
    });
};