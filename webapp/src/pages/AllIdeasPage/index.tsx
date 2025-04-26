import { Link } from 'react-router';

import { trpc } from '../../lib/trpc';
import { getViewIdeaRoute } from '../../lib/routes';

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>All Ideas</h1>
      {data?.ideas.map(idea => (
        <div key={idea.nick} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
          <Link to={getViewIdeaRoute({ ideaNick: idea.nick })}>Check Out Idea</Link>
        </div>
      ))}
    </div>
  );
};
