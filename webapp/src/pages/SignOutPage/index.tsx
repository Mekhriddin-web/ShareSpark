import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { trpc } from '../../lib/trpc';
import { getSignInRoute } from '../../lib/routes';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  useEffect(() => {
    Cookies.remove('token');
    void trpcUtils.invalidate().then(() => {
      navigate(getSignInRoute(), { replace: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>Loading...</p>;
};
