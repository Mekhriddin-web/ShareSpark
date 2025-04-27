import { Link } from 'react-router';

import { trpc } from '../../lib/trpc';
import { getViewIdeaRoute } from '../../lib/routes';
import css from './index.module.scss';
import { Segment } from '../../components/Segment';

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
      <Segment title="All Ideas" />
      <div className={css.ideas}>
        {data?.ideas.map(idea => (
          <div className={css.idea} key={idea.nick}>
            <Segment title={idea.name} size={2} description={idea.description} />
            <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
              Check Out Idea
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
