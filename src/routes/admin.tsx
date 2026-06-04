import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getApplications, deleteApplication, type Application } from "@/lib/applications-store";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  const [apps, setApps] = useState<Application[]>([]);
  const [open, setOpen] = useState<Application | null>(null);

  useEffect(() => { setApps(getApplications()); }, []);

  const remove = (id: string) => {
    if (!confirm("حذف هذا الطلب؟")) return;
    deleteApplication(id);
    setApps(getApplications());
    if (open?.id === id) setOpen(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-bold">لوحة التحكم — طلبات المبيعات</h1>
          <Link to="/" className="text-sm text-primary hover:underline">العودة للموقع</Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="mb-4 text-sm text-muted-foreground">
          إجمالي الطلبات: <span className="font-semibold text-foreground">{apps.length}</span>
        </p>

        {apps.length === 0 ? (
          <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
            لا توجد طلبات حتى الآن
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-right">
                  <tr>
                    <th className="px-4 py-3 font-semibold">الاسم</th>
                    <th className="px-4 py-3 font-semibold">السن</th>
                    <th className="px-4 py-3 font-semibold">البلد</th>
                    <th className="px-4 py-3 font-semibold">المحافظة</th>
                    <th className="px-4 py-3 font-semibold">واتساب</th>
                    <th className="px-4 py-3 font-semibold">النسبة</th>
                    <th className="px-4 py-3 font-semibold">التاريخ</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((a) => (
                    <tr key={a.id} className="border-t hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{a.name}</td>
                      <td className="px-4 py-3">{a.age}</td>
                      <td className="px-4 py-3">{a.country}</td>
                      <td className="px-4 py-3">{a.governorate}</td>
                      <td className="px-4 py-3" dir="ltr">{a.whatsapp}</td>
                      <td className="px-4 py-3">{a.percentage}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(a.submittedAt).toLocaleDateString("ar-EG")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setOpen(a)} className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90">
                            عرض
                          </button>
                          <button onClick={() => remove(a.id)} className="rounded-md bg-destructive px-3 py-1 text-xs text-destructive-foreground hover:bg-destructive/90">
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{open.name}</h2>
              <button onClick={() => setOpen(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <dl className="space-y-3 text-sm">
              <Row k="السن" v={open.age} />
              <Row k="البلد" v={open.country} />
              <Row k="المحافظة" v={open.governorate} />
              <Row k="واتساب" v={open.whatsapp} ltr />
              <Row k="النسبة المطلوبة" v={`${open.percentage}%`} />
              <Row k="الخبرات السابقة" v={open.experience} block />
              <Row k="سبب الانضمام" v={open.why} block />
              <Row k="تاريخ التقديم" v={new Date(open.submittedAt).toLocaleString("ar-EG")} />
            </dl>
            <a
              href={`https://wa.me/${open.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank" rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, block, ltr }: { k: string; v: string; block?: boolean; ltr?: boolean }) {
  return (
    <div className={block ? "" : "flex items-start justify-between gap-4"}>
      <dt className="font-medium text-muted-foreground">{k}</dt>
      <dd className={`text-foreground ${block ? "mt-1 whitespace-pre-wrap" : "text-left"}`} dir={ltr ? "ltr" : undefined}>{v}</dd>
    </div>
  );
}
