import { useParams } from 'react-router';

import { trpc } from '../../lib/trpc';
import { ViewIdeaRouteParams } from '../../lib/routes';

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
    <div>
      <h1>{data.idea.name}</h1>
      <p>{data.idea.description}</p>
    </div>
  );
};
