import axios from "axios";

const axiosDeezer = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getArtists = async (artistIds) => {
  const {data} = await axiosDeezer(`/artist/${artistIds}`);
  console.log(data);
  return data;
}

export const getAlbums = async (albumIds) => {
  const {data} = await axiosDeezer(`/album/${albumIds}`);
  console.log(data);
  return data;
}

export const getTracks = async (trackIds) => {
  const {data} = await axiosDeezer(`/track/${trackIds}`);
  console.log(data);
  return data;
}

export const getChart = async (chartIds) => {
  const {data} = await axiosDeezer(`/chart/${chartIds}`);
  console.log(data);
  return data;
}

export const getGenre = async (genresIds) => {
  const {data} = await axiosDeezer(`/genre/${genresIds}`);
  console.log(data);
  return data;
}

export const search = async (searchQuery) => {
  const {data} = await axiosDeezer(`/search/?q=${searchQuery}`);
  console.log(data);
  return data;
}