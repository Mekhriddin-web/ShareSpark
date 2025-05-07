import { useParams } from 'react-router';
import { format } from 'date-fns';

import { trpc } from '../../lib/trpc';
import { ViewIdeaRouteParams } from '../../lib/routes';
import { Segment } from '../../components/Segment';
import css from './index.module.scss';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.idea) {
    return <div>Idea not found</div>;
  }

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <strong className={css.createdAt}>Created At: {format(data.idea.createdAt, 'MM/dd/yyyy')}</strong>
    </Segment>
  );
};
