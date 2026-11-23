import { Injectable, BadRequestException, OnModuleDestroy } from '@nestjs/common';
import { createDb } from './db.js';
import { normalizeEmail, normalizeText, validEmail, validMessage, validName } from './domain.js';
import type { DatabaseSync } from 'node:sqlite';

@Injectable()
export class PortfolioService implements OnModuleDestroy {
  private db: DatabaseSync;
  constructor() { this.db = createDb(process.env.DB_FILE || './data/portfolio.sqlite'); }
  onModuleDestroy() { this.db.close(); }
  profile() { return {name:'Erik Salvatierra Choque', age:21, birthYear:2005, role:'Desarrollador web', location:'Bolivia', availability:'Disponible para colaborar', introduction:'Me gusta transformar ideas en productos digitales útiles, claros y fáciles de usar.', skills:['Next.js','NestJS','TypeScript','SQLite','Docker','Terraform']}; }
  projects() { return this.db.prepare('SELECT id, number, title, description, stack, category, url FROM projects ORDER BY id').all(); }
  contact(body: {name?:string; email?:string; message?:string}) {
    const name = normalizeText(body?.name), email = normalizeEmail(body?.email), message = normalizeText(body?.message);
    if (!validName(name) || !validEmail(email) || !validMessage(message)) throw new BadRequestException('Revisa el nombre, correo y mensaje (mínimo 10 caracteres).');
    const createdAt = new Date().toISOString();
    const result = this.db.prepare('INSERT INTO messages (name,email,message,created_at) VALUES (?,?,?,?)').run(name,email,message,createdAt);
    return {id:Number(result.lastInsertRowid), status:'received', createdAt};
  }
}
