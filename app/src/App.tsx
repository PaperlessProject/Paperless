import "./App.css";
import ToPDF from "./pages/ToPDF.1";
import FromPDF from "./pages/FromPDF";
import Compress from "./pages/Compress";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ToPDF />} />
          <Route path="/fromPDF" element={<FromPDF />} />
          <Route path="/compress" element={<Compress />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
