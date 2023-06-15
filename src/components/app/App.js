import './App.scss';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../header/Header';
import ServicesError from '../../services/ServicesError'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';



const HomePage = lazy(() => import('../pages/HomePage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SinglePages = lazy(() => import('../pages/SinglePages'))
const SingleComicsPage = lazy(() => import('../singleComics/singleComics'))
const SingleCharPage = lazy(() => import('../singleChar/SingleChar'))


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/marvel-comics" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:id" element={<SinglePages Component={SingleComicsPage} dataType='comics' />} />
            <Route path="/characters/:id" element={<SinglePages Component={SingleCharPage} dataType='characters' />} />
            <Route path='*' element={<ServicesError />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
