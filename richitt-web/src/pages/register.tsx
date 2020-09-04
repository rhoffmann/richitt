import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useMutation } from 'urql';

import { Box, Button } from '@chakra-ui/core';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
import {
  User,
  useRegisterUserMutation,
  UsernamePasswordInput,
} from '../generated/graphql';
import { toFormikErrors } from '../lib/helpers';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [registerResult, register] = useRegisterUserMutation();

  // TODO: refactor the types
  async function handleSubmit(
    values: UsernamePasswordInput & { email: string },
    { setErrors }: FormikHelpers<UsernamePasswordInput & { email: string }>
  ) {
    const response = await register({
      username: values.username,
      password: values.password,
      email: values.email,
    });

    if (response.data?.register.errors) {
      setErrors(toFormikErrors(response.data.register.errors));
    }

    return response;
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <Box mb={6}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>
            <Box mb={6}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mb={6}>
              <InputField
                name="email"
                placeholder="email"
                label="email"
                type="email"
              />
            </Box>
            <Button variantColor="teal" isLoading={isSubmitting} type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Register;
