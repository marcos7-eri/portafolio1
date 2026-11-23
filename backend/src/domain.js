export const normalizeEmail = value => String(value ?? '').trim().toLowerCase();
export const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value)) && normalizeEmail(value).length <= 180;
export const normalizeText = value => String(value ?? '').trim().replace(/\s+/g, ' ');
export const validMessage = value => normalizeText(value).length >= 10 && normalizeText(value).length <= 2000;
export const validName = value => normalizeText(value).length >= 2 && normalizeText(value).length <= 100;
