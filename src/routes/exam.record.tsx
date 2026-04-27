import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { HumoLayout } from "@/components/HumoLayout";

export const Route = createFileRoute("/exam/record")({
  head: () => ({ meta: [{ title: "تسجيل الجلسة - humo" }] }),
  component: Record,
});

function Record() {
  const navigate = useNavigate();
  const [remaining, setRemaining] = useState(20);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  return (
    <HumoLayout
      activeTab="exam"
      className="dashboard-screen assessment-flow-screen recording-screen"
      logoAction={
        <Link
          to="/exam/step/$step"
          params={{ step: "3" }}
          className="logo-row-back-button"
          aria-label="العودة"
        >
          <ChevronRight size={24} />
        </Link>
      }
    >
      <section className="recording-content">
        <h1 className="assessment-title">تسجيل الجلسة</h1>
        <p className="assessment-subtitle">سجلي طفلك أثناء التفاعل (30-60 ثانية)</p>

        <div className="record-box" aria-label="معاينة التسجيل" />

        <div className="record-timer-row">
          <span>الوقت المتبقي</span>
          <span>{remaining}s</span>
        </div>

        <button
          className="assessment-action-button"
          onClick={() => navigate({ to: "/exam/result" })}
        >
          انتهاء و تحليل
        </button>
      </section>
    </HumoLayout>
  );
}
