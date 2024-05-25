import { supabase } from "./supabase";

async function findByIds(ids: string[]) {
  const { data } = await supabase
    .from("ingredients")
    .select()
    .in("id", ids)
    .order("name")
    .returns<IngredientResponse[]>();

  return data ?? [];
}

async function findByRecipeId(id: string) {
  try {
    const { data, error } = await supabase.rpc("get_ingredients_by_recipe_id", { p_recipe_id: id });

    if (error) {
      console.error("Supabase query error:", error);
      return [];
    }

    if (!data) {
      console.log("No data found");
      return [];
    }

    // Remove duplicates based on id or name
    const uniqueIngredients: IngredientResponse[] = data.reduce(
      (acc: IngredientResponse[], current: IngredientResponse) => {
        const duplicate = acc.find(item => item.id === current.id || item.name === current.name);
        if (!duplicate) {
          acc.push(current);
        }
        return acc;
      },
      []
    );

    return uniqueIngredients;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
async function findAll() {
  const { data } = await supabase.from("ingredients").select().order("name").returns<IngredientResponse[]>();

  return data ?? [];
}

export { findAll, findByIds, findByRecipeId };
