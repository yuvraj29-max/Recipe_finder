const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipeGrid = document.getElementById('recipe-grid');
const resultsHeading = document.getElementById('results-heading');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// ==========================================
// 1. Initial Famous Indian Data
// Updated with ultra-reliable Wikimedia Commons images!
// ==========================================
const famousIndianRecipes = [
  {
    strMeal: "Paneer Butter Masala",
    strMealThumb: "https://en.wikipedia.org/wiki/Special:FilePath/Paneer_Butter_Masala.jpg?width=600",
    strArea: "Indian",
    strCategory: "Vegetarian",
    strSource: "https://www.vegrecipesofindia.com/paneer-butter-masala/"
  },
  {
    strMeal: "Gulab Jamun",
    strMealThumb: "https://en.wikipedia.org/wiki/Special:FilePath/Gulabjamun_op.jpg?width=600",
    strArea: "Indian",
    strCategory: "Dessert (Sweet)",
    strSource: "https://www.vegrecipesofindia.com/gulab-jamun-recipe-made-with-milk-powder/"
  },
  {
    strMeal: "Chole Bhature",
    strMealThumb: "https://en.wikipedia.org/wiki/Special:FilePath/Chole_bhature.jpg?width=600",
    strArea: "Indian",
    strCategory: "Vegetarian",
    strSource: "https://www.vegrecipesofindia.com/chole-bhature-recipe/"
  },
  {
    strMeal: "Gajar Ka Halwa",
    // Notice the hyphens below instead of underscores!
    strMealThumb: "https://en.wikipedia.org/wiki/Special:FilePath/Gajar-Ka-Halwa.jpg?width=600",
    strArea: "Indian",
    strCategory: "Dessert (Sweet)",
    strSource: "https://www.vegrecipesofindia.com/gajar-halwa-recipe-gajar-ka-halwa/"
  },
  {
    strMeal: "Dal Makhani",
    strMealThumb: "https://en.wikipedia.org/wiki/Special:FilePath/Dal_Makhani.jpg?width=600",
    strArea: "Indian",
    strCategory: "Vegetarian",
    strSource: "https://www.vegrecipesofindia.com/dal-makhani-restaurant-style-recipe/"
  },
  {
    strMeal: "Rasgulla",
    strMealThumb: "https://en.wikipedia.org/wiki/Special:FilePath/Rasagulla.jpg?width=600",
    strArea: "Indian",
    strCategory: "Dessert (Sweet)",
    strSource: "https://www.vegrecipesofindia.com/rasgulla-recipe-how-to-make-rasgulla/"
  }
];

// ==========================================
// 2. Hindi/Hinglish Translator
// ==========================================
const translationMap = {
  "paneer": "cheese",
  "murgh": "chicken",
  "aloo": "potato",
  "chawal": "rice",
  "gobi": "cauliflower",
  "sabzi": "vegetable",
  "gosht": "meat",
  "machli": "fish",
  "anda": "egg",
  "matar": "peas",
  "palak": "spinach",
  "पनीर": "cheese",
  "आलू": "potato",
  "मुर्गा": "chicken"
};

function translateQuery(query) {
  let words = query.toLowerCase().split(" ");
  let translatedWords = words.map(word => {
    return translationMap[word] ? translationMap[word] : word;
  });
  return translatedWords.join(" ");
}

// ==========================================
// 3. API Fetching Logic
// ==========================================
async function fetchRecipes(query) {
  recipeGrid.innerHTML = ''; 
  resultsHeading.textContent = `Searching for "${query}"...`;
  
  try {
    const englishQuery = translateQuery(query);
    const response = await fetch(API_URL + englishQuery);
    const data = await response.json();

    if (data.meals === null) {
      resultsHeading.textContent = `Sorry, no recipes found for "${query}". Try another ingredient!`;
    } else {
      resultsHeading.textContent = `Search Results for "${query}":`;
      displayRecipes(data.meals);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsHeading.textContent = "Oops! Something went wrong while fetching.";
  }
}

// ==========================================
// 4. UI Rendering Logic
// ==========================================
function displayRecipes(meals) {
  recipeGrid.innerHTML = ''; 

  meals.forEach(meal => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    // Use a placeholder if YouTube link isn't available
    const recipeLink = meal.strSource ? meal.strSource : (meal.strYoutube || '#');

    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img">
      <div class="recipe-content">
        <h3 class="recipe-title">${meal.strMeal}</h3>
        <span class="recipe-category">${meal.strArea} • ${meal.strCategory}</span>
        
        <a href="${recipeLink}" target="_blank" class="btn-recipe">
          View Recipe
        </a>
      </div>
    `;
    recipeGrid.appendChild(card);
  });
}

// ==========================================
// 5. Event Listeners
// ==========================================
searchForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});

// Load the custom famous Indian recipes on startup!
window.addEventListener('DOMContentLoaded', () => {
  displayRecipes(famousIndianRecipes);
});