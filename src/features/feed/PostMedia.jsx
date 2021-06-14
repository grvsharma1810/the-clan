import { IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Center } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

function PostMedia({ media }) {
  const [currMediaIndex, setCurrMediaIndex] = useState(0);
  console.log(media, currMediaIndex);
  const next = () => {
    if (currMediaIndex === media.length - 1) {
      setCurrMediaIndex(0);
    } else {
      setCurrMediaIndex(currMediaIndex + 1);
    }
  };

  const prev = () => {
    if (currMediaIndex === 0) {
      setCurrMediaIndex(media.length - 1);
    } else {
      setCurrMediaIndex(currMediaIndex - 1);
    }
  };

  return (
    <Box position="relative" width="full" height="auto" mt={4}>
      {media.length > 1 && (
        <IconButton
          zIndex="1"
          onClick={() => prev()}
          position="absolute"
          left={5}
          fontSize={23}
          color="gray.700"
          top="50%"
          transform="translateY(-50%);"
          aria-label="Previous Media"
          icon={<FaArrowCircleLeft />}
        />
      )}

      <Center>
        {media[currMediaIndex].mediaType === 'IMAGE' && (
          <Image src={media[currMediaIndex].source} alt="Post Image" />
        )}
        {media[currMediaIndex].mediaType === 'VIDEO' && (
          <video style={{ width: '100%' }} controls key={media[currMediaIndex]._id}>
            <source src={media[currMediaIndex].source} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        )}
      </Center>
      {media.length > 1 && (
        <IconButton
          onClick={() => next()}
          zIndex="1"
          position="absolute"
          right={5}
          fontSize={23}
          color="gray.700"
          top="50%"
          transform="translateY(-50%);"
          aria-label="Next Media"
          icon={<FaArrowCircleRight />}
        />
      )}
    </Box>
  );
}

export default PostMedia;
