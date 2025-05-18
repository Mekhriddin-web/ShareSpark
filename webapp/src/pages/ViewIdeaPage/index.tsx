import { useParams } from 'react-router';
import { format } from 'date-fns';

import { trpc } from '../../lib/trpc';
import { getEditIdeaRoute, ViewIdeaRouteParams } from '../../lib/routes';
import { Segment } from '../../components/Segment';
import css from './index.module.scss';
import { LinkButton } from '../../components/Button';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
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

  return (
    <Segment title={idea.name} description={idea.description}>
      <strong className={css.createdAt}>Created At: {format(idea.createdAt, 'MM/dd/yyyy')}</strong>
      <div className={css.author}>Author: {idea.author.nick}</div>
      <p className={css.text}>{idea.text}</p>
      {me?.id === idea.authorId && (
        <div className={css.editButtonWrapper}>
          <LinkButton to={getEditIdeaRoute({ ideaNick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  );
};
