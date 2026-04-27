import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Form } from "react-bootstrap";
import type { DemoUser } from "@/data/demoUsers";
import { HumoLayout } from "@/components/HumoLayout";
import { setCurrentUser } from "@/utils/authStorage";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [{ title: "حساب جديد - humo" }],
  }),
  component: Signup,
});

type SignupValues = {
  name: string;
  email: string;
  password: string;
  childName: string;
  childAge: string;
  childGender: "" | DemoUser["childGender"];
};

type SignupErrors = Partial<Record<keyof SignupValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignup(values: SignupValues) {
  const errors: SignupErrors = {};
  const childAgeNumber = Number(values.childAge);

  if (!values.name.trim()) {
    errors.name = "اسم ولي الأمر مطلوب";
  } else if (values.name.trim().length < 2) {
    errors.name = "اسم ولي الأمر يجب أن يكون حرفين على الأقل";
  }

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

  if (!values.childName.trim()) {
    errors.childName = "اسم الطفل مطلوب";
  } else if (values.childName.trim().length < 2) {
    errors.childName = "اسم الطفل يجب أن يكون حرفين على الأقل";
  }

  if (!values.childAge.trim()) {
    errors.childAge = "عمر الطفل مطلوب";
  } else if (!Number.isFinite(childAgeNumber)) {
    errors.childAge = "يرجى إدخال عمر صحيح";
  } else if (childAgeNumber < 1 || childAgeNumber > 18) {
    errors.childAge = "العمر يجب أن يكون بين 1 و 18 سنة";
  }

  if (!values.childGender) {
    errors.childGender = "الجنس مطلوب";
  }

  return errors;
}

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignupValues>({
    name: "",
    email: "",
    password: "",
    childName: "",
    childAge: "",
    childGender: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});

  const updateField = (field: keyof SignupValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validateSignup(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const user: DemoUser = {
      id: `registered-${Date.now()}`,
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      childName: values.childName.trim(),
      childAge: String(Number(values.childAge)),
      childGender: values.childGender as DemoUser["childGender"],
    };

    setCurrentUser(user);
    navigate({ to: "/dashboard" });
  };

  return (
    <HumoLayout showNav={false} className="auth-screen auth-signup-screen">
      <p className="auth-subtitle">الكشف المبكر عن طيف التوحد</p>

      <div className="auth-card auth-signup-card">
        <h1 className="auth-card-title">حساب جديد</h1>

        <Form className="auth-form" noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="humo-label">اسم ولي الأمر</Form.Label>
            <Form.Control
              className="humo-input"
              name="name"
              type="text"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
            {errors.name && <p className="auth-error">{errors.name}</p>}
          </Form.Group>

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

          <h2 className="auth-child-title">بيانات الطفل</h2>

          <Form.Group>
            <Form.Label className="humo-label">اسم الطفل</Form.Label>
            <Form.Control
              className="humo-input"
              name="childName"
              type="text"
              value={values.childName}
              onChange={(event) => updateField("childName", event.target.value)}
            />
            {errors.childName && <p className="auth-error">{errors.childName}</p>}
          </Form.Group>

          <div className="auth-child-row">
            <Form.Group>
              <Form.Label className="humo-label">العمر(سنوات)</Form.Label>
              <Form.Control
                className="humo-input"
                name="childAge"
                type="number"
                min="1"
                max="18"
                value={values.childAge}
                onChange={(event) => updateField("childAge", event.target.value)}
              />
              {errors.childAge && <p className="auth-error">{errors.childAge}</p>}
            </Form.Group>
            <Form.Group>
              <Form.Label className="humo-label">الجنس</Form.Label>
              <Form.Select
                className="humo-input"
                name="childGender"
                value={values.childGender}
                onChange={(event) => updateField("childGender", event.target.value)}
              >
                <option value="">اختر</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </Form.Select>
              {errors.childGender && <p className="auth-error">{errors.childGender}</p>}
            </Form.Group>
          </div>

          <button type="submit" className="humo-btn-cyan">دخول</button>

          <p className="auth-switch-text">
            عندك حساب ؟{" "}
            <Link to="/login">تسجيل دخول</Link>
          </p>
        </Form>
      </div>
    </HumoLayout>
  );
}
