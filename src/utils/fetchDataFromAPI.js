import axios from "axios";

const BASE_URL = "https://yt-api.p.rapidapi.com";
export const getChannelData = async (url) => {
  try {
    const apiUrl = `${BASE_URL}/${url}`;
    const { data } = await axios.get(apiUrl, {
      headers: {
        "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
        "x-rapidapi-host": "yt-api.p.rapidapi.com",
      },
    });

    //console.log("API Response:", data); // For debugging
    return data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

export const fetchSelectedCategoryData = async (query) => {
  try {
    const data = await getChannelData(`search?query=${query}`);
    const videos = data.data; // Extract the array of videos from the response
    console.log(videos); // Display videos in the console to ensure correct extraction
    return videos;
  } catch (error) {
    console.error("Error fetching category data:", error);
    return [];
  }
};

export const fetchRelatedVideos = async (videoId) => {
  let videos = [];

  try {
    const data = await getChannelData(`related?id=${videoId}`);
    const relatedVideos = data.data;
    videos = videos.concat(relatedVideos);

    // console.log(videos);
    return videos;
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return [];
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    const data = await getChannelData(`video/info?id=${videoId}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getChannelInformation = async (channelId) => {
  try {
    const data = await getChannelData(`channel/info?id=${channelId}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
