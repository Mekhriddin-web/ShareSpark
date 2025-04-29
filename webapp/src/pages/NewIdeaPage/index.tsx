import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { createIdeaTrpcInput } from '@ShareSpark/backend/src/router/createIdea/input';
import { useState } from 'react';

import { Segment } from '../../components/Segment';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { trpc } from '../../lib/trpc';

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(createIdeaTrpcInput),
    onSubmit: async values => {
      try {
        await createIdea.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });
  return (
    <div>
      <Segment title="New Idea" />
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />

        {successMessageVisible && <div style={{ color: 'green', marginTop: 10 }}>Idea created successfully!</div>}
        {!!submittingError && <div style={{ color: 'red', marginTop: 10 }}>{submittingError}</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Creating...' : 'Create Idea'}
        </button>
      </form>
    </div>
  );
};
