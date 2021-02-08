// Variables Initialisation
const search_field_input = document.getElementById("search_field_input");
const search_field_button = document.getElementById("search_field_button");


const meal_showing_container = document.getElementById("meal_showing_container");
const meal_extrainfo_showing_container = document.getElementById("meal_extrainfo_showing_container");


//meal_showing_container.innerHTML = "";
meal_extrainfo_showing_container.innerHTML = "";



// Search Function
const esFunction = () => {
    if(search_field_input.value != ""){
       searchExecution(search_field_input.value);
    }
}



// Items Fetching Function
const searchExecution = (searchValue) => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchValue)
    .then(response => response.json())
    .then(data => {
        elementsExecution(data);
    })
    .catch((error) => {
      console.error('Error:', error);
        errorHandler();
    });
    
}










// Mapping Function
const formattedDataMap = (mealSingleData) => {
    return [mealSingleData.idMeal, mealSingleData.strMeal, mealSingleData.strMealThumb];
}




// Items Executing Function
const elementsExecution = (data) => {
    let mealData = data.meals;


    const requiredData = mealData.map(formattedDataMap);

    
    
    
    meal_showing_container.innerHTML = "";
    meal_extrainfo_showing_container.innerHTML = "";
    
    for ( eachData of requiredData) {

        
        let htmlToAdd = '<div onclick="showExtraInfromation('+ eachData[0] +')" class="col-md-3 meal_showing_div">' +
            '<div class="card card_shadow" style="width: 18rem;">' +
                '<img class="card-img-top" src="'+ eachData[2] +'/preview">' +
                '<div class="card-body">' +
                  '<p class="card-text text-center">'+ eachData[1] +'</p>' +
                '</div>' +
              '</div>' +
        '</div>';
        meal_showing_container.insertAdjacentHTML("beforeend", htmlToAdd)
    }
}






// Button Event Listener
search_field_button.addEventListener("click", esFunction);








// Ingradient Fetching Function
const showExtraInfromation = (mealId) =>{
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId)
    .then(response => response.json())
    .then(data => {
        elementExtraInfoExecution(data.meals);
    })
    .catch((error) => {
      console.error('Error:', error);
        errorHandler();
    });
}



// Ingradient Executing Function
const elementExtraInfoExecution = ( data ) => {
    
    const requiredData = data.map(formattedDataMap);
    
    
    let extraInfoHTML = '<div class="food_details_img">' +
        '<img src="'+ requiredData[0][2] +'/preview" alt="">' +
    '</div>' +
    '<h3>'+ requiredData[0][1] +'</h3>' +
    '<h5 class="food_details_subtitle">Full details</h5>'
    '<div class="details">';
    
    
    
    
    
    
    let ingredientKey = "strIngredient";
    let ingredientAmountKey = "strMeasure";
    for(let x = 1; x <= 20; x++){
        let ingredientData = data[0][ingredientKey + x];
        let ingredientAmountData = data[0][ingredientAmountKey + x];
        
        if(ingredientData=="" || ingredientData==null){
            break;
        }else{
            extraInfoHTML = extraInfoHTML + '<p>'+ ingredientAmountData + " " + ingredientData +'</p>';

        }
    }
    
    

    
    
    extraInfoHTML = extraInfoHTML + '</div>';
    
    
    
    meal_extrainfo_showing_container.innerHTML = extraInfoHTML;
    
}




    




















    
// Error Handling Function
const errorHandler = () => {
    
    meal_showing_container.innerHTML = "<h2>No Results Found</h2>";
    meal_extrainfo_showing_container.innerHTML = "";
}
















