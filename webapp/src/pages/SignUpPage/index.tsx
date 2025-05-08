import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { createSignUpTrpcInput } from '@ShareSpark/backend/src/router/signUp/input';
import { z } from 'zod';

import { trpc } from '../../lib/trpc';
import { Segment } from '../../components/Segment';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
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
        await signUp.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
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
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" type="password" formik={formik} />
          <Input name="passwordAgain" label="Password again" type="password" formik={formik} />
          {successMessageVisible && <Alert color="green">Thanks for sign up!</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
