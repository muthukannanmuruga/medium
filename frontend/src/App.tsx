import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { InnerBlog } from './components/InnerBlog';
import { PostBlogPage } from './pages/PostBlogPage';
import { Navigate, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route, redirects to blog page if authenticated */}
        <Route path="/" element={<Navigate to="/blog" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Use a route for private routes */}
        <Route
          element={
            <PrivateRoutes>
              <Outlet />
            </PrivateRoutes>
          }
        >
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<InnerBlog />} />
          <Route path="/postblog" element={<PostBlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Define PrivateRoutes component to handle authentication
const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default App;
