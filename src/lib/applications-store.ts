export type Application = {
  id: string;
  name: string;
  age: string;
  country: string;
  governorate: string;
  experience: string;
  why: string;
  percentage: string;
  whatsapp: string;
  submittedAt: string;
};

const KEY = "yassin_sales_applications_v1";

export function getApplications(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addApplication(app: Omit<Application, "id" | "submittedAt">) {
  const apps = getApplications();
  apps.unshift({
    ...app,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  });
  localStorage.setItem(KEY, JSON.stringify(apps));
}

export function deleteApplication(id: string) {
  const apps = getApplications().filter((a) => a.id !== id);
  localStorage.setItem(KEY, JSON.stringify(apps));
}
