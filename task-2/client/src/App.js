import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSearchComponent from "./component/UserSearchComponent";

import EditInfo from "./component/EditInfo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserSearchComponent />} />
          <Route path="/edit/:userId" element={<EditInfo />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
