import CurrentTotals from './CurrentTotals';
import { Stack, Box, Flex } from '@chakra-ui/react';
import Car from './Car';
import bmw from '../assets/bmw.jpg';
import lowrider from '../assets/lowrider.jpg';
import rangerover from '../assets/rangerover.jpg';
import AddRenter from './AddRenter';
import { useContext, useState } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';
import ClipLoader from 'react-spinners/ClipLoader';

const Dashboard = () => {
  const { renterExists } = useContext(BlockchainContext);
  const { loading, setLoading } = useState(true);
  return (
    <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
      {renterExists == null ? (
        <Center>
          <ClipLoader loading={loading} size={75} />
        </Center>
      ) : renterExists ? (
        <CurrentTotals />
      ) : (
        <AddRenter />
      )}
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Car car={bmw} carText={'The BMW'} />
        <Car car={lowrider} carText={'The Low Rider'} />
        <Car car={rangerover} carText={'The Range Rover'} />
      </Flex>
    </Stack>
  );
};

export default Dashboard;
