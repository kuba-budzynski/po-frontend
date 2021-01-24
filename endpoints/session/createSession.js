import axios from "axios";
import SETTINGS from "config/settings";

export const createSession = (nazwa, opis, rozszerzenia, start, koniec) => {
  return axios({
    method: 'POST',
    url: `${SETTINGS.apiRoot}/session`,
    data: {
        name: nazwa,
        description: opis,
        allowedExtensions: rozszerzenia,
        start: start,
        end: koniec
    },
  });
};