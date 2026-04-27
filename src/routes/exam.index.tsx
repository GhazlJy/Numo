import { createFileRoute, Link } from "@tanstack/react-router";
import { HumoLayout } from "@/components/HumoLayout";

export const Route = createFileRoute("/exam/")({
  head: () => ({
    meta: [{ title: "اختبار تقييم - humo" }],
  }),
  component: Exam,
});

function Exam() {
  const instructions = [
    "إضاءة جيدة في الغرفة",
    "هدوء وبعد عن الضوضاء",
    "مكان مألوف للطفل",
  ];

  return (
    <HumoLayout activeTab="exam" showVectors={false} className="dashboard-screen exam-screen">
      <section className="exam-hero" aria-labelledby="exam-title">
        <h1 id="exam-title" className="exam-title">اختبار تقييم</h1>
        <p className="exam-subtitle">
          سنرشدك خطوة بخطوة الجلسة لن تأخذ أكثر من دقيقة واحدة
        </p>
      </section>

      <div className="exam-instructions">
        {instructions.map((instruction) => (
          <div key={instruction} className="exam-instruction-card">
            <div className="instruction-orbit" />
            <span>{instruction}</span>
          </div>
        ))}
      </div>

      <Link
        to="/exam/step/$step"
        params={{ step: "1" }}
        className="exam-start-button"
      >
        ابدأ
      </Link>
    </HumoLayout>
  );
}
