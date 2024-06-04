import type { Character, Episode, Location } from "./dtos";

// this is temporary until it gets moved to a .env file
const BASE_URL = process.env?.VITE_API_ENDPOINT

export async function fetchData<T>(endpoint: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error('API endpoint missing');
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching data from ${endpoint}: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    throw new Error(`Error fetching data from ${endpoint}: ${error}`);
  }
}


export const fetchCharacter = async (id: number): Promise<Character> => {
  return fetchData<Character>(`character/${id}`);
};

export const fetchEpisode = async (id: number): Promise<Episode> => {
  return fetchData<Episode>(`episode/${id}`);
};

export const fetchLocation = async (id: number): Promise<Location> => {
  return fetchData<Location>(`location/${id}`);
};
