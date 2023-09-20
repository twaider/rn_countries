export type Country = {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
  };
  region: string;
  population: string;
  capital: string[];
  languages: string[];
  continents: string[];
  latlng: number[];
};
