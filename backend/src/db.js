import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const examples = [
  ['01', 'Parqueo Fácil', 'Aplicación de gestión de estacionamientos con control de plazas, entradas, salidas y cobros.', 'Next.js · NestJS · SQLite', 'Producto web', 'https://github.com/marcos7-eri/PracticaMVP'],
  ['02', 'Panel de datos', 'Concepto de tablero para explorar métricas y convertir datos en decisiones claras.', 'React · Visualización', 'Proyecto de muestra', ''],
  ['03', 'Agenda inteligente', 'Concepto de agenda digital para organizar actividades y prioridades de un equipo pequeño.', 'TypeScript · API REST', 'Proyecto de muestra', '']
];

export function createDb(filename = ':memory:') {
  if (filename !== ':memory:') fs.mkdirSync(path.dirname(filename), {recursive:true});
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, number TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, stack TEXT NOT NULL, category TEXT NOT NULL, url TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL);`);
  if (db.prepare('SELECT COUNT(*) AS total FROM projects').get().total === 0) {
    const add = db.prepare('INSERT INTO projects (number,title,description,stack,category,url) VALUES (?,?,?,?,?,?)');
    for (const item of examples) add.run(...item);
  }
  return db;
}
