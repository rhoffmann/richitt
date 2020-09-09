import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { Box, Button } from '@chakra-ui/core';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
import {
  useRegisterUserMutation,
  UserRegisterInput,
} from '../generated/graphql';
import { toFormikErrors } from '../lib/helpers';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [_, register] = useRegisterUserMutation();
  const router = useRouter();

  // TODO: refactor the types
  async function handleSubmit(
    values: UserRegisterInput,
    { setErrors }: FormikHelpers<UserRegisterInput & { email: string }>
  ) {
    const response = await register({
      options: {
        username: values.username,
        password: values.password,
        email: values.email || null,
      },
    });

    if (response.data?.register.errors) {
      setErrors(toFormikErrors(response.data.register.errors));
    } else if (response.data?.register.user) {
      // it worked, redirect
      router.push('/');
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
