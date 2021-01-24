import request from "../request";

export const createSession = (nazwa, opis, rozszerzenia, start, koniec) => {
  return request({
    method: 'POST',
    url: `session`,
    data: {
        name: nazwa,
        description: opis,
        allowedExtensions: rozszerzenia,
        start: start,
        end: koniec
    },
  });
};
