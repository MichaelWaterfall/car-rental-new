'use client';

import { Box, chakra, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
import { MdAccountBalance } from 'react-icons/md';
import { FcMoneyTransfer, FcOvertime } from 'react-icons/fc';
import PayForm from './Payform';
import AddToBalanceForm from './AddToBalanceForm';
import AddRenter from './AddRenter';

function StatsCard(props) {
  const { title, stat, icon, bgColor } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
      backgroundColor={bgColor}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function CurrentTotals() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Welcome 'User's Address', please select the car you would like to rent.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Client Balance: '} stat={'5,000'} icon={<MdAccountBalance size={'3em'} />} />
        <StatsCard title={'Amount Due: '} stat={'1,000'} icon={<FcMoneyTransfer size={'3em'} />} />
        <StatsCard title={'Driving Time in Minutes: '} stat={'7'} icon={<FcOvertime size={'3em'} />} />
        <StatsCard title={'Car Status: '} bgColor={'red'} />
      </SimpleGrid>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <AddToBalanceForm />
        <PayForm />
      </Flex>
    </Box>
  );
}
