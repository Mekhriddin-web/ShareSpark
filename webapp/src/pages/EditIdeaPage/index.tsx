import { useFormik } from 'formik';
import { useState } from 'react';
import { withZodSchema } from 'formik-validator-zod';
import { updateIdeaTrpcInput } from '@ShareSpark/backend/src/router/updateIdea/input';
import { useNavigate, useParams } from 'react-router';
import { pick } from 'lodash';
import { TrpcRouterOutput } from '@ShareSpark/backend/src/router';

import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { trpc } from '../../lib/trpc';
import { getViewIdeaRoute, type EditIdeaRouteParams } from '../../lib/routes';

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const updateIdea = trpc.updateIdea.useMutation();

  const formik = useFormik({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(updateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async values => {
      try {
        setSubmittingError(null);
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
        navigate(getViewIdeaRoute({ ideaNick: values.nick }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
      }
    },
  });

  return (
    <div>
      <Segment title={`Edit Idea: ${idea.nick}`} />
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </div>
  );
};

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick });
  const getMeResult = trpc.getMe.useQuery();

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <div>Loading...</div>;
  }

  if (getIdeaResult.isError) {
    return <div>Error: {getIdeaResult.error.message}</div>;
  }

  if (getMeResult.isError) {
    return <div>Error: {getMeResult.error.message}</div>;
  }

  if (!getIdeaResult?.data?.idea) {
    return <div>Idea not found</div>;
  }

  if (!getMeResult?.data?.me) {
    return <div>Only for authorized</div>;
  }

  const idea = getIdeaResult.data.idea;
  const me = getMeResult.data.me;

  if (me.id !== idea.authorId) {
    return <div>An idea can only be edited by the author</div>;
  }

  return <EditIdeaComponent idea={idea} />;
};
