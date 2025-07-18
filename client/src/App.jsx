import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div>
      <Navbar />
<main className='min-h-[calc(100vh-100px)] mt-16'>
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default App;
