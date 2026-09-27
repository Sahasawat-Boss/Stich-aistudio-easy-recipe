export interface Ingredient {
  name: string;
  baseAmount: number;
  unit: string;
  category: 'Pantry' | 'Seafood' | 'Produce' | 'Fridge' | 'Sauce' | 'Garnish' | 'Bakery';
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerSeconds?: number;
  timerLabel?: string;
  heatLevel?: string;
  stageBadge?: string;
  tip?: string;
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  prepTime: string;
  prepMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  baseServings: number;
  rating: number;
  reviewCount: number;
  category: 'Thai' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Quick & Easy' | 'Italian' | 'Healthy' | 'Comfort Food' | 'Dessert';
  tags: string[];
  image: string;
  isFeatured?: boolean;
  dietary?: string;
  ingredients: Ingredient[];
  steps: CookingStep[];
  chefsSecret?: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 'pad-thai',
    title: 'Pad Thai',
    subtitle: 'Shrimp & crushed peanuts',
    description: 'Classic Thai stir-fried rice noodles with succulent shrimp, scrambled egg, roasted peanuts, bean sprouts, and fresh zesty lime.',
    prepTime: '25 min',
    prepMinutes: 25,
    difficulty: 'Easy',
    calories: 450,
    baseServings: 2,
    rating: 4.9,
    reviewCount: 3820,
    category: 'Thai',
    tags: ['Thai', 'Shrimp', 'Noodles', 'Quick meals', 'Quick (<25m)', 'comfort', 'seafood'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBARzrdGjTS_9Sv5qI7Cai1nRS4D-IviNWKRG8zZ71AFGoq7OCm85mQ-r_VVZUvGGr8ye2OLbQZDarwOfpJsxui9CCd948cmc_zZe0EjRGhBtKNhP79Cv7IFaM_ViZa-C_1-gJ4wVI3MyuL2jor3z_R_WFgBlEvmQC01ofUtgPEOLBamyK9AVRgW9WqGrrEyADIN98lfU83vz0eJULPFBrLG5mxjGEDLUUDDvnOxtBfbMY7bWWznnG0DQ',
    dietary: 'Gluten-Free Option',
    chefsSecret: "Don't over-soak noodles in hot water, or they will turn mushy in the wok!",
    ingredients: [
      { name: 'Rice noodles (sen lek)', baseAmount: 200, unit: 'g', category: 'Pantry' },
      { name: 'Fresh prawns (peeled & deveined)', baseAmount: 150, unit: 'g', category: 'Seafood' },
      { name: 'Farm-fresh eggs', baseAmount: 2, unit: '', category: 'Fridge' },
      { name: 'Authentic fish sauce', baseAmount: 2, unit: 'tbsp', category: 'Sauce' },
      { name: 'Tamarind paste', baseAmount: 1, unit: 'tbsp', category: 'Sauce' },
      { name: 'Palm sugar', baseAmount: 1, unit: 'tbsp', category: 'Pantry' },
      { name: 'Fresh bean sprouts', baseAmount: 1, unit: 'cup', category: 'Produce' },
      { name: 'Roasted crushed peanuts', baseAmount: 3, unit: 'tbsp', category: 'Garnish' },
      { name: 'Fresh lime wedge & garlic chives', baseAmount: 1, unit: 'serving', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prep the Noodles',
        instruction: 'Soak the rice noodles in warm water for 15 minutes until soft and pliable, then drain thoroughly.',
        timerSeconds: 900,
        timerLabel: 'Noodle Soak Timer',
        heatLevel: 'NO HEAT',
        stageBadge: 'Preparation',
        tip: 'Check that the noodles are bendable and flexible without breaking before draining.'
      },
      {
        stepNumber: 2,
        title: 'Sear the Proteins',
        instruction: 'Heat 2 tbsp oil in a pan or wok over medium-high heat. Add minced garlic and stir-fry the shrimp until pink and cooked through (about 2 minutes).',
        timerSeconds: 120,
        timerLabel: 'Shrimp Sear Timer',
        heatLevel: 'MEDIUM-HIGH HEAT',
        stageBadge: 'Prep & Sear',
        tip: "Don't overcrowd the pan so the shrimp get a nice golden sear instead of steaming in their own juices.",
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx_RzckeEStCFKDr7T2rq0JsaiuJfyS4tGJ9E7RXpcrJTexwpDi6gKZmvlS0Jr6T_L9pN09-eIRPSjD_yLO9Os7Tk_UZpBI18mfCLbWytBXY3PHMjvkB1o4WynjPGwc3vIa1CgpUXhu0Z36kSnF-joitJ2y3sMp-uTINwSw51V9mvwrPRAJGSoNdNDeue6Q1hLAo9MyVoAgjPcQT9kY79XqyVEI-Q3WeJ9h7x1bQjsTXL8W0XoK3AFFA'
      },
      {
        stepNumber: 3,
        title: 'Scramble the Eggs',
        instruction: 'Push shrimp to one side of the wok. Crack in the eggs and scramble lightly until just set.',
        timerSeconds: 60,
        timerLabel: 'Egg Scramble Timer',
        heatLevel: 'MEDIUM HEAT',
        stageBadge: 'Cooking',
        tip: 'Keep the curds soft and tender; they will finish cooking when tossed with noodles.'
      },
      {
        stepNumber: 4,
        title: 'Sauce & Toss',
        instruction: 'Add drained noodles, tamarind paste, fish sauce, and palm sugar. Toss everything vigorously until noodles absorb the sauce.',
        timerSeconds: 180,
        timerLabel: 'Sauce Toss Timer',
        heatLevel: 'HIGH HEAT',
        stageBadge: 'Flavor Searing',
        tip: 'Stir vigorously with chopsticks or a wooden spatula to coat each noodle strand evenly.'
      },
      {
        stepNumber: 5,
        title: 'Garnish & Finish',
        instruction: 'Turn off heat. Fold in fresh bean sprouts and garlic chives. Serve immediately topped with crushed roasted peanuts and fresh lime.',
        timerSeconds: 30,
        timerLabel: 'Plating Time',
        heatLevel: 'OFF HEAT',
        stageBadge: 'Final Touch',
        tip: 'Squeeze fresh lime right before eating for that authentic zesty street food punch!'
      }
    ]
  },
  {
    id: 'thai-basil-chicken',
    title: 'Thai Basil Chicken',
    subtitle: 'Spicy savory street food classic',
    description: 'Spicy, savory street food classic served best over warm jasmine rice with a crispy fried egg on top.',
    prepTime: '25 min',
    prepMinutes: 25,
    difficulty: 'Easy',
    calories: 480,
    baseServings: 2,
    rating: 4.9,
    reviewCount: 320,
    category: 'Thai',
    tags: ['Thai', 'Chicken', 'Quick meals', 'Quick (<25m)', 'Dinner'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCecZJT-jNsVw5YJ_u6illXy4P8tYt4MLRSAvqrZFjs8a6Ou3I4B_gg7fpAUGlaZOPIXomv2CAjp0sdpF4Yb0tGthOnkl7RBS0k9HNNByOSd2T4oMfU9NDytC7Fzfhhg7-vj14fj_kBoDA4pYLsA1wBFXDS2epcfJHZ2gvvJhGjSDE5MdF6vPKNL4KmbtIFH68pQgw47A0TvNHMZUySoHafyXlfU4Q9YqtMPZ7skyp_t1O4JeKMNe0BFQ',
    isFeatured: true,
    dietary: 'High Protein',
    chefsSecret: 'Use fresh holy basil or Thai sweet basil and throw it in at the very end with heat turned off to preserve the aroma!',
    ingredients: [
      { name: 'Ground chicken thighs', baseAmount: 300, unit: 'g', category: 'Fridge' },
      { name: 'Thai holy basil leaves', baseAmount: 1, unit: 'bunch', category: 'Produce' },
      { name: 'Bird’s eye chilies', baseAmount: 4, unit: 'pieces', category: 'Produce' },
      { name: 'Garlic cloves (crushed)', baseAmount: 5, unit: 'cloves', category: 'Produce' },
      { name: 'Oyster sauce & dark soy', baseAmount: 2, unit: 'tbsp', category: 'Sauce' },
      { name: 'Crispy fried egg (kai dao)', baseAmount: 2, unit: '', category: 'Fridge' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mince & Pestle Aromatics',
        instruction: 'Coarsely pound garlic and bird’s eye chilies in a mortar and pestle to release maximum volatile oils.',
        timerSeconds: 120,
        timerLabel: 'Aromatics Prep',
        heatLevel: 'NO HEAT',
        stageBadge: 'Mise en place'
      },
      {
        stepNumber: 2,
        title: 'Flash Fry the Aromatics',
        instruction: 'Heat wok on high with oil. Toss garlic-chili mixture and sizzle until deeply fragrant, about 30 seconds.',
        timerSeconds: 30,
        timerLabel: 'Sizzle Timer',
        heatLevel: 'HIGH HEAT',
        stageBadge: 'Aromatics'
      },
      {
        stepNumber: 3,
        title: 'Brown the Minced Chicken',
        instruction: 'Add chicken and break apart vigorously with the spatula until nicely browned and separated.',
        timerSeconds: 240,
        timerLabel: 'Browning Timer',
        heatLevel: 'MEDIUM-HIGH',
        stageBadge: 'Protein'
      },
      {
        stepNumber: 4,
        title: 'Sauce and Holy Basil Fold',
        instruction: 'Pour in soy and oyster sauce sauce mix. Stir fast on high heat. Kill the heat and fold in holy basil until just wilted.',
        timerSeconds: 45,
        timerLabel: 'Basil Wilt Timer',
        heatLevel: 'OFF HEAT',
        stageBadge: 'Finishing'
      }
    ]
  },
  {
    id: 'tom-yum-goong',
    title: 'Tom Yum Goong',
    subtitle: 'Aromatic lemongrass soup',
    description: 'Steaming bowl of spicy Tom Yum Goong soup with rich reddish broth, fresh river prawns, straw mushrooms, lemongrass stalks, and kaffir lime leaves.',
    prepTime: '30 min',
    prepMinutes: 30,
    difficulty: 'Medium',
    calories: 320,
    baseServings: 2,
    rating: 4.9,
    reviewCount: 1450,
    category: 'Thai',
    tags: ['Thai', 'Soup', 'Seafood', 'Spicy', 'Dinner'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5KzvLvLve0qVgVgkcPXbFDaB4NdLgtCMarQOjT16ei0G8ziNQ0xiSM6pzPdIAKJei0MOlGucqHOsnpWOD9zwC_wloQAsEUZdJDA0yfC4GVngT3HhgV9mZFMvtja-B9fpYKOJUovrITSrun51uooczcsUjOjshEpioJEGAOle6EtkqxBj6IzPYqrqYqSW7dTEO8FDYjzgPfgvSaDqP08NmY29gDktK_0vLVLa4QqfahD6KjB_50OVn3A',
    dietary: 'Gluten-Free',
    chefsSecret: 'Lightly bruise the lemongrass and kaffir leaves with the back of your knife to release the essential citrus oils.',
    ingredients: [
      { name: 'Jumbo river prawns', baseAmount: 250, unit: 'g', category: 'Seafood' },
      { name: 'Lemongrass stalks', baseAmount: 2, unit: 'stalks', category: 'Produce' },
      { name: 'Galangal slices', baseAmount: 5, unit: 'slices', category: 'Produce' },
      { name: 'Kaffir lime leaves', baseAmount: 4, unit: 'leaves', category: 'Produce' },
      { name: 'Straw mushrooms', baseAmount: 100, unit: 'g', category: 'Produce' },
      { name: 'Thai chili paste (nam prik pao)', baseAmount: 2, unit: 'tbsp', category: 'Sauce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Simmer Herbal Broth',
        instruction: 'Bring prawn shell stock to a boil with bruised lemongrass, galangal, and kaffir lime leaves for 8 minutes.',
        timerSeconds: 480,
        timerLabel: 'Broth Infusion',
        heatLevel: 'MEDIUM HEAT'
      },
      {
        stepNumber: 2,
        title: 'Add Prawns & Mushrooms',
        instruction: 'Drop in fresh river prawns and halved straw mushrooms. Cook until prawns turn coral orange.',
        timerSeconds: 180,
        timerLabel: 'Prawn Cook Timer',
        heatLevel: 'MEDIUM-HIGH'
      },
      {
        stepNumber: 3,
        title: 'Season with Chili Paste & Lime',
        instruction: 'Stir in roasted chili paste, fish sauce, and fresh lime juice off heat for maximum vibrant citrus acidity.',
        timerSeconds: 60,
        timerLabel: 'Finishing Seasoning',
        heatLevel: 'OFF HEAT'
      }
    ]
  },
  {
    id: 'carbonara',
    title: 'Creamy Carbonara',
    subtitle: 'Guanciale & pecorino cream',
    description: 'Authentic Italian spaghetti carbonara coated with glossy pecorino and egg cream sauce, crispy browned guanciale cubes, and freshly cracked black pepper.',
    prepTime: '25 min',
    prepMinutes: 25,
    difficulty: 'Medium',
    calories: 580,
    baseServings: 2,
    rating: 4.7,
    reviewCount: 2190,
    category: 'Italian',
    tags: ['Pasta', 'Italian', 'Quick meals', 'Quick (<25m)', 'Comfort Food', 'comfort'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOyOcWn3YFvbvEf6jF8_VXsu3aidSuhjasq8VpR-trj06bll4eQItNe0M-UiXIxgxa98g0fvS7yH80bpAIQuD7UwKzMOsAqTvcoo4tSlVoHq50jwtapbk3xKnAWEV6BPebfmex77fArLV_Eoe-c5rIYfDbkmeu67usV_LWf_s-24TCqO5pYTtfKrqxi5l0azNbZhHzeRSSTAaLLnY9XweyqKRVlczA7UtcLh9flEhfrzgL3x6iciQL5Q',
    dietary: 'Classic Recipe',
    chefsSecret: 'Never add cream! The glossy emulsion comes purely from whisked egg yolks, grated Pecorino Romano, and starchy pasta cooking water.',
    ingredients: [
      { name: 'Bronze-die Spaghetti', baseAmount: 200, unit: 'g', category: 'Pantry' },
      { name: 'Guanciale cured pork jowl', baseAmount: 120, unit: 'g', category: 'Fridge' },
      { name: 'Egg yolks + 1 whole egg', baseAmount: 3, unit: '', category: 'Fridge' },
      { name: 'Pecorino Romano cheese', baseAmount: 60, unit: 'g', category: 'Fridge' },
      { name: 'Coarsely cracked black pepper', baseAmount: 1, unit: 'tbsp', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Crisp the Guanciale',
        instruction: 'Render guanciale in a cold skillet on medium heat until crispy golden brown. Reserve the rendered fat.',
        timerSeconds: 420,
        timerLabel: 'Guanciale Render',
        heatLevel: 'MEDIUM HEAT'
      },
      {
        stepNumber: 2,
        title: 'Boil Al Dente Pasta',
        instruction: 'Cook spaghetti in salted boiling water until 2 minutes shy of al dente.',
        timerSeconds: 480,
        timerLabel: 'Pasta Timer',
        heatLevel: 'BOILING'
      },
      {
        stepNumber: 3,
        title: 'Mantecatura & Emulsion',
        instruction: 'Whisk eggs with grated Pecorino and black pepper. Toss pasta into skillet off heat, adding egg mixture and pasta water to emulsify.',
        timerSeconds: 90,
        timerLabel: 'Emulsion Toss',
        heatLevel: 'OFF HEAT'
      }
    ]
  },
  {
    id: 'salmon-rice-bowl',
    title: 'Crispy Salmon Teriyaki Bowl',
    subtitle: 'Avocado & edamame seeds',
    description: 'Pan-seared crispy skin salmon fillet glazed in rich dark amber teriyaki sauce over fluffy steamed jasmine rice, with fan-sliced avocado and edamame.',
    prepTime: '20 min',
    prepMinutes: 20,
    difficulty: 'Easy',
    calories: 520,
    baseServings: 2,
    rating: 4.8,
    reviewCount: 960,
    category: 'Healthy',
    tags: ['Healthy', 'Salmon', 'Rice', 'Quick meals', 'Quick (<25m)', 'healthy'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFKJQxJ6HpBN0ully3UnSzd1I-67TA_NSSu_W5i1lVk8_z1aCYddoDfa1_Mrd_1WArL2_IhK7wHYJBjNwe_0_T_Hm_Y67nNW7TfYZ_ZVPqvA1BCiBgB9-XSkzwpdmAFHTvlIv1vVSHwP0ZH_MtZJP1iemOgNnFxAl7oYAeJxEJbQpo5Fk9aPKIJ9Y4tqfyUgATGgx2pClJS9e3tFvvEoEwJ0hsIa6Yp3_N7QK6q9shP8Rn-0YsDgV3gQ',
    dietary: 'Omega-3 Rich',
    chefsSecret: 'Press down gently on the salmon fillet with a spatula for the first 30 seconds of searing to keep the skin uniformly crisp and flat.',
    ingredients: [
      { name: 'Salmon fillets (skin on)', baseAmount: 2, unit: 'fillets', category: 'Seafood' },
      { name: 'Steamed sushi/jasmine rice', baseAmount: 300, unit: 'g', category: 'Pantry' },
      { name: 'Ripe Hass avocado', baseAmount: 1, unit: '', category: 'Produce' },
      { name: 'Steamed edamame beans', baseAmount: 80, unit: 'g', category: 'Produce' },
      { name: 'Housemade teriyaki glaze', baseAmount: 3, unit: 'tbsp', category: 'Sauce' },
      { name: 'Toasted white sesame seeds', baseAmount: 1, unit: 'tsp', category: 'Garnish' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Score & Crisp Salmon',
        instruction: 'Pat salmon skin completely dry. Sear skin-side down in a hot pan for 4 minutes until ultra crispy.',
        timerSeconds: 240,
        timerLabel: 'Skin Sear',
        heatLevel: 'MEDIUM-HIGH'
      },
      {
        stepNumber: 2,
        title: 'Glaze with Teriyaki',
        instruction: 'Flip salmon and brush generously with rich teriyaki glaze, bubbling for 2 minutes to caramelize.',
        timerSeconds: 120,
        timerLabel: 'Caramelize Glaze',
        heatLevel: 'MEDIUM HEAT'
      },
      {
        stepNumber: 3,
        title: 'Assemble Bowl',
        instruction: 'Scoop warm rice into earthenware bowls. Top with glazed salmon, avocado slices, edamame, and sesame.',
        timerSeconds: 60,
        timerLabel: 'Plating'
      }
    ]
  },
  {
    id: 'fried-rice',
    title: 'Fried Rice',
    subtitle: 'Golden wok-tossed egg & scallions',
    description: 'Golden wok-tossed egg fried rice with sweet carrots, green peas, fragrant scallions, and savory seasonings.',
    prepTime: '15 min',
    prepMinutes: 15,
    difficulty: 'Easy',
    calories: 410,
    baseServings: 2,
    rating: 4.8,
    reviewCount: 1820,
    category: 'Quick & Easy',
    tags: ['Rice', 'Quick meals', 'Quick (<25m)', 'Dinner', 'Easy Prep'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo_e1pUnWUwOO_bSabfOFIeWipeTXScRihDspUi4SfU-I5fP4-4VD24Fcj7SdMIireREehIRVOocklWApVx26nQV3Pvz8e0CxfUsjrDj_DVu-r60NWjV-6MiwBXyA5HcFoUr_baFw__JuXX7VgB18bdwr5qEyoji58CIUA-wGsksXF_Y4jBf9Ltjykj2HuJLDh2qYUtRgBHIYaEiC619GwCBao36sEa55l84W9Q6P1KdGs_bh3Jd1m4A',
    dietary: 'Vegetarian Friendly',
    chefsSecret: 'Use cold leftover day-old jasmine rice so the grains separate cleanly in the wok without clumping.',
    ingredients: [
      { name: 'Day-old cold cooked jasmine rice', baseAmount: 350, unit: 'g', category: 'Pantry' },
      { name: 'Eggs (beaten)', baseAmount: 2, unit: '', category: 'Fridge' },
      { name: 'Green scallions (thinly sliced)', baseAmount: 3, unit: 'stalks', category: 'Produce' },
      { name: 'Garlic & light soy sauce', baseAmount: 2, unit: 'tbsp', category: 'Sauce' },
      { name: 'Toasted sesame oil', baseAmount: 1, unit: 'tsp', category: 'Sauce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Wok Scramble Eggs',
        instruction: 'Flash-cook scrambled eggs in smoking oil until fluffy, remove and set aside.',
        timerSeconds: 45,
        timerLabel: 'Egg Flash Cook',
        heatLevel: 'HIGH HEAT'
      },
      {
        stepNumber: 2,
        title: 'Toss Grains in High Heat',
        instruction: 'Add cold rice to sizzling wok, pressing down with ladle to separate and toast every individual grain.',
        timerSeconds: 180,
        timerLabel: 'Wok Toasting',
        heatLevel: 'HIGH HEAT'
      },
      {
        stepNumber: 3,
        title: 'Season & Fold Scallions',
        instruction: 'Splash soy sauce along the wok edge for wok hei smoke, fold in eggs and scallions.',
        timerSeconds: 60,
        timerLabel: 'Finish Wok Hei',
        heatLevel: 'HIGH HEAT'
      }
    ]
  },
  {
    id: 'pancakes',
    title: 'Souffle Pancakes',
    subtitle: 'Fluffy golden buttermilk stack',
    description: 'Fluffy golden stack of buttermilk pancakes topped with fresh ripe blueberries, melting butter cube, and amber maple syrup.',
    prepTime: '20 min',
    prepMinutes: 20,
    difficulty: 'Easy',
    calories: 390,
    baseServings: 2,
    rating: 4.8,
    reviewCount: 2310,
    category: 'Breakfast',
    tags: ['Breakfast', 'Quick meals', 'Quick (<25m)', 'Comfort Food', 'comfort'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Lhuru9FyRYmaMsxxbYR-ZtjS-3HK1BEkHePc0xzfBcc-urIVEvxITP150VvXSSDwGAzNb_ngAd3x_pb6AcHAvoR6Y1lXO7SHMUp_mE0lAzymiStRsDou5GQoDzJo2OgzPVOm2wK4pzy0UyTu7TVCjARdplvijmk102GPVHdksqoL2zG7byZI3jfVD6HjSHysZ86aBaFk5l4AS3t_QNJIXJv8bDc3gNof8b0cW3gFQG24vy-A711FSA',
    dietary: 'Vegetarian',
    chefsSecret: 'Do not overmix the batter! Small lumps are your friends—they create soft pockets of steam while cooking.',
    ingredients: [
      { name: 'All-purpose flour', baseAmount: 180, unit: 'g', category: 'Pantry' },
      { name: 'Fresh buttermilk', baseAmount: 240, unit: 'ml', category: 'Fridge' },
      { name: 'Egg', baseAmount: 1, unit: '', category: 'Fridge' },
      { name: 'Baking powder & pinch of salt', baseAmount: 1, unit: 'tsp', category: 'Pantry' },
      { name: 'Fresh berries & pure maple syrup', baseAmount: 1, unit: 'serving', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Whisk Batter Gently',
        instruction: 'Fold wet into dry ingredients until barely combined with gentle strokes.',
        timerSeconds: 120,
        timerLabel: 'Batter Mix'
      },
      {
        stepNumber: 2,
        title: 'Griddle Until Bubbles Form',
        instruction: 'Ladle onto greased non-stick pan over medium-low heat. Flip when bubbles pop on surface.',
        timerSeconds: 150,
        timerLabel: 'First Side Cook',
        heatLevel: 'MEDIUM-LOW'
      },
      {
        stepNumber: 3,
        title: 'Golden Flip & Stack',
        instruction: 'Cook 2 more minutes until golden and puffed. Serve with butter and maple drizzle.',
        timerSeconds: 120,
        timerLabel: 'Second Side Cook',
        heatLevel: 'MEDIUM-LOW'
      }
    ]
  },
  {
    id: 'chicken-stir-fry',
    title: 'Chicken Stir Fry',
    subtitle: 'Crisp broccoli & bell peppers',
    description: 'Healthy chicken vegetable stir fry with tender sliced chicken breast, vibrant broccoli florets, crisp red bell pepper strips, and sesame seeds.',
    prepTime: '20 min',
    prepMinutes: 20,
    difficulty: 'Easy',
    calories: 380,
    baseServings: 2,
    rating: 4.8,
    reviewCount: 890,
    category: 'Quick & Easy',
    tags: ['Chicken', 'Healthy', 'Quick meals', 'Quick (<25m)', 'Dinner'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzqZK7uX5JxMqqTle8MyfIyhDHGzikFF6WE1zBMT9NNDkogoIt_THaOE5SJJQsIuDGBJznozf1OZdpaquUDgudKSJtufeFrDl4jWvhW8GShIE6YWAZMk7-4cpYy_nYTSEjDNTDKLqxSsI0FT7dW9PMiZcq1MR2uNGlxACg4dPsnTHr_u86Arq9UONbUG27fNG_W5VsKrsrcluOHSvNEVkbcr1FnJw9I_CvWqCy0txofiWa8fqbXibpYA',
    dietary: 'Low Carb',
    chefsSecret: 'Velvet the chicken with 1 tsp cornstarch and soy sauce for 10 minutes before cooking to keep the meat incredibly tender.',
    ingredients: [
      { name: 'Boneless chicken breast (sliced)', baseAmount: 300, unit: 'g', category: 'Fridge' },
      { name: 'Fresh broccoli florets', baseAmount: 150, unit: 'g', category: 'Produce' },
      { name: 'Red bell pepper (sliced)', baseAmount: 1, unit: '', category: 'Produce' },
      { name: 'Garlic ginger stir-fry sauce', baseAmount: 3, unit: 'tbsp', category: 'Sauce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Flash Sear Chicken',
        instruction: 'Stir fry chicken strips on screaming hot wok until seared on both sides.',
        timerSeconds: 180,
        timerLabel: 'Chicken Sear',
        heatLevel: 'HIGH HEAT'
      },
      {
        stepNumber: 2,
        title: 'Toss Crisp Vegetables',
        instruction: 'Add broccoli and peppers with a splash of water, steaming for 2 minutes.',
        timerSeconds: 120,
        timerLabel: 'Veggie Toss',
        heatLevel: 'HIGH HEAT'
      },
      {
        stepNumber: 3,
        title: 'Glaze and Coat',
        instruction: 'Pour sauce over wok contents, boiling rapidly to create a glossy clinging glaze.',
        timerSeconds: 60,
        timerLabel: 'Glaze Thickening',
        heatLevel: 'HIGH HEAT'
      }
    ]
  },
  {
    id: 'beef-burger',
    title: 'Beef Burger',
    subtitle: 'Artisanal smash cheeseburger',
    description: 'Artisanal smash cheeseburger on a toasted brioche bun with juicy grilled beef patty, melted cheddar cheese, crisp lettuce, tomato, and secret sauce.',
    prepTime: '25 min',
    prepMinutes: 25,
    difficulty: 'Easy',
    calories: 620,
    baseServings: 2,
    rating: 4.9,
    reviewCount: 1650,
    category: 'Dinner',
    tags: ['Dinner', 'Comfort Food', 'Quick meals', 'Quick (<25m)', 'comfort'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJBwOVHWPjSPBOwXDNX3TYrabhZBB_1w5lVIIPj2wHR_SLk5xatkMZVlLaTco3_0O1znIJB_K_ReRABlqQuoBNKJd_rIAmYSnUTL5mSyb71PpG-N2hEp5_hNTtSWbibgwGrOJZr_ch5CRxu53DLi_egf46e5FNqa-QX-KT55BfkBn98z9IusCn0iSRKvdEX2BxO7S3VAiRhEzP83dYsZ382JVbU4yi31Csm-hXJ98Lo0WeLG6Oy8lAng',
    dietary: 'Classic Comfort',
    chefsSecret: 'Smash the patty paper-thin on a scorching cast iron skillet within the first 30 seconds to lock in crispy lace edges.',
    ingredients: [
      { name: 'Ground chuck beef (80/20)', baseAmount: 320, unit: 'g', category: 'Fridge' },
      { name: 'Aged sharp cheddar cheese slices', baseAmount: 2, unit: 'slices', category: 'Fridge' },
      { name: 'Brioche hamburger buns', baseAmount: 2, unit: 'buns', category: 'Bakery' },
      { name: 'Butterhead lettuce & beefsteak tomato', baseAmount: 1, unit: 'serving', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Toast Brioche Buns',
        instruction: 'Butter the cut sides of brioche buns and toast on medium heat until golden brown.',
        timerSeconds: 90,
        timerLabel: 'Bun Toast',
        heatLevel: 'MEDIUM HEAT'
      },
      {
        stepNumber: 2,
        title: 'Smash Patty & Melt Cheese',
        instruction: 'Firmly smash seasoned beef ball onto smoking hot skillet. Flip after 2 mins and drape cheddar cheese to melt.',
        timerSeconds: 150,
        timerLabel: 'Patty Sear',
        heatLevel: 'HIGH HEAT'
      },
      {
        stepNumber: 3,
        title: 'Stack & Serve',
        instruction: 'Layer secret sauce, lettuce, tomato, and cheesy patty inside toasted buns.',
        timerSeconds: 45,
        timerLabel: 'Assembly'
      }
    ]
  },
  {
    id: 'thai-green-curry',
    title: 'Classic Thai Green Curry',
    subtitle: 'Fragrant aromatic herbs & coconut',
    description: 'Fragrant authentic Thai green curry with tender chicken pieces, vibrant Thai eggplant, red chili ribbons, and fresh sweet Thai basil.',
    prepTime: '35 min',
    prepMinutes: 35,
    difficulty: 'Easy',
    calories: 490,
    baseServings: 2,
    rating: 4.9,
    reviewCount: 1120,
    category: 'Thai',
    tags: ['Thai', 'Chicken', 'Curry', 'Dinner', 'thai'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSDVqOmZOnuBy5HZskEF0_AOZ1zjo98gq8muxYlq0qR5_tsHxw6g5xfNRReswj4BaAB4T_fgVb6v053Z-_9J3PGP3T1t2REEt91FlbQ1MtDMGnpzunmriXDFE9RM9cCa9EeJv3GDNL4jrRdh6DUA2CCuSdBdaQeUZ7vfzvdQScLpQd7Zz7T7yjmp42c0I_NHy6NgsrcUnCdxyICswzthnBv4gNhlloWM45J0wFLpCzYSrTNaJO8NBucA',
    dietary: 'Gluten-Free',
    chefsSecret: 'Crack the coconut cream first by simmering on medium heat until fragrant coconut oil separates before frying the curry paste.',
    ingredients: [
      { name: 'Chicken breast/thighs (sliced)', baseAmount: 250, unit: 'g', category: 'Fridge' },
      { name: 'Green curry paste', baseAmount: 2, unit: 'tbsp', category: 'Pantry' },
      { name: 'Full-fat coconut milk', baseAmount: 400, unit: 'ml', category: 'Pantry' },
      { name: 'Thai round eggplants (quartered)', baseAmount: 4, unit: '', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fry Green Curry Paste',
        instruction: 'Simmer 1/3 of the coconut milk until oil splits, then fry curry paste until deeply fragrant.',
        timerSeconds: 240,
        timerLabel: 'Paste Sizzle',
        heatLevel: 'MEDIUM HEAT'
      },
      {
        stepNumber: 2,
        title: 'Simmer Chicken & Eggplant',
        instruction: 'Add chicken, remaining coconut milk, and eggplants. Simmer gently until eggplants are tender.',
        timerSeconds: 600,
        timerLabel: 'Curry Simmer',
        heatLevel: 'MEDIUM-LOW'
      }
    ]
  },
  {
    id: 'avocado-poached-egg-toast',
    title: 'Avocado & Poached Egg Toast',
    subtitle: 'Rustic sourdough & runny yolk',
    description: 'Rustic artisan sourdough toast generously topped with crushed avocado, perfectly soft-poached pasture-raised farm egg, chili flakes, and microgreens.',
    prepTime: '12 min',
    prepMinutes: 12,
    difficulty: 'Easy',
    calories: 340,
    baseServings: 2,
    rating: 4.7,
    reviewCount: 740,
    category: 'Breakfast',
    tags: ['Breakfast', 'Avocado', 'Healthy', 'Quick meals', 'Quick (<25m)', 'healthy'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgtgT4h93C6fu4lB7xpiruVc0wB8MQBrG6MmNMc5Goa0mKmn41DsuQt1so70cb1v2XmIqL6MgI2Tmv9pcn25jP_KekAyZjgPlNjVoXj2aC1fYz1Huj9qyOudfg6mEl7V8skUsdvlyZD5xmew-N_8FCecV9rboEtKkRuGCrAOGWfTExlHVB4nO-3rtvDwOLD9hTZYzbqUUFlijiSqTg6Whv9HBPDt4Yb-_s6OLlYa3HrA5gQKC9cBHc3w',
    dietary: 'Vegetarian',
    chefsSecret: 'Swirl simmering water into a vortex before dropping the egg in to keep the white tightly bound around the yolk.',
    ingredients: [
      { name: 'Artisan sourdough bread slices', baseAmount: 2, unit: 'thick slices', category: 'Bakery' },
      { name: 'Fresh Hass avocado (mashed)', baseAmount: 1, unit: '', category: 'Produce' },
      { name: 'Pasture-raised eggs', baseAmount: 2, unit: '', category: 'Fridge' },
      { name: 'Flaky sea salt & Aleppo chili flakes', baseAmount: 1, unit: 'pinch', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Toast Sourdough',
        instruction: 'Grill or toast sourdough until golden and sturdy.',
        timerSeconds: 120,
        timerLabel: 'Toast Bread'
      },
      {
        stepNumber: 2,
        title: 'Poach Egg to Runny Perfection',
        instruction: 'Simmer egg in swirling water for 3 minutes for firm whites with liquid gold yolk.',
        timerSeconds: 180,
        timerLabel: 'Egg Poach',
        heatLevel: 'GENTLE SIMMER'
      }
    ]
  },
  {
    id: 'tonkotsu-ramen',
    title: 'Authentic Tonkotsu Ramen',
    subtitle: 'Chashu pork & rich bone broth',
    description: 'Steaming bowl of authentic tonkotsu ramen with opaque milky broth, thin ramen noodles, tender chashu pork belly, ajitsuke soft boiled egg, and nori.',
    prepTime: '40 min',
    prepMinutes: 40,
    difficulty: 'Medium',
    calories: 680,
    baseServings: 2,
    rating: 5.0,
    reviewCount: 3120,
    category: 'Dinner',
    tags: ['Dinner', 'Noodles', 'Comfort Food', 'comfort'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgFKCO9g1zbIlvQHF6UIy0dKp1whRGr4SuBmB-8bN-EKymI8VJ871gvoCA4jlbfP87vnZCeQcW1o2zLnNJMWn7NmDDvrlbB2btFbQSXQ-9uZY4eWnJja3sTmWyIC9vYpWsHsTXw_2Q8Lis1LHevb6exalgJWJXlIBA9_sK09q1H6Vr3Y9qB_5SI72dtDm57lbarUehfUBPYO6wU47E3Cnj2g52m6lFTH51372BhokBDVZJX9DvrsbGIA',
    dietary: 'Signature Specialty',
    chefsSecret: 'Warm your ramen bowl with hot water before pouring in the piping hot broth so it retains heat to the last slurp.',
    ingredients: [
      { name: 'Fresh ramen noodles', baseAmount: 240, unit: 'g', category: 'Pantry' },
      { name: 'Rich tonkotsu broth base', baseAmount: 600, unit: 'ml', category: 'Pantry' },
      { name: 'Braised chashu pork slices', baseAmount: 4, unit: 'slices', category: 'Fridge' },
      { name: 'Marinated soft boiled ramen eggs', baseAmount: 2, unit: '', category: 'Fridge' },
      { name: 'Menma bamboo shoots & nori', baseAmount: 1, unit: 'serving', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Boil Fresh Noodles',
        instruction: 'Cook fresh ramen noodles in rapid rolling boil for exactly 75 seconds for katame (firm bite).',
        timerSeconds: 75,
        timerLabel: 'Noodle Boil',
        heatLevel: 'RAPID BOIL'
      },
      {
        stepNumber: 2,
        title: 'Pour Broth & Arrange Toppings',
        instruction: 'Shake off all excess water from noodles, transfer to hot broth bowl, and artistically arrange chashu, egg halves, and scallions.',
        timerSeconds: 60,
        timerLabel: 'Plating'
      }
    ]
  },
  {
    id: 'berry-acai-bowl',
    title: 'Fresh Berry Acai Bowl',
    subtitle: 'Chilled acai & toasted granola',
    description: 'Rich deep-purple chilled acai berry smoothie bowl decorated with orderly rows of sliced ripe strawberries, fresh blueberries, golden toasted granola clusters, and chia seeds.',
    prepTime: '10 min',
    prepMinutes: 10,
    difficulty: 'Easy',
    calories: 310,
    baseServings: 2,
    rating: 4.8,
    reviewCount: 650,
    category: 'Breakfast',
    tags: ['Breakfast', 'Healthy', 'Quick meals', 'Quick (<25m)', 'healthy', 'Dessert'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBePHWcp7mubL2nbbMNfwJAdbbXcSiDMczLTshOZC7VszMAusGZQ9ZPSJjxpxavg-83Z0Ng1pUigs29LmTldYg1jrx4xwM4diQZxsdwYmjexEscr9zbM8gl7mFLiB3T-CXkyIeHdGHybaUAh6s4C8MVsjIL3hE9zkNP1iIPCPb2n9jZsacuMLfzs1lmlLk0iw_WjtEnjgey0qEUFfPCXlbtraQu9_-NFPjGESsZDhkdQUm5dIcE844BYQ',
    dietary: 'Vegan & Superfood',
    chefsSecret: 'Blend frozen acai with minimal liquid using the blender tamper to keep a thick, soft-serve ice cream consistency that holds fruit toppings.',
    ingredients: [
      { name: 'Pure frozen acai packet', baseAmount: 200, unit: 'g', category: 'Fridge' },
      { name: 'Frozen ripe bananas', baseAmount: 1, unit: '', category: 'Produce' },
      { name: 'Artisan honey almond granola', baseAmount: 60, unit: 'g', category: 'Pantry' },
      { name: 'Fresh strawberries & blueberries', baseAmount: 1, unit: 'cup', category: 'Produce' },
      { name: 'Chia seeds & toasted coconut', baseAmount: 1, unit: 'tbsp', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Blend Thick Acai Base',
        instruction: 'Blend frozen acai and banana until thick and creamy like soft serve.',
        timerSeconds: 90,
        timerLabel: 'Blend Pulse'
      },
      {
        stepNumber: 2,
        title: 'Decorate & Garnish',
        instruction: 'Spoon into chilled bowls and arrange fresh fruit, crunchy granola, and chia seeds in straight lines.',
        timerSeconds: 60,
        timerLabel: 'Garnish'
      }
    ]
  }
];

export const INITIAL_FAVORITES = [
  'pad-thai',
  'tom-yum-goong',
  'tonkotsu-ramen',
  'carbonara',
  'pancakes',
  'salmon-rice-bowl'
];
