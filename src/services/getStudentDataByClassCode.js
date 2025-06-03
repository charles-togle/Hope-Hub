import supabase from '@/client/supabase';

export async function getStudentsByClassCode (classCode) {
  const { data, error } = await supabase.rpc('get_students_by_class', {
    class_code_input: classCode,
  });

  if (error) {
    console.error('Error:', error);
    return [];
  }
  return data;
}
