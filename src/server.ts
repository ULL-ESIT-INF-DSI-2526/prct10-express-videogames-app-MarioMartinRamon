import express from 'express';
import fs from 'fs';
import { Respuesta, videojuego } from './elementos.js';
import { Add, Remove, Modi, List, Read } from './vgManager.js';

const app = express();

app.use(express.json());

app.post('/videogames', async (req, res) => {
    const user: string = req.query.user as string;
    const game: videojuego = req.body;

    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }

    try {
      await Add(user, game);
      const response: Respuesta = { success: true };
      res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar el videojuego.' });
    }

});

app.delete('/videogames', async (req, res) => {
    const user: string = req.query.user as string;
    const id = parseInt(req.query.id as string);

    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'El parámetro "id" no es un número válido.' });
    }

    try {
        await Remove(user, id);
        const response: Respuesta = { success: true };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el videojuego.' });
    }
});

app.put('/videogames', async (req, res) => {
    const user: string = req.query.user as string;
    const game: videojuego = req.body;

    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }

    try {
        await Modi(user, game);
        const response: Respuesta = { success: true };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al modificar el videojuego.' });
    }
});

app.get('/videogames', async (req, res) => {
    const user: string = req.query.user as string;

    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }

    try {
        if (req.query.id) {
            const id = parseInt(req.query.id as string);
            const game = await Read(user, id);
            const response: Respuesta = { success: true, videogames: [game] };
            res.status(200).json(response);
        } else {
            const games = await List(user);
            const response: Respuesta = { success: true, videogames: games };
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los videojuegos.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});