import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { Box, Button } from '@chakra-ui/core';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
import { useLoginMutation, UserLoginInput } from '../generated/graphql';
import { toFormikErrors } from '../lib/helpers';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../data/createUrqlClient';

const Login: React.FC<{}> = ({}) => {
  const [_, login] = useLoginMutation();
  const router = useRouter();

  async function handleSubmit(
    values: UserLoginInput,
    { setErrors }: FormikHelpers<UserLoginInput>
  ) {
    const response = await login({
      options: values,
    });

    if (response.data?.login.errors) {
      setErrors(toFormikErrors(response.data.login.errors));
    } else if (response.data?.login.user) {
      // it worked, redirect
      router.push('/');
    }

    return response;
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
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
            <Button variantColor="teal" isLoading={isSubmitting} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
