import React from 'react';
import { Form, Formik } from 'formik';
import { useMutation } from 'urql';

import { Box, Button } from '@chakra-ui/core';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
import { REGISTER_MUTATION } from '../graphql/mutations';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [registerResult, register] = useMutation(REGISTER_MUTATION);

  async function handleSubmit(values) {
    console.log(values);
    const result = await register({
      username: values.username,
      password: values.password,
    });

    console.log(result);
    return result;
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box my={6}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
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
