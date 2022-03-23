import "./App.css";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Findfriends from "./screens/findfriends";
import FriendRequests from "./screens/requests";
import Register from "./screens/register";
import { Provider } from "react-redux";
import {store} from '../src/redux_store/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/Register" element={<Register />} exact />
          <Route path="/findfriends" element={<Findfriends />} />
          <Route path="/friendrequests" element={<FriendRequests />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
