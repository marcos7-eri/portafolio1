import 'reflect-metadata';
import {beforeEach,afterEach,describe,it,expect} from 'vitest';
import request from 'supertest';
import {NestFactory} from '@nestjs/core';
import {AppModule} from '../../src/app.module.ts';

let app;
beforeEach(async () => { process.env.DB_FILE=':memory:'; app=await NestFactory.create(AppModule,{logger:false}); await app.init(); });
afterEach(async () => { await app.close(); });

describe('API de portafolio y SQLite', () => {
  it('entrega el perfil de Erik', async () => {const r=await request(app.getHttpServer()).get('/api/profile'); expect(r.status).toBe(200); expect(r.body.name).toBe('Erik Salvatierra Choque');});
  it('carga tres proyectos desde SQLite', async () => {const r=await request(app.getHttpServer()).get('/api/projects'); expect(r.status).toBe(200); expect(r.body).toHaveLength(3);});
  it('guarda un mensaje válido', async () => {const r=await request(app.getHttpServer()).post('/api/contact').send({name:'Ana',email:'ANA@ejemplo.com',message:'Me interesa conversar sobre un proyecto web.'}); expect(r.status).toBe(201); expect(r.body.status).toBe('received'); expect(r.body.id).toBeGreaterThan(0);});
  it('rechaza un correo inválido sin guardar', async () => {const r=await request(app.getHttpServer()).post('/api/contact').send({name:'Ana',email:'incorrecto',message:'Me interesa conversar sobre un proyecto web.'}); expect(r.status).toBe(400);});
});
