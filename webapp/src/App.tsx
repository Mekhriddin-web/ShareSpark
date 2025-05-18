import { BrowserRouter, Routes, Route } from 'react-router';

import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
  getEditIdeaRoute,
  getViewIdeaRoute,
  editIdeaRouteParams,
  viewIdeaRouteParams,
} from './lib/routes';
import { Layout } from './components/Layout';
import './styles/global.scss';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { EditIdeaPage } from './pages/EditIdeaPage';

function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getSignOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={getSignUpRoute()} element={<SignUpPage />} />
            <Route path={getSignInRoute()} element={<SignInPage />} />
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
            <Route path={getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={getEditIdeaRoute(editIdeaRouteParams)} element={<EditIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
}

export default App;
