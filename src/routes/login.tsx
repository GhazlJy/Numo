import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Form } from "react-bootstrap";
import { DEMO_USERS } from "@/data/demoUsers";
import { HumoLayout } from "@/components/HumoLayout";
import { setCurrentUser } from "@/utils/authStorage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "تسجيل الدخول - humo" }],
  }),
  component: Login,
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = Partial<LoginValues> & {
  credentials?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLogin(values: LoginValues) {
  const errors: LoginErrors = {};

  if (!values.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "يرجى إدخال بريد إلكتروني صحيح";
  }

  if (!values.password) {
    errors.password = "كلمة المرور مطلوبة";
  } else if (values.password.length < 6) {
    errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
  }

  return errors;
}

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});

  const updateField = (field: keyof LoginValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, credentials: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validateLogin(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const user = DEMO_USERS.find(
      (demoUser) =>
        demoUser.email.toLowerCase() === values.email.trim().toLowerCase() &&
        demoUser.password === values.password,
    );

    if (!user) {
      setErrors({ credentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      return;
    }

    setCurrentUser(user);
    navigate({ to: "/dashboard" });
  };

  return (
    <HumoLayout showNav={false} className="auth-screen auth-login-screen">
      <p className="auth-subtitle">الكشف المبكر عن طيف التوحد</p>

      <div className="auth-card auth-login-card">
        <h1 className="auth-card-title">تسجيل الدخول</h1>

        <Form className="auth-form" noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="humo-label">البريد الالكتروني</Form.Label>
            <Form.Control
              className="humo-input"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label className="humo-label">كلمة المرور</Form.Label>
            <Form.Control
              className="humo-input"
              name="password"
              type="password"
              value={values.password}
              onChange={(event) => updateField("password", event.target.value)}
            />
            {errors.password && <p className="auth-error">{errors.password}</p>}
          </Form.Group>

          {errors.credentials && <p className="auth-form-error">{errors.credentials}</p>}

          <button type="submit" className="humo-btn-cyan">دخول</button>

          <p className="auth-switch-text">
            ماعندك حساب ؟{" "}
            <Link to="/signup">سجل الحين</Link>
          </p>
        </Form>
      </div>
    </HumoLayout>
  );
}
