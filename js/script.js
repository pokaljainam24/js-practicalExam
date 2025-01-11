const recipeForm = document.getElementById('recipe-form');
const recipesList = document.getElementById('recipes-list');
const addRecipeBtn = document.getElementById('add-recipe-btn');
const cancelButton = document.getElementById('cancel-button');

let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let editingRecipeIndex = null;

// Show all recipes
function showData() {
    recipesList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${recipe.title}</td>
                    <td>${recipe.ingredients}</td>
                    <td>${recipe.cooking_time} minutes</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editRecipe(${index})"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${index})"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                `;
        recipesList.appendChild(row);
    });
}

// Add or Update Recipe
function saveRecipe(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const cooking_time = document.getElementById('cooking_time').value;

    if (editingRecipeIndex !== null) {
        // Update the recipe
        recipes[editingRecipeIndex] = {
            title,
            ingredients,
            cooking_time
        };
        editingRecipeIndex = null;
        cancelButton.style.display = "none";
    } else {
        // Add new recipe
        recipes.push({
            title,
            ingredients,
            cooking_time
        });
    }

    // Save to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    recipeForm.reset();
    showData();
    toggleForm(false);
}

// Edit Recipe
function editRecipe(index) {
    editingRecipeIndex = index;
    const recipe = recipes[index];
    document.getElementById('title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('cooking_time').value = recipe.cooking_time;

    toggleForm(true);
    cancelButton.style.display = 'inline-block';
}

// Delete Recipe
function deleteRecipe(index) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        showData();
    }
}

// Toggle form visibility
function toggleForm(show) {
    recipeForm.style.display = show ? 'block' : 'none';
    addRecipeBtn.style.display = show ? 'none' : 'inline-block';
}

// Cancel Editing or Adding
cancelButton.addEventListener('click', () => {
    editingRecipeIndex = null;
    cancelButton.style.display = 'none';
    recipeForm.reset();
    toggleForm(false);
});

// Add Recipe Button Click
addRecipeBtn.addEventListener('click', () => {
    toggleForm(true);
});

recipeForm.addEventListener('submit', saveRecipe);
toggleForm(false);
showData();