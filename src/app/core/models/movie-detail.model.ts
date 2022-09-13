export interface MovieDetail {
    adult: boolean,
    backdrop_path: string | null,
    belongs_to_collection: null | object,
    budget: number,
    genres: Array<Object>,
    homepage: string | null,
    id: number,
    imdb_id: string | null,
    original_language: string,
    original_title: string,
    overview: string | null,
    popularity: number,
    poster_path: string,
    production_companies: [{}],
    production_countries: [{}],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: [{}],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}