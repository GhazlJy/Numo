export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  childName: string;
  childAge: string;
  childGender: "ذكر" | "أنثى";
};

export const DEFAULT_USER: DemoUser = {
  id: "demo-sara",
  name: "سارة",
  email: "sara@test.com",
  password: "123456",
  childName: "محمد",
  childAge: "3",
  childGender: "ذكر",
};

export const DEMO_USERS: DemoUser[] = [
  DEFAULT_USER,
  {
    id: "demo-amal",
    name: "أمل",
    email: "amal@test.com",
    password: "123456",
    childName: "ليان",
    childAge: "4",
    childGender: "أنثى",
  },
  {
    id: "demo-khaled",
    name: "خالد",
    email: "khaled@test.com",
    password: "123456",
    childName: "عمر",
    childAge: "5",
    childGender: "ذكر",
  },
];
