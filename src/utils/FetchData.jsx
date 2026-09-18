import axios from 'axios'

const tmdbApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		accept: 'application/json',
	},
	params: {
		language: 'en-US',
	},
})

const EXCLUDED_GENRE_IDS = new Set([18, 35, 10749])
const HIDDEN_MEDIA_TITLES = [
	'accidental partners',
	'loves of a french pussycat',
	'pussy kills',
]
const EXPLICIT_KEYWORDS = [
	'pussy',
	'porn',
	'sex',
	'xxx',
	'adult',
	'erotic',
	'nude',
	'explicit',
	'blowjob',
]

function normalizeText(value) {
	return String(value ?? '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
}

function shouldHideMedia(item) {
	const genreIds = Array.isArray(item?.genre_ids) ? item.genre_ids : []
	if (genreIds.some((genreId) => EXCLUDED_GENRE_IDS.has(Number(genreId)))) {
		return true
	}

	const textToCheck = [
		item?.title,
		item?.name,
		item?.original_title,
		item?.original_name,
		item?.overview,
	].filter(Boolean).map((value) => normalizeText(value))

	const titles = textToCheck.filter((text) => text.length > 0)

	if (titles.some((title) => HIDDEN_MEDIA_TITLES.some((hiddenTitle) => title.includes(normalizeText(hiddenTitle))))) {
		return true
	}

	if (titles.some((title) => EXPLICIT_KEYWORDS.some((keyword) => title.includes(keyword)))) {
		return true
	}

	return false
}

function filterHiddenNestedResults(value) {
	if (Array.isArray(value)) {
		return value
			.filter((item) => !shouldHideMedia(item))
			.map((item) => filterHiddenNestedResults(item))
	}

	if (value && typeof value === 'object') {
		const filteredEntries = Object.entries(value).map(([key, nestedValue]) => {
			if (key === 'results' && Array.isArray(nestedValue)) {
				return [key, nestedValue.filter((item) => !shouldHideMedia(item))]
			}

			return [key, filterHiddenNestedResults(nestedValue)]
		})

		return Object.fromEntries(filteredEntries)
	}

	return value
}

async function fetchMovies(endpoint, page = 1, params = {}) {
	// Keep authentication and common TMDB request parameters in one place.
	const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN

	if (!accessToken) {
		throw new Error('Missing VITE_TMDB_ACCESS_TOKEN environment variable')
	}

	const response = await tmdbApi.get(endpoint, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		params: {
			page,
			...params,
		},
	})

	const data = response.data
	return filterHiddenNestedResults(data)
}

export function fetchTrendingMovies(page = 1) {
	return fetchMovies('/trending/movie/day', page)
}

export function fetchTrendingPeople(page = 1) {
	return fetchMovies('/trending/person/week', page)
}

export function fetchPopularMovies(page = 1) {
	return fetchMovies('/movie/popular', page)
}

export function fetchTopRatedMovies(page = 1) {
	return fetchMovies('/movie/top_rated', page)
}

export function fetchNowPlayingMovies(page = 1) {
	return fetchMovies('/movie/now_playing', page)
}

export function fetchUpcomingMovies(page = 1) {
	return fetchMovies('/movie/upcoming', page)
}

export function fetchOnTv(page = 1) {
	return fetchMovies('/tv/on_the_air', page)
}

export function fetchAiringTodayTv(page = 1) {
	return fetchMovies('/tv/airing_today', page)
}

export function fetchPopularTv(page = 1) {
	return fetchMovies('/tv/popular', page)
}

export function fetchTopRatedTv(page = 1) {
	return fetchMovies('/tv/top_rated', page)
}

export function fetchDiscoverMovies(page = 1, filters = {}) {
	return fetchMovies('/discover/movie', page, filters)
}

export function fetchDiscoverTv(page = 1, filters = {}) {
	return fetchMovies('/discover/tv', page, filters)
}

export function fetchSearchMovies(page = 1, query = '') {
	return fetchMovies('/search/movie', page, { query })
}

export function fetchSearchMulti(page = 1, query = '') {
	return fetchMovies('/search/multi', page, { query, include_adult: false })
}

export function fetchMovieDetails(movieId) {
	return fetchMovies(`/movie/${movieId}`, 1, {
		append_to_response: 'videos,credits,similar',
	})
}

export function fetchTvDetails(tvId) {
	return fetchMovies(`/tv/${tvId}`, 1, {
		append_to_response: 'videos,credits,similar',
	})
}

export function fetchActorDetails(actorId) {
	return fetchMovies(`/person/${actorId}`, 1, {
		append_to_response: 'combined_credits',
	})
}
