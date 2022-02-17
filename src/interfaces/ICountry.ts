export interface ICountry {
  name: string;
  nativeName: string;
  topLevelDomain: string[];
  alpha3Code: string;
  currencies: ICurrency[];
  capital: string[];
  region: string;
  subregion: string;
  languages: ILanguage[];
  borders?: string[];
  population: number;
  flags: IFlags;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface IFlags {
  png: string;
  svg: string;
}

export interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
