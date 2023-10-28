import { Box } from '@radix-ui/themes'
import delay from 'delay'
import {Skeleton} from '@/app/components';

const LoadingNewIssuePage = () => {
  // simulate a delay of 2 seconds to show the loading skeleton
  delay(2000);

  return (
    <Box className='max-w-xl'>
  <Skeleton/>
  <Skeleton height="20rem"/>
    </Box>
  )
}

export default LoadingNewIssuePage