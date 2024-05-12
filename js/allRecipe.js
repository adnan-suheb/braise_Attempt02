
const allRecipeContainer = document.getElementById("allRecipeContainer");

const fetchAllRecipes = async () => {
    try {
        let res = await makeApiCall(recipeUrl, "GET", null);
        cl(res);
        let data = objToArr(res);
        cl(data)
        allRecipeTemplating(data.reverse());        
    }
    catch (err) {
        cl(err)
    }
}
fetchAllRecipes();

const allRecipeTemplating = (arr) => {
    allRecipeContainer.innerHTML = arr.map(ele => {
        return `<div class="col-md-4 col-sm-6 mb-4">
                    <figure class="recipeCards">
                        <div class="recipeImg">
                            <img src="${ele.imageUrl}" alt="${ele.title}" title="${ele.title}">
                            <div class="imgBackDrop" id="imgBackDrop"></div>                         
                            <button data-id="${ele.id}" onclick="loadQparam(this)" type="button">View Recipe</button>
                        </div>
                        <figcaption>
                            <div class="recipeDetails">
                                <p>Must try recipes</p>
                                <h1>${ele.title}</h1>
                            </div>
                            <hr>
                            <div class="timeAndLevel">
                                <p><i class="fa-regular fa-clock"></i> ${ele.time}</p>
                                <p><i class="fa-regular fa-thumbs-up"></i> ${ele.level}</p>
                            </div>
                        </figcaption>
                    </figure>
                </div>`
    }).join('');
}

const onNewsLetterSubmit =async (eve)=>{
    try{
        eve.preventDefault();
    let newEmail = {
        email : newsletterEmail.value
    }
    let res = await makeApiCall(newsLetterUrl,"POST",newEmail);
    cl(res);
    snackBarMsg("Thank You for Subscribing Braise!!!","success",2000)
    }
    catch(err){
        cl(err);
    }
    finally{
        newsletterForm.reset();
    }
}
newsletterForm.addEventListener("submit",onNewsLetterSubmit);