import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DEFAULT_USER } from "@/data/demoUsers";
import { HumoLayout } from "@/components/HumoLayout";
import cardVector from "@/assets/card-vector.png";
import { getCurrentUser } from "@/utils/authStorage";
// 1. استيراد الأيقونات اللازمة
import { UserCircle, X, LogOut } from "lucide-react"; 




export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "لوحة التحكم - humo" }],
  }),
  component: Dashboard,
});

const getRandomPercent = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  // 2. حالة للتحكم في ظهور نافذة البروفايل
  const [showProfile, setShowProfile] = useState(false);

  const [metrics] = useState(() => [
    { label: "الاستجابة", value: getRandomPercent(40, 90), color: "var(--humo-red)" },
    { label: "التواصل البصري", value: getRandomPercent(30, 80), color: "var(--humo-yellow)" },
    { label: "الحركة", value: getRandomPercent(50, 95), color: "var(--humo-cyan)" },
    { label: "التفاعل", value: getRandomPercent(35, 85), color: "var(--humo-blue)" },
  ]);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  return (
    <HumoLayout activeTab="home" showVectors={false} className="dashboard-screen">
      
      {/* 3. الهيدر الجديد مع الأيقونة */}
      <div className="dashboard-header">
        <h1 className="greeting">صباح الخير {currentUser.name}</h1>
        <button className="profile-trigger clickable-effect" onClick={() => setShowProfile(true)}>
          <UserCircle size={35} strokeWidth={1.5} />
        </button>
      </div>

      <div className="child-card">
        <div className="ring-deco" />
        <div className="ring-deco ring-deco-small" />

        <div className="child-card-top">
          <span className="badge-soft">Medium</span>
          <div className="child-copy">
            <div className="child-status">حالة الطفل</div>
            <div className="child-name">{currentUser.childName}</div>
            <div className="child-meta">
              {currentUser.childAge} سنين . {currentUser.childGender}
            </div>
          </div>
        </div>

        <div className="progress-panel">
          <div className="progress-labels">
            <span>مستوى الملاحظة</span>
            <span>50%</span>
          </div>
          <div className="progress-humo">
            <span style={{ width: "50%" }} />
          </div>
        </div>
      </div>

      <h2 className="humo-section-title">آخر تحديث</h2>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.label}>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value" style={{ color: metric.color }}>
              {metric.value}%
            </div>
            <img src={cardVector} alt="" className="metric-vector" />
          </div>
        ))}
      </div>

      {/* 4. نافذة الملف الشخصي (تظهر فقط عند الضغط على الأيقونة) */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h3>الملف الشخصي</h3>
              <button className="close-modal" onClick={() => setShowProfile(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="profile-info-content">
              <div className="info-group">
                <label>اسم ولي الأمر</label>
                <p>{currentUser.name}</p>
              </div>
              
              <div className="info-group" style={{ marginTop: '20px' }}>
                <label>معلومات الطفل</label>
                <p style={{ color: 'var(--humo-blue)' }}>{currentUser.childName}</p>
              </div>

              <div className="info-row">
                <div className="info-group">
                  <label>العمر</label>
                  <p>{currentUser.childAge} سنوات</p>
                </div>
                <div className="info-group">
                  <label>الجنس</label>
                  <p>{currentUser.childGender}</p>
                </div>
              </div>
            </div>

            <button className="logout-btn clickable-effect">
              <LogOut size={18} style={{ marginLeft: '8px' }} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      )}

    </HumoLayout>
  );
}