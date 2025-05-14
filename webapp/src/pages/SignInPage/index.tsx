import { useFormik } from 'formik';
import { useState } from 'react';
import { createSignInTrpcInput } from '@ShareSpark/backend/src/router/signIn/input';
import { withZodSchema } from 'formik-validator-zod';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { trpc } from '../../lib/trpc';
import { Alert } from '../../components/Alert';
import { getAllIdeasRoute } from '../../lib/routes';

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signIn = trpc.signIn.useMutation();

  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(createSignInTrpcInput),
    onSubmit: async values => {
      try {
        setSubmittingError(null);
        const { token } = await signIn.mutateAsync(values);
        Cookies.set('token', token, { expires: 99999 });
        void trpcUtils.invalidate();
        navigate(getAllIdeasRoute());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
      }
    },
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" autocomplete="username" formik={formik} />
          <Input name="password" label="Password" type="password" autocomplete="current-password" formik={formik} />
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
