import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, CheckCircle2 } from "lucide-react"; // أضفت أيقونة النجاح
import { useState } from "react";
import { HumoLayout } from "@/components/HumoLayout";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "التقرير الأسبوعي - humo" }] }),
  component: Report,
});

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getImprovedMetric = (
  prevMin: number,
  prevMax: number,
  incMin: number,
  incMax: number,
) => {
  const previousWeek = getRandomInt(prevMin, prevMax);
  const increase = getRandomInt(incMin, incMax);
  const currentWeek = Math.min(previousWeek + increase, 95);

  return {
    previousWeek,
    currentWeek,
    improvement: currentWeek - previousWeek,
  };
};

function Report() {
  // 1. إضافة حالة للتحميل والنافذة
  const [isDownloading, setIsDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [reportStats] = useState(() => ({
    monthlyBars: [
      { label: "i4", value: getRandomInt(45, 90), color: "var(--humo-cyan)", tag: "تحسن" },
      { label: "i3", value: getRandomInt(35, 80), color: "var(--humo-yellow)" },
      { label: "i2", value: getRandomInt(30, 70), color: "var(--humo-yellow)" },
      { label: "i1", value: getRandomInt(25, 60), color: "var(--humo-red)" },
    ],
    monthlyImprovement: getRandomInt(10, 80),
    comparisons: [
      {
        label: "التواصل البصري",
        ...getImprovedMetric(20, 60, 5, 25),
        color: "var(--humo-cyan)",
      },
      {
        label: "الاستجابة",
        ...getImprovedMetric(30, 70, 5, 20),
        color: "var(--humo-blue)",
      },
      {
        label: "التفاعل",
        ...getImprovedMetric(20, 65, 5, 25),
        color: "var(--humo-red)",
      },
    ],
  }));

  // 2. دالة محاكاة التحميل
  const handleDownload = () => {
    setIsDownloading(true);
    
    // محاكاة وقت التحميل (ثانية واحدة مثلاً)
    setTimeout(() => {
      setIsDownloading(false);
      setShowModal(true);
    }, 1200);
  };

  return (
    <HumoLayout
      activeTab="tip"
      className="dashboard-screen report-screen"
      logoAction={
        <Link to="/dashboard" className="logo-row-back-button" aria-label="العودة">
          <ChevronRight size={24} />
        </Link>
      }
    >
      <header className="page-heading">
        <h1 className="report-title">التقرير الأسبوعي</h1>
        <p className="report-sub">أبريل 2026</p>
      </header>

      {/* ... باقي الأقسام كما هي ... */}
      <section className="report-card monthly-progress-card">
        <h2 className="report-card-title">التطور خلال شهر</h2>
        <div className="bar-chart">
          {reportStats.monthlyBars.map((bar) => (
            <div className="bar-col" key={bar.label}>
              <div className="bar-val" style={{ color: bar.color }}>
                {bar.value}%
                {bar.tag && <span className="bar-tag">{bar.tag}</span>}
              </div>
              <div className="bar" style={{ height: `${bar.value * 1.45}px`, background: bar.color }} />
              <div className="bar-label">{bar.label}</div>
            </div>
          ))}
        </div>
        <p className="report-note"> تحسن بنسبة %{reportStats.monthlyImprovement} هذا الشهر</p>
      </section>

      <section className="report-card weekly-compare-card">
        <h2 className="report-card-title">مقارنة هذا الاسبوع</h2>
        {reportStats.comparisons.map((item) => (
          <div className="compare-row" key={item.label}>
            <div className="label">
              <span className="badge-delta" style={{ color: item.color }}>+{item.improvement}%</span>
              <span>{item.label}</span>
            </div>
            <div className="bar-track">
              <span style={{ width: `${item.currentWeek}%`, background: item.color }} />
            </div>
            <div className="compare-meta">
              <span>هذا الأسبوع: %{item.currentWeek}</span>
              <span>الأسبوع الماضي: %{item.previousWeek}</span>
            </div>
          </div>
        ))}
      </section>

      {/* 3. تعديل الزر لإظهار حالة التحميل */}
      <button 
        type="button" 
        className={`report-download-btn clickable-effect ${isDownloading ? 'loading' : ''}`}
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? "جاري التحميل..." : "تحميل PDF"}
      </button>

      {/* 4. النافذة المنبثقة للنجاح */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="custom-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-wrapper">
              <CheckCircle2 size={40} color="#fff" />
            </div>
            <h3>تم التحميل!</h3>
            <p className="modal-text">تم حفظ التقرير بنجاح في جهازك</p>
            <button className="confirm-btn" onClick={() => setShowModal(false)}>حسناً</button>
          </div>
        </div>
      )}
    </HumoLayout>
  );
}