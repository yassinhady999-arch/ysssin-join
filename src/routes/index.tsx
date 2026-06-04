import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Instagram } from "lucide-react";
import yassinAsset from "@/assets/yassin.jpeg.asset.json";
import { addApplication } from "@/lib/applications-store";

export const Route = createFileRoute("/")({
  component: Index,
});

const initial = {
  name: "",
  age: "",
  country: "",
  governorate: "",
  experience: "",
  why: "",
  percentage: "",
  whatsapp: "",
};

function Index() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Admin unlock: 5 clicks on avatar then password prompt
  const clicksRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const handleAvatarClick = () => {
    clicksRef.current += 1;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => { clicksRef.current = 0; }, 2000);
    if (clicksRef.current >= 5) {
      clicksRef.current = 0;
      const pw = window.prompt("كلمة السر");
      if (pw === "12345qwert") {
        navigate({ to: "/admin" });
      } else if (pw !== null) {
        alert("كلمة سر خاطئة");
      }
    }
  };

  const update = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addApplication(form);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-foreground">
      {/* Hero */}
      <header className="bg-gradient-to-b from-primary/20 via-primary/10 to-slate-100 pb-14 pt-12">

        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
          <button
            onClick={handleAvatarClick}
            aria-label="avatar"
            className="group relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/30 shadow-lg ring-4 ring-background transition hover:scale-105 sm:h-40 sm:w-40"
          >
            <img src={yassinAsset.url} alt="Yassin Abdelhady" className="h-full w-full object-cover" />
          </button>
          <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">Yassin Abdelhady</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            خدمة إنشاء مواقع إلكترونية احترافية للمطاعم والكافيهات
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/yassin_abdelhady_17/"
              target="_blank" rel="noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md transition hover:scale-110"
              style={{ background: "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@yassin.abdelhady1"
              target="_blank" rel="noreferrer"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white shadow-md transition hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z"/></svg>
            </a>
          </div>
        </div>
      </header>


      <main className="mx-auto -mt-6 max-w-2xl px-4 pb-16 sm:px-6">
        {submitted ? (
          <div className="rounded-2xl border border-slate-200/80 bg-card p-8 text-center shadow-2xl shadow-primary/10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h2 className="text-xl font-bold">شكراً لتقديمك</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              تم استلام بياناتك بنجاح. في حالة تم قبولك سيتم التواصل معك على واتساب.
            </p>
            <button
              onClick={() => { setForm(initial); setSubmitted(false); }}
              className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              تقديم طلب جديد
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200/80 bg-card p-5 shadow-2xl shadow-primary/10 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">انضم لفريق المبيعات</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              املأ البيانات التالية وسيتم مراجعة طلبك
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="اسمك" value={form.name} onChange={update("name")} required />
              <Field label="سنك" type="number" value={form.age} onChange={update("age")} required />
              <Field label="بلدك" value={form.country} onChange={update("country")} required />
              <Field label="المحافظة" value={form.governorate} onChange={update("governorate")} required />
            </div>
            <div className="mt-5 grid gap-5">
              <TextField label="اشتغلت إيه قبل كده وعندك خبرات في مجال معين اتعلمته" value={form.experience} onChange={update("experience")} required />
              <TextField label="ليه عايز تنضم لينا" value={form.why} onChange={update("why")} required />
              <Field label="النسبة اللي تتوقع تاخدها من فلوس العملاء الجايين من طرفك (%)" value={form.percentage} onChange={update("percentage")} required />
              <Field label="رقم تليفون واتساب" type="tel" value={form.whatsapp} onChange={update("whatsapp")} required />
            </div>
            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] sm:text-base"
            >
              إرسال الطلب
            </button>
          </form>
        )}
      </main>

    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function TextField({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <textarea
        {...props}
        rows={3}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
