import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Text, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';

export default function AddToBalanceForm() {
  const { deposit } = useContext(BlockchainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (value) => {
    console.log(JSON.stringify(value, null, 2));
    console.log(value);
    //const {creditBalance} = values;
    //console.log(creditBalance);
    await deposit(value);
    console.log('Test');
  };

  return (
    /*
    <Flex justifyContent={'center'} alignItems={'center'} p={5} mt={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontFamily={'heading'} fontSize={'x-large'} fontWeight={600} mb={4}>
          Deposit Funds
        </Text>
        <FormControl isInvalid={errors.deposit}>
          <Input
            id="deposit"
            type="number"
            step="any"
            placeholder="Deposit"
            {...register('deposit', {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>{errors.deposit && errors.deposit.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Flex>
    */
    <></>
  );
}
