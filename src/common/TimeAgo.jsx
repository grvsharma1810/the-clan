import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text } from '@chakra-ui/layout';

function TimeAgo({ timestamp }) {  
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <Text title={timestamp} color={useColorModeValue('gray.600', 'gray.300')}>
      {timeAgo}
    </Text>
  );
}

export default TimeAgo;
