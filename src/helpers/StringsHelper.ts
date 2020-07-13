/* eslint-disable import/prefer-default-export */

/* Function: CleaningCityName
* Params: text: string.
* Description: Elimina numeros, espacios en blanco
* y caracteres especiales de un string.
* */
export const CleaningCityName = (text: string): string => text
  .replace(' ', 'xotr')
  .split(/[0-9]|[^a-zA-Z,]|[\s+|^\s+$]/)
  .filter((item) => item.match(/[a-zA-Z]/))
  .join(',')
  .replace('xotr', ' ');
