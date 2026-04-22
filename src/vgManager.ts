import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import { videojuego } from "./elementos.js";
import { error } from "console";


const getFilePath = (user: string, id: number) => `./${user}/${id}.json`;

const existe = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
};

const crearCarpetaUsuario = async (user: string) => {
  const dirPath = `./${user}`;
  if (!(await existe(dirPath))) {
    await fs.promises.mkdir(dirPath, { recursive: true });
  }
};

export const Add = async (user: string, game: videojuego): Promise<void> => {

  await crearCarpetaUsuario(user);
  const filePath = getFilePath(user, game.id);

  if (await existe(filePath)) {
    throw new Error(`El juego "${game.nombre}" ya existe para el usuario "${user}".`);
  }
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(game));
  } catch (error) {
    throw new Error(`Error al agregar el juego "${game.nombre}" para el usuario "${user}".`);
  }
};

export const Remove = async (user: string, id: number): Promise<void> => {
  const filePath = getFilePath(user, id);

  if (!(await existe(filePath))) {
    throw new Error(`El juego con ID "${id}" no existe para el usuario "${user}".`);
  }
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    throw new Error(`Error al eliminar el juego con ID "${id}" para el usuario "${user}".`);
  }
};


export const Modi = async (user: string, game: videojuego): Promise<void> => {
  const filePath = getFilePath(user, game.id);
  if (!(await existe(filePath))) {
    throw new Error(`El juego "${game.nombre}" no existe para el usuario "${user}".`);
  }
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(game));
  } catch (error) {
    throw new Error(`Error al modificar el juego "${game.nombre}" para el usuario "${user}".`);
  }
};

export const List = async (user: string, games?: videojuego[]): Promise<videojuego[]> => {
  const userDir = `./${user}`;

  if (!(await existe(userDir))) {
    console.log(chalk.red(`El usuario "${user}" no tiene juegos registrados.`));
    return [];
  }
  try {
    const files = await fs.promises.readdir(userDir);
    const games: videojuego[] = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = `${userDir}/${file}`;
        try {
          const gameData = await fs.promises.readFile(filePath, "utf-8");
          const game: videojuego = JSON.parse(gameData);
          games.push(game);
        } catch (error) {
          console.log(chalk.red(`Error al leer o parsear el archivo "${file}" para el usuario "${user}".`));
        }
      }
    }
    return games;
  } catch (error) {
    console.log(chalk.red(`Error al leer el directorio del usuario "${user}".`));
    return [];
  }
};

export const Read = async (user: string, id: number, game?: videojuego[]): Promise<videojuego> => {
  const filePath = getFilePath(user, id);

  if (!fs.existsSync(filePath)) {
    throw new Error(`El juego con ID "${id}" no existe para el usuario "${user}".`);
  }
  try {
    const gameData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(gameData) as videojuego;
  } catch (error) {
      throw new Error(`Error al leer o parsear el juego con ID "${id}" para el usuario "${user}".`);
  }
};