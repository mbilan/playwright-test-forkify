interface Recipe {
  publisher: string;
  ingredients: Ingredient[];
  source_url: string;
  image_url: string;
  title: string;
  servings: number;
  cooking_time: number;
  id: string;
}
interface Ingredient {
  quantity?: number;
  unit: string;
  description: string;
}
