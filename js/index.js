

const heroBannerSlider = document.getElementById("heroBannerSlider");
const trendingRecipeContainer = document.getElementById("trendingRecipeContainer");
const brandSlider = document.getElementById("brandSlider");

const initSlider = () => {
    $('#heroBannerSlider').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    })
}
// mainBannerSlider();



const fetchTrendingRecipes = async () => {
    try {
        let res = await makeApiCall(trendingRecipeUrl, "GET", null);
        // cl(res);
        let data = objToArr(res);
        // cl(data)
        heroBannerTemplating(data.reverse());
        initSlider();
        trendingRecipeTemplating(data.reverse());

    }
    catch (err) {
        cl(err)
    }
}
fetchTrendingRecipes();





const heroBannerTemplating = (arr) => {
    heroBannerSlider.innerHTML = arr.map(ele => {
        return `<div class="item">
                    <figure class="heroBannerCard">
                        <div class="heroBannerImg">
                            <img src="${ele.imageUrl}" alt="${ele.title}" title="${ele.title}">
                            <div class="imageDrop"></div>
                            <button data-id="${ele.id}" onclick="loadQparam(this)" type="button">View Recipe</button> 
                        </div>
                        <figcaption>
                            <div class="recipeDetails">
                                <p>most popular dishes</p>
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

const trendingRecipeTemplating = (arr) => {
    trendingRecipeContainer.innerHTML = arr.map(ele => {
        return `<div class="col-md-3 col-sm-6">
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
