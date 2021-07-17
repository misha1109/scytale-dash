import * as fs from 'fs';

export const get = (type) => {
  const json = fs.readFileSync(`${process.cwd()}/data/${type}.json`, 'utf8');
  return JSON.parse(json);
};

export const post = (type, data) => {
  const json = JSON.stringify(data);
  fs.writeFileSync(`${process.cwd()}/data/${type}.json`, json, 'utf8');
};
