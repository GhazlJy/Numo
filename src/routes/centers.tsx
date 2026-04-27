import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Phone, CheckCircle2 } from "lucide-react"; // أضفت أيقونة النجاح
import { HumoLayout } from "@/components/HumoLayout";
import { useState } from "react";

export const Route = createFileRoute("/centers")({
  head: () => ({ meta: [{ title: "المراكز الطبية - humo" }] }),
  component: Centers,
});

function Centers() {
  // 1. تعريف حالات النافذة المنبثقة
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ name: "", time: "" });

  const centers = [
    { name: "عيادات الطيف للتوحد", city: "جدة", phone: "01111158585", tag: "طيف التوحد" },
    { name: "مركز الخليج للتوحد", city: "جدة", phone: "01111158585", tag: "طيف التوحد" },
    { name: "عيادات الطيف للتوحد", city: "جدة", phone: "01111158585", tag: "طيف التوحد" },
  ];

  // 2. دالة الإرسال وتحديد الوقت
  const handleSend = (centerName: string) => {
    const currentTime = new Date().toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setModalData({ name: centerName, time: currentTime });
    setShowModal(true);
  };

  return (
    <HumoLayout
      activeTab="map"
      className="dashboard-screen centers-screen"
      logoAction={
        <Link to="/dashboard" className="logo-row-back-button" aria-label="العودة">
          <ChevronRight size={24} />
        </Link>
      }
    >
      <header className="page-heading centers-heading">
        <h1 className="report-title">المراكز الطبية</h1>
        <p className="report-sub">أرسل التقرير لمركز متخصص</p>
      </header>

      <div className="centers-list">
        {centers.map((center, index) => (
          <article className="center-card" key={`${center.name}-${index}`}>
            <div className="center-card-content">
              <span className="tag">{center.tag}</span>
              <div className="center-info">
                <h2 className="name">{center.name}</h2>
                <div className="meta">
                  <MapPin size={13} />
                  <span>{center.city}</span>
                </div>
                <div className="meta">
                  <Phone size={13} />
                  <span>{center.phone}</span>
                </div>
              </div>
            </div>
            {/* 3. ربط الزر بالدالة */}
            <button 
              type="button" 
              className="send-btn" 
              onClick={() => handleSend(center.name)}
            >
              إرسال للمركز
            </button>
          </article>
        ))}
      </div>

      {/* 4. الـ Dialog المخصص في منتصف الشاشة */}
      {showModal && (
        <div className="modal-overlay">
          <div className="custom-dialog">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={40} color="#fff" />
            </div>
            <h3>تم الإرسال بنجاح!</h3>
            <p>لقد تم إرسال التقرير لـ <strong>{modalData.name}</strong></p>
            <span className="sent-time">الساعة: {modalData.time}</span>
            <button 
              className="close-dialog-btn" 
              onClick={() => setShowModal(false)}
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </HumoLayout>
  );
}