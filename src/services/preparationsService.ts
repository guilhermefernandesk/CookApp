import { supabase } from "./supabase";

async function findByRecipeId(id: string) {
  console.log("🚀 ~ findByRecipeId ~ id:", id);
  const { data } = await supabase
    .from("preparations")
    .select("*")
    .eq("recipe_id", id)
    .order("step")
    .returns<PreparationsResponse[]>();
  return data ?? [];
}

export { findByRecipeId };
