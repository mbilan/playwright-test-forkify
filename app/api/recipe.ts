export interface Recipe {
  publisher: string;
  ingredients: Ingredient[];
  source_url: string;
  image_url: string;
  title: string;
  servings: number;
  cooking_time: number;
  id?: string;
}
export interface Ingredient {
  quantity?: number | null;
  unit: string;
  description: string;
}

export const buildRecipe = function (): Recipe {
  return {
    publisher: 'Television Food Network',
    ingredients: [
      {
        quantity: 1.25,
        unit: 'cup',
        description: 'unsweetened almond milk',
      },
      {
        quantity: 0.5,
        unit: 'cup',
        description: 'soy yoghurt',
      },
      {
        quantity: 2,
        unit: 'tbsps',
        description: 'cornflour',
      },
      {
        quantity: 2,
        unit: 'tbsps',
        description: 'sugar',
      },
      {
        quantity: null,
        unit: '',
        description: 'Warm pure maple syrup for serving',
      },
    ],
    source_url: 'https://foodnetwork.co.uk/recipes/vegan-french-toast',
    image_url: 'https://d2vsf1hynzxim7.cloudfront.net/production/media/23263/responsive-images/FNK_healthy-vegan-french-toast_H___default_2480_1860.jpg',
    title: 'Vegan French Toast',
    servings: 4,
    cooking_time: 50,
  };
};
