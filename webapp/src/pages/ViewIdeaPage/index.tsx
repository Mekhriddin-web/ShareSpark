import { useParams } from 'react-router';

import { trpc } from '../../lib/trpc';
import { ViewIdeaRouteParams } from '../../lib/routes';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
  const { data } = trpc.getIdeas.useQuery();
  const idea = data?.ideas.find(idea => idea.nick === ideaNick);

  if (!idea) {
    return <div>Idea not found</div>;
  }

  return (
    <div>
      <h1>{idea.name}</h1>
      <p>{idea.description}</p>
    </div>
  );
};
