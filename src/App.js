import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./component/home/Home";
import Registration from './component/registration/Registration';
import Context from "./context/Context";
import LoginForm from './component/login/LoginForm';
import Dashboard from "./component/dashboard/Dashboard";
import AddBlog from "./component/dashboard/addBlog/AddBlog";
import ManageAllBlog from './component/dashboard/ManageAllBlog/ManageAllBlog'
import UpdateBlog from "./component/dashboard/updateBlog/UpdateBlog";
import PendingAllBlog from "./component/dashboard/pendingAllBlog/PendingAllBlog";
import MakeAdmin from "./component/dashboard/makeAdmin/MakeAdmin";
import UserPrivateRoute from './privateRoute/UserPrivateRoute';
import AdminPrivateRoute from './privateRoute/AdminPrivateRoute';
import BlogDetails from "./component/blogDetails/BlogDetails";


function App() {
  return (
    <Context>
          <Router>          
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/blog-details/:blogId" element={
              <UserPrivateRoute>
                  <BlogDetails/>
              </UserPrivateRoute>
            } />
            <Route path="/dashboard/*" element={
              <UserPrivateRoute>
                  <Dashboard/>
              </UserPrivateRoute>
            } >
                <Route path="add-blog" element={<AddBlog/>} />
                <Route path="all-blog" element={
                  <AdminPrivateRoute>
                      <ManageAllBlog/>
                  </AdminPrivateRoute>
                } />
                <Route path="update-blog/:blogId" element={
                  <AdminPrivateRoute>
                      <UpdateBlog/>
                  </AdminPrivateRoute>
                } />
                <Route path="pending-blog" element={
                  <AdminPrivateRoute>
                      <PendingAllBlog/>
                  </AdminPrivateRoute>
                } />
                <Route path="add-new-admin" element={
                  <AdminPrivateRoute>
                      <MakeAdmin/>
                  </AdminPrivateRoute>
                } />
            </Route>
          </Routes>
        </Router>
    </Context>
  );
}

export default App;
