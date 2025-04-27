import { Link, Outlet } from 'react-router';

import { getAllIdeasRoute } from '../../lib/routes';

export const Layout: React.FC = () => {
  return (
    <div>
      <p>
        <b>ShareSpark</b>
      </p>
      <ul>
        <li>
          <Link to={getAllIdeasRoute()}>All Ideas</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
