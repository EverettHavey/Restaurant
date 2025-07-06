document.addEventListener('DOMContentLoaded', () => {
    const restaurantSelect = document.getElementById('restaurantSelect');
    const generateOrderBtn = document.getElementById('generateOrderBtn');
    const randomOrderDisplay = document.getElementById('randomOrderDisplay');
    const orderText = document.getElementById('orderText');

    // Define meal combinations for different restaurants, adhering to "Mormon standard" for drinks,
    // and ensuring no shellfish or nuts are included.
    const restaurants = {
        "McDonald's": [
            "Big Mac Meal (with Fries and Sprite)",
            "Quarter Pounder with Cheese Meal (with Fries and Coke)",
            "McChicken Meal (with Fries and Diet Coke)",
            "10 pc Chicken McNuggets Meal (with Fries and Fanta Orange)",
            "Filet-O-Fish Meal (with Fries and Water)",
            "Double Cheeseburger Meal (with Fries and Hi-C Orange Lavaburst)"
        ],
        "Chipotle": [
            "Chicken Burrito Bowl (with Brown Rice, Black Beans, Fajita Veggies, Mild Salsa, Guacamole, and a Lemonade)",
            "Steak Burrito (with White Rice, Pinto Beans, Corn Salsa, Sour Cream, Cheese, and a Coke)",
            "Carnitas Salad (with Romaine, Black Beans, Fresh Tomato Salsa, Cheese, Chipotle-Honey Vinaigrette, and Water)",
            "Chicken Tacos (3) (with White Rice, Black Beans, Fresh Tomato Salsa, Lettuce, and a Sprite)"
        ],
        "Crumbl Cookies": [
            // Crumbl's menu rotates, so suggesting general packs. Users should check current weekly flavors for specific allergens.
            "A 4-Pack of Assorted Cookies (Please check current weekly flavors for specific allergens, especially nuts)",
            "A 6-Pack of Assorted Cookies (Please check current weekly flavors for specific allergens, especially nuts)",
            "A 12-Pack (Party Box) of Assorted Cookies (Please check current weekly flavors for specific allergens, especially nuts)",
            "One Classic Pink Sugar Cookie and one Milk Chocolate Chip Cookie (Please check current weekly flavors for specific allergens, especially nuts)"
        ],
        "In-N-Out": [
            "Double-Double Meal (Fries and a Strawberry Shake)",
            "Cheeseburger Meal (Fries and a Vanilla Shake)",
            "Hamburger Meal (Fries and a Chocolate Shake)",
            "Double-Double (Protein Style) Meal (Fries and Water)"
        ],
        "Taco Bell": [
            "Crunchwrap Supreme Combo (with Nacho Fries and a Pepsi)",
            "Cheesy Gordita Crunch Combo (with Cinnamon Twists and a Mountain Dew)",
            "Beef Burrito Combo (with Chips & Cheese Sauce and a Sierra Mist)",
            "Chicken Quesadilla Combo (with Black Beans and a Diet Pepsi)"
        ],
        "Cafe Rio": [
            "Sweet Pork Barbacoa Salad (with Creamy Tomatillo Dressing and a Horchata)",
            "Grilled Steak Burrito (smothered, with Black Beans and a Raspberry Lemonade)",
            "Chicken Quesadilla (with Pinto Beans and Water)",
            "Shredded Beef Tacos (2) (with Rice and a Limeade)"
        ],
        "Cafe Zupas": [
            // Focusing on common, generally allergen-free options. Always confirm with staff.
            "Half Turkey Bacon Avocado Sandwich & Wisconsin Cauliflower Soup (with a Fountain Drink)",
            "Half Ultimate Grilled Cheese Sandwich & Chicken Noodle Soup (with Water)",
            "Tuscan Chicken Salad (no nuts, with a Fountain Drink)", // Assuming a version without nuts is available or can be customized
            "Chicken Enchilada Soup & Bread (with a Raspberry Lemonade)"
        ],
        "Starbucks": [
            // Avoiding coffee/tea, and nut milks. Always confirm with barista.
            "Strawberry Açaí Refresher (with Lemonade) and a Bacon, Gouda & Egg Breakfast Sandwich",
            "Mango Dragonfruit Refresher (with Water) and a Plain Bagel with Cream Cheese",
            "Vanilla Bean Frappuccino (made with dairy milk) and a Sausage, Cheddar & Egg Breakfast Sandwich",
            "Pink Drink (Strawberry Açaí Refresher with Coconut Milk) and a Spinach, Feta & Egg White Wrap"
        ]
    };

    // Populate the restaurant dropdown
    function populateRestaurantSelect() {
        // Clear existing options first
        restaurantSelect.innerHTML = '';

        // Add the default "Choose a Restaurant" option
        const defaultOption = document.createElement('option');
        defaultOption.value = ""; // Empty value
        defaultOption.textContent = "Choose a Restaurant";
        defaultOption.disabled = true; // Make it unselectable
        defaultOption.selected = true; // Make it the default selected option
        restaurantSelect.appendChild(defaultOption);

        for (const restaurantName in restaurants) {
            const option = document.createElement('option');
            option.value = restaurantName;
            option.textContent = restaurantName;
            restaurantSelect.appendChild(option);
        }
    }

    // Function to get a random item from an array
    function getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    // Event listener for the button click
    generateOrderBtn.addEventListener('click', () => {
        const selectedRestaurant = restaurantSelect.value;

        // Prevent generating an order if the default option is still selected
        if (selectedRestaurant === "") {
            orderText.textContent = "Please select a restaurant first!";
            randomOrderDisplay.classList.remove('hidden');
            orderText.classList.remove('animate-pulse');
            return; // Stop execution if no restaurant is selected
        }

        const mealSuggestions = restaurants[selectedRestaurant];

        if (mealSuggestions && mealSuggestions.length > 0) {
            const randomMeal = getRandomItem(mealSuggestions);
            orderText.textContent = randomMeal;
            randomOrderDisplay.classList.remove('hidden'); // Show the display area
            // Optional: Add a brief animation class for flair
            orderText.classList.remove('animate-pulse');
            void orderText.offsetWidth; // Trigger reflow
            orderText.classList.add('animate-pulse');
        } else {
            orderText.textContent = "No meal suggestions available for this restaurant.";
            randomOrderDisplay.classList.remove('hidden');
            orderText.classList.remove('animate-pulse');
        }
    });

    // Initial population of the dropdown when the page loads
    populateRestaurantSelect();
});
