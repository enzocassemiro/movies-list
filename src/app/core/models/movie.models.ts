export interface Movie {
    adult: boolean,
    id: number,
    title: string,
    title_original: string,
    poster_path: string,
    overview: string,
    popularity: number,
    vote_average: number,
    vote_count: number,
    releaseDate: string,
    status?: string,
    budget?: number
}