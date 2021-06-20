/* eslint-disable @typescript-eslint/naming-convention */
export interface ISerieApi {
    poster_path?: string;
    popularity?: number;
    id?: number;
    backdrop_path?: string;
    vote_average?: number;
    overview?: string;
    genre_ids?: number[];
    original_language?: string;
    original_name?: string;
    vote_count?: number;
    name?: string;
    first_air_date?: string;
  }
  
  export interface IListaSeries {
    page: number;
    results: ISerieApi[];
    total_results: number;
    total_pages: number;
  }