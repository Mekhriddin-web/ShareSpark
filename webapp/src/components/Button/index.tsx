import cn from 'classnames';
import { Link } from 'react-router';

import css from './index.module.scss';

export const Button = ({ children, loading }: { children: React.ReactNode; loading: boolean }) => {
  return (
    <button className={cn({ [css.button]: true, [css.disable]: loading })} type="submit" disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  );
};

export const LinkButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link to={to} className={cn({ [css.button]: true })}>
      {children}
    </Link>
  );
};
