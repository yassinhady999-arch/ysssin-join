import { supabase } from "./supabaseClient";

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
  submitted_at: string;
};

export async function getApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }

  return data || [];
}

export async function addApplication(app: Omit<Application, "id" | "submitted_at">) {
  const { data, error } = await supabase
    .from('applications')
    .insert([
      {
        name: app.name,
        age: app.age,
        country: app.country,
        governorate: app.governorate,
        experience: app.experience,
        why: app.why,
        percentage: app.percentage,
        whatsapp: app.whatsapp,
      }
    ]);

  if (error) {
    console.error('Error adding application:', error);
    throw error;
  }

  return data;
}

export async function deleteApplication(id: string) {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}
