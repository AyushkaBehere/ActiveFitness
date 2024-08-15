import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import axios from 'axios';
import Loader from './Loader'; // Import the Loader component

const ExerciseVideos = ({ name }) => {
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchExerciseVideos = async () => {
      setLoading(true); // Set loading to true before making the API request

      const options = {
        method: 'GET',
        url: 'https://youtube138.p.rapidapi.com/search/',
        params: {
          q: `${name} exercise`,
          hl: 'en',
          gl: 'US',
        },
        headers: {
          'x-rapidapi-key': '11154331femshd6f22f2165589dep180f66jsn1288ac4ae4d1', // Replace with your actual RapidAPI key
          'x-rapidapi-host': 'youtube138.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setExerciseVideos(response.data.contents);
      } catch (error) {
        console.error('Error fetching exercise videos:', error);
      } finally {
        setLoading(false); // Set loading to false after the API request is done
      }
    };

    fetchExerciseVideos();
  }, [name]);

  if (loading) return <Loader />; // Show the Loader component while loading

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
      <Typography
        sx={{ fontSize: { lg: '44px', xs: '25px' } }}
        fontWeight={700}
        color="#000"
        mb="33px"
      >
        Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
      </Typography>
      <Stack
        sx={{
          flexDirection: { lg: 'row' },
          gap: { lg: '30px', xs: '20px' },
          justifyContent: 'flex-start',
        }}
        flexWrap="wrap"
        alignItems="center"
      >
        {exerciseVideos.length > 0 ? (
          exerciseVideos.map((item, index) => (
            <a
              key={index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                style={{ borderTopLeftRadius: '20px' }}
                src={item.video.thumbnails[0].url}
                alt={item.video.title}
              />
              <Box>
                <Typography
                  sx={{ fontSize: { lg: '20px', xs: '18px' } }}
                  fontWeight={600}
                  color="#000"
                >
                  {item.video.title}
                </Typography>
                <Typography fontSize="14px" color="#000">
                  {item.video.channelName}
                </Typography>
              </Box>
            </a>
          ))
        ) : (
          <Typography>No videos found.</Typography> // In case no videos are available
        )}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
