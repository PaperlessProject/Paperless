import "./App.css";
import ToPDF from "./pages/ToPDF";
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
          <Route path="/toPDF" element={<ToPDF />} />
          <Route path="/fromPDF" element={<FromPDF />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
