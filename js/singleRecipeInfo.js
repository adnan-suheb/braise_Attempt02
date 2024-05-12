

const singleRecipe = document.getElementById("singleRecipe");
const listContainer = document.getElementById("listContainer");
const titleContainer = document.getElementById("titleContainer");
const imageContainer = document.getElementById("imageContainer");
const timeLevelContainer = document.getElementById("timeLevelContainer");
const descriptionContainer = document.getElementById("descriptionContainer");


const getRecipeInfo = async () => {
    let currentUrl = new URL(window.location.href);
    // cl(currentUrl)
    let queryParams = new URLSearchParams(currentUrl.search);
    // cl(queryParams);
    let recipeId = queryParams.get("recipeId");
    // cl(recipeId);

    let singleTrendingRecipeUrl = `${baseUrl}/trending/${recipeId}.json`;
    // cl(singleTrendingRecipeUrl);
    let singleRecipeUrl = `${baseUrl}/newRecipe/${recipeId}.json`;
    // cl(singleRecipeUrl);

    let recipeArr =[
        makeApiCall(singleTrendingRecipeUrl, "GET"),
        makeApiCall(singleRecipeUrl, "GET")
    ]
    let [trendingObj,singleObj] = await Promise.all(recipeArr);

    
    if(trendingObj!=null){
        titleTemplating(trendingObj);
        imgTemplating(trendingObj);
        timeLevelTemplating(trendingObj)
        listTemplating(trendingObj);
        descriptionTemplating(trendingObj)
    }
    else if(singleObj!=null){
        cl(singleObj)
        titleTemplating(singleObj);
        imgTemplating(singleObj);
        timeLevelTemplating(singleObj)
        listTemplating(singleObj);
        descriptionTemplating(singleObj)
    }
    else{
        cl("Something went wromg while fetching recipe data!!!");
    }
}
getRecipeInfo();


const titleTemplating = (obj)=>{
    titleContainer.innerHTML = `<h1>${obj.title}</h1>`
}
const imgTemplating = (obj)=>{
    imageContainer.innerHTML = ` <img src="${obj.imageUrl}" alt="${obj.title}" title="${obj.title}">`
}
const timeLevelTemplating = (obj)=>{
    timeLevelContainer.innerHTML = `<p><i class="fa-regular fa-clock"></i> ${obj.time}</p>
                                <p><i class="fa-regular fa-thumbs-up"></i> ${obj.level}</p>`
}

const descriptionTemplating = (obj)=>{
    descriptionContainer.innerHTML = `<h3>Description And Recipe</h3>
                                        <p>${obj.description}</p>`
}

const listTemplating = (arr)=>{
    let data = arr.ingredients
    // cl(data)
    let result = ``
    data.forEach((ele,index) => {
        result+= `<li>
                            <input type="checkbox" id="${index+1}">
                            <label for="${index+1}">${ele}</label>
                        </li>`;
        listContainer.innerHTML = result; 
    });


    
}
