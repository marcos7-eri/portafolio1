import {describe,it,expect} from 'vitest';
import {normalizeEmail,validEmail,normalizeText,validMessage,validName} from '../../backend/src/domain.js';

describe('validación del formulario', () => {
  it('normaliza correos electrónicos', () => expect(normalizeEmail('  ERIK@EJEMPLO.COM ')).toBe('erik@ejemplo.com'));
  it('rechaza correos inválidos', () => expect(validEmail('correo-invalido')).toBe(false));
  it('acepta un nombre válido', () => expect(validName('Erik Salvatierra')).toBe(true));
  it('elimina espacios repetidos del mensaje', () => expect(normalizeText(' Hola   Erik\n tengo  una idea ')).toBe('Hola Erik tengo una idea'));
  it('rechaza mensajes demasiado cortos', () => expect(validMessage('Hola')).toBe(false));
});
