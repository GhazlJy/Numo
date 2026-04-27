import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { HumoLayout } from "@/components/HumoLayout";

export const Route = createFileRoute("/exam/result")({
  head: () => ({ meta: [{ title: "النتيجة - humo" }] }),
  component: Result,
});

const ROWS = [
  { text: "ضعف التواصل البصري", tag: "مرتفع", color: "#ff3b6b" },
  { text: "تأخر الاستجابة للنداء", tag: "متوسط", color: "#d6d500" },
  { text: "قلة التفاعل الاجتماعي", tag: "متوسط", color: "#d6d500" },
  { text: "الحركة والنشاط", tag: "طبيعي", color: "#5ddbd2" },
];

function Result() {
  const navigate = useNavigate();

  return (
    <HumoLayout activeTab="exam" className="dashboard-screen assessment-flow-screen result-screen">
      <Link
        to="/exam/record"
        className="assessment-logo-arrow"
        aria-label="العودة"
      >
        <ChevronRight size={24} />
      </Link>

      <section className="result-content">
        <header className="result-heading">
          <h1 className="result-status">الحالة متوسطة</h1>
          <p className="result-sub">Medium Concern • 42%</p>
        </header>

        <p className="result-section-label">النتيجة</p>

        <div className="result-list">
          {ROWS.map((row) => (
            <article className="result-row" key={row.text}>
              <span className="row-tag" style={{ color: row.color }}>
                {row.tag}
              </span>
              <span className="row-text">{row.text}</span>
            </article>
          ))}
        </div>

        <p className="result-disclaimer">
          هذا تقييم أولي وليس تشخيصًا طبيًا، يُنصح بمراجعة متخصص للتأكيد.
        </p>

        <button
          className="result-report-button"
          onClick={() => navigate({ to: "/centers" })}
        >
          التقرير
        </button>
      </section>
    </HumoLayout>
  );
}
