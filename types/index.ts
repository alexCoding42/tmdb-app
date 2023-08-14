interface IGenre {
  name?: string;
}

export interface IMovie {
  id?: string;
  title?: string;
  poster_path?: string;
  overview?: string;
  genres?: IGenre[];
  runtime?: string;
  status?: string;
  release_date?: string;
}

export interface IPerson {
  id?: string;
  name?: string;
  biography?: string;
  profile_path?: string;
  gender?: number;
  birthday?: string;
  known_for_department?: string;
  place_of_birth?: string;
  popularity?: number;
}
