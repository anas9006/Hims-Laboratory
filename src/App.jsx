import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.jsx";
import Home from "./Pages/Home.jsx";
import LabTestsTypes from "./Pages/Laboratory/LabTestTypes.jsx";
import LabTestsCategories from "./Pages/Laboratory/LabTestCat.jsx";
import LabTestsSpecimens from "./Pages/Laboratory/LabTestSpecimens.jsx";
import LabTestsAttributes from "./Pages/Laboratory/LabTestsAttributes.jsx";
import LabTestsAttributesGroups from "./Pages/Laboratory/LabTestsAttributesGroups.jsx";
import LabReportingFormats from "./Pages/Laboratory/LabReportingFormats.jsx";
import LabTests from "./Pages/Laboratory/LabTests.jsx";
import LaboratoryReceipt from "./Pages/Laboratory/LaboratoryReceipt.jsx";

// Layout component that includes the sidebar
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />
      <Route path="/labTestType" element={
        <Layout>
          <LabTestsTypes />
        </Layout>
      } />
      <Route path="/labTestCat" element={
        <Layout>
          <LabTestsCategories />
        </Layout>
      } />
      <Route path="/labTestSpecimens" element={
        <Layout>
          <LabTestsSpecimens />
        </Layout>
      } />
      <Route path="/labTestsAttributes" element={
        <Layout>
          <LabTestsAttributes />
        </Layout>
      } />
      <Route path="/labTestsAttributesGroup" element={
        <Layout>
          <LabTestsAttributesGroups />
        </Layout>
      } />
      <Route path="/labReportingFormats" element={
        <Layout>
          <LabReportingFormats />
        </Layout>
      } />
      <Route path="/labTests" element={
        <Layout>
          <LabTests />
        </Layout>
      } />
      <Route path="/labReceipt" element={
        <Layout>
          <LaboratoryReceipt />
        </Layout>
      } />
    </Routes>
  );
}

export default App;