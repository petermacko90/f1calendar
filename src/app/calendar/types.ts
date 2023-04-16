type Location = {
  country: string;
  lat: string;
  locality: string;
  long: string;
};

type Circuit = {
  Location: Location;
  circuitId: string;
  circuitName: string;
  url: string;
};

type DataAndTime = {
  date: string;
  time: string;
};

export type Race = {
  Circuit: Circuit;
  FirstPractice: DataAndTime;
  Qualifying: DataAndTime;
  SecondPractice: DataAndTime;
  ThirdPractice?: DataAndTime;
  Sprint?: DataAndTime;
  date: string;
  raceName: string;
  round: string;
  season: string;
  time?: string;
  url: string;
};

type RaceTable = {
  Races: Race[];
  season: string;
};

type MRData = {
  RaceTable: RaceTable;
  limit: string;
  offset: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
};

export type ResponseData = {
  MRData: MRData;
};

type DataSourceItem = {
  round: string;
  location: string;
  date: string;
  time: string;
  isNext: boolean;
};

export type CalendarData = {
  dataSource: DataSourceItem[];
  season: string;
};

export enum Columns {
  round = 'round',
  location = 'location',
  date = 'date',
  time = 'time',
}
