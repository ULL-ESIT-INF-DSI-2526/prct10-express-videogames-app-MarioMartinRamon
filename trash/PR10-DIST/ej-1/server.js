import express from 'express';
import { Add, Remove, Modi, List } from './vgManager.js';
const app = express();
app.use(express.json());
app.post('/videogames', async (req, res) => {
    const user = req.query.user;
    const game = req.body;
    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }
    Add(user, game).then(() => {
        const response = { success: true };
        res.status(200).json(response);
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'Error al agregar el videojuego.' });
    });
});
app.delete('/videogames', async (req, res) => {
    const user = req.query.user;
    const id = parseInt(req.query.id);
    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'El parámetro "id" no es un número válido.' });
    }
    Remove(user, id).then(() => {
        const response = { success: true };
        res.status(200).json(response);
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'Error al eliminar el videojuego.' });
    });
});
app.put('/videogames', async (req, res) => {
    const user = req.query.user;
    const game = req.body;
    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }
    Modi(user, game).then(() => {
        const response = { success: true };
        res.status(200).json(response);
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'Error al modificar el videojuego.' });
    });
});
app.get('/videogames', async (req, res) => {
    const user = req.query.user;
    if (!user) {
        return res.status(400).json({ success: false, message: 'El parámetro "user" falta en la url.' });
    }
    List(user).then((games) => {
        if (req.query.id) {
            const id = parseInt(req.query.id);
            const game = games.find((g) => g.id === id);
            if (!game) {
                return res.status(404).json({ success: false, message: 'Videojuego no encontrado.' });
            }
            const response = { success: true, videogames: [game] };
            res.status(200).json(response);
        }
        else {
            const response = { success: true, videogames: games };
            res.status(200).json(response);
        }
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'Error al obtener los videojuegos.' });
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
//# sourceMappingURL=server.js.map