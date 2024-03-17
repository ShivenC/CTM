import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import Layout from "./Layout";
import RegisterPage from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/Account";
import ListPage from "./pages/List";
import NewListPage from "./pages/NewList";
import NewTaskPage from "./pages/NewTask";
import UpdateListPage from "./pages/UpdateList";
import DeleteList from "./pages/DeleteList";
import DeleteTaskPage from "./pages/DeleteTask";
import UpdateTaskPage from "./pages/UpdateTask";
import Collaborations from "./pages/Collaborations";
import NewCollabPage from "./pages/NewCollab";
import DeleteCollaborator from "./pages/DeleteCollaborator";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login/:subpage?" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/mylists/undefined/tasks" element={<ListPage />} />
          <Route path="/newlist" element={<NewListPage />} />
          <Route path="/mylists/:subpage?" element={<ListPage />} />
          <Route path="/newtask/:subpage?" element={<NewTaskPage />} />
          <Route path="/updatelist/:subpage?" element={<UpdateListPage />} />
          <Route path="/deletelist/:subpage?" element={<DeleteList />} />
          <Route path="/deletetask/:subpage?" element={<DeleteTaskPage />} />
          <Route path="/updatetask/:subpage?" element={<UpdateTaskPage />} />
          <Route
            path="/collaborations/:subpage?"
            element={<Collaborations />}
          />
          <Route path="/newcollab/:subpage?" element={<NewCollabPage />} />
          <Route
            path="/deletecollab/:subpage?/:owner"
            element={<DeleteCollaborator />}
          />
          <Route path="/account/security/:subpage?" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

/*
 */
