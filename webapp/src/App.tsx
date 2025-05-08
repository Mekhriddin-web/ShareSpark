import { BrowserRouter, Routes, Route } from 'react-router';

import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';
import { getAllIdeasRoute, getNewIdeaRoute, getSignUpRoute, getViewIdeaRoute, viewIdeaRouteParams } from './lib/routes';
import { Layout } from './components/Layout';
import './styles/global.scss';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getSignUpRoute()} element={<SignUpPage />} />
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
            <Route path={getNewIdeaRoute()} element={<NewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
}

export default App;
