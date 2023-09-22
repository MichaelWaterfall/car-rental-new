import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Text, Flex } from '@chakra-ui/react';

export default function AddToBalanceForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
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
  );
}
