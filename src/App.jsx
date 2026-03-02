import { Routes, Route } from "react-router-dom";
import LinkTest from "./LinkTest.jsx";
import LabTestsTypes from "./Pages/Laboratory/LabTestTypes.jsx";
import LabTestsCategories from "./Pages/Laboratory/LabTestCat.jsx";
import LabTestsSpecimens from "./Pages/Laboratory/LabTestSpecimens.jsx";
import LabTestsAttributes from "./Pages/Laboratory/LabTestsAttributes.jsx";
import LabTestsAttributesGroups from "./Pages/Laboratory/LabTestsAttributesGroups.jsx";
import LabReportingFormats from "./Pages/Laboratory/LabReportingFormats.jsx";
import LabTests from "./Pages/Laboratory/LabTests.jsx";
import LaboratoryReceipt from "./Pages/Laboratory/LaboratoryReceipt.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LinkTest />} />
        <Route path="/labTestType" element={<LabTestsTypes />} />
        <Route path="/labTestCat" element={<LabTestsCategories />} />
        <Route path="/labTestSpecimens" element={<LabTestsSpecimens />} />
        <Route path="/labTestsAttributes" element={<LabTestsAttributes />} />
        <Route path="/labTestsAttributesGroup" element={<LabTestsAttributesGroups />} />
        <Route path="/labReportingFormats" element={<LabReportingFormats />} />
        <Route path="/labTests" element={<LabTests />} />
        <Route path="/labReceipt" element={<LaboratoryReceipt />} />
      </Routes>
    </>
  );
}

export default App;
