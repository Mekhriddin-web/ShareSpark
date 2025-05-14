import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { createSignUpTrpcInput } from '@ShareSpark/backend/src/router/signUp/input';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

import { trpc } from '../../lib/trpc';
import { Segment } from '../../components/Segment';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { getAllIdeasRoute } from '../../lib/routes';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signUp = trpc.signUp.useMutation();

  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      createSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords do not match',
              path: ['passwordAgain'],
            });
          }
        })
    ),
    onSubmit: async values => {
      try {
        setSubmittingError(null);
        const { token } = await signUp.mutateAsync(values);
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
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} autocomplete="username" />
          <Input name="password" label="Password" type="password" autocomplete="new-password" formik={formik} />
          <Input
            name="passwordAgain"
            label="Password again"
            type="password"
            autocomplete="new-password"
            formik={formik}
          />
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
