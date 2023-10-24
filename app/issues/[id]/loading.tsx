import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
            <Skeleton/>
            <Flex className='space-x-3 my-2'>
              <Skeleton width="5rem"/>
              <Skeleton width="8rem"/>
            </Flex>
            {/* add the pros class to improve the quality of the text written on the markdown editor */}
            <Card className='prose mt-2'>
              <Skeleton count={3}/>
            </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage;

