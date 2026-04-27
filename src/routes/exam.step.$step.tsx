import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { HumoLayout } from "@/components/HumoLayout";
import iconFace from "@/assets/icon-face.png";
import iconWaiting from "@/assets/icon-waiting.png";
import iconRobot from "@/assets/icon-robot.png";

export const Route = createFileRoute("/exam/step/$step")({
  head: () => ({ meta: [{ title: "تعليمات الاختبار - humo" }] }),
  component: ExamStep,
});

const STEPS = [
  {
    title: "نادي اسم طفلك",
    subtitle: "قولي اسمه بوضوح ولطف",
    icon: iconFace,
    iconClass: "face-icon",
    text: "لا تلوحي بيديك أو تلمسيه أثناء النداء",
    nextStep: "2",
    button: "التالي",
  },
  {
    title: "انتظري استجابته",
    subtitle: "راقبي إن كان ينظر إليك أو يلتفت",
    icon: iconWaiting,
    iconClass: "waiting-icon",
    text: "لا تتحركي، أعطيه 5-8 ثواني",
    nextStep: "3",
    button: "التالي",
  },
  {
    title: "أظهري له لعبته",
    subtitle: "قدمي لعبة ملونة",
    icon: iconRobot,
    iconClass: "robot-icon",
    text: "راقبي إن كانت عيناه تتبع اللعبة أو المصدر الصوتي",
    nextStep: undefined,
    button: "ابدأي التسجيل",
  },
] as const;

function ExamStep() {
  const { step } = Route.useParams();
  const navigate = useNavigate();
  const currentStep = Math.max(1, Math.min(3, Number.parseInt(step, 10) || 1));
  const data = STEPS[currentStep - 1];

  const goNext = () => {
    if (data.nextStep) {
      navigate({ to: "/exam/step/$step", params: { step: data.nextStep } });
      return;
    }

    navigate({ to: "/exam/record" });
  };

  return (
    <HumoLayout
      activeTab="exam"
      showLogo={false}
      className="dashboard-screen assessment-flow-screen assessment-step-screen"
    >
      <div className="assessment-step-header">
        <span className="step-counter">{currentStep}/3</span>
        <div className="step-dots" aria-label={`الخطوة ${currentStep} من 3`}>
          {[1, 2, 3].map((stepNumber) => (
            <span
              key={stepNumber}
              className={`dot ${stepNumber === currentStep ? "active" : ""}`}
            />
          ))}
        </div>
        <Link to="/exam" className="assessment-top-arrow" aria-label="العودة">
          <ChevronRight size={24} />
        </Link>
      </div>

      <section className="assessment-step-main">
        <h1 className="assessment-title">{data.title}</h1>
        <p className="assessment-subtitle">{data.subtitle}</p>

        <div className="assessment-instruction-card">
          <img
            src={data.icon}
            alt=""
            className={`assessment-step-icon ${data.iconClass}`}
            loading="lazy"
          />
          <p>{data.text}</p>
        </div>
      </section>

      <button className="assessment-action-button" onClick={goNext}>
        {data.button}
      </button>
    </HumoLayout>
  );
}
