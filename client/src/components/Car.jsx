import { Button, Box, Image, Text, Stack } from '@chakra-ui/react';

const Car = ({ car, carText }) => {
  return (
    <Box boxSize="lg" mx={2}>
      <Image src={car} mb={10} />
      <Text>{carText}</Text>
      <Stack spacing={0} direction={'row'} align={'center'} justify={'center'}>
        <Button m={2} fontSize={'sm'} fontWeight={600} colorScheme={'teal'} bg={'teal.500'} _hover={{ bg: 'teal.300' }}>
          Check Out
        </Button>
        <Button m={2} fontSize={'sm'} fontWeight={600} colorScheme={'teal'} bg={'teal.500'} _hover={{ bg: 'teal.300' }}>
          Check In
        </Button>
      </Stack>
    </Box>
  );
};

export default Car;
