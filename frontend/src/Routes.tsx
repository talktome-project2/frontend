import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StatisticsPage from "./Pages/statistics";
import DetailPage from "./Pages/memberDetail";
import DBPage from "./Pages/memberDB";
import LandingPage from "./Pages/LandingPage";
import ReportPage from "./Pages/ReportPage";
import NoticePage from "./Pages/NoticePage";
import IndividualDetailPage from "./Pages/IndividualDetailPage";
import IndividualReportPage from "./Pages/IndividualReportPage";
import { IndividualNoticePage } from "./Pages/IndividualNoticePage";
import { NoticePostingPage } from "./Pages/NoticePostingPage";
import { CreateNotice } from "./Pages/CreateNotice";
const RoutersManagement = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/memberDB" element={<DBPage />} />
        <Route path="/memberDetail" element={<DetailPage />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/reports/:id" element={<IndividualReportPage />} />
        <Route path="/noticeBoard" element={<NoticePage />} />
        <Route path="/noticeBoard/:id" element={<IndividualNoticePage />} />
        <Route path="/memberDetail/:id" element={<IndividualDetailPage />} />
        <Route path="/noticeBoard/post" element={<NoticePostingPage />} />
      </Routes>
    </Router>
  );
};

export default RoutersManagement;
