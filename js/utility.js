
let cl = console.log;


const navCollapseBtn = document.getElementById("navCollapseBtn");
const navOpenBtn = document.getElementById("navOpenBtn");
const newsletterForm = document.getElementById("newsletterForm");
const footerForm = document.getElementById("footerForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const footerEmail = document.getElementById("footerEmail");
const loader = document.getElementById("loader");

const baseUrl = 'https://braise-attempt-01-default-rtdb.asia-southeast1.firebasedatabase.app';
const recipeUrl = `${baseUrl}/newRecipe.json`;
const trendingRecipeUrl = `${baseUrl}/trending.json`;
const brandImgUrl = `${baseUrl}/brandImg.json`;
const newsLetterUrl = `${baseUrl}/emails.json`;

const makeApiCall = async (apiUrl, methodName, msgBody) => {
    loader.classList.remove("d-none");
    try {
        msgBody = msgBody ? JSON.stringify(msgBody) : null;
        let res = await fetch(apiUrl, {
            method: methodName,
            body: msgBody
        })
        return res.json()
    }
    catch (err) {
        cl(err)
    }
    finally{
    loader.classList.add("d-none");

    }
}

const snackBarMsg = (msg, icon, timer) => {
    swal.fire({
        title: msg,
        icon: icon,
        timer: timer
    })
}

const objToArr = (obj)=>{
    let recipeArr = [];
    for(let key in obj){
        recipeArr.push({...obj[key], id:key})
    }
    return recipeArr
}

const brandCarouselSlider = () => {
    $('#brandSlider').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        dots: false,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })
}

const fetchBrandsImg = async () => {
    try {
        let res = await makeApiCall(brandImgUrl, "GET", null);
        // cl(res);
        let data = objToArr(res);
        // cl(data);
        brandsSliderTemplating(data);
        brandCarouselSlider();
    }
    catch (err) {
        cl(err)
    }
}
fetchBrandsImg();


const brandsSliderTemplating = (arr) => {
    brandSlider.innerHTML = arr.map(ele => {
        return `<div class="item">
                    <div class="brandImg">
                        <a href="javascript:;">
                            <img src="${ele.imageUrl}" alt="${ele.title}" title="${ele.title}">
                        </a>
                    </div>
                </div>  `
    }).join('')
}


const loadQparam = (ele) => {
    // let id = ele.getAttribute("data-id");
    let id = ele.dataset['id'];
    // we can use dataset to get custom attribute by 'data-'
    cl(id);
    let currentUrl = new URL(window.location.href);
    // to get current url of the browser window
    cl(currentUrl);

    let queryParams = new URLSearchParams(currentUrl.search);
    queryParams.set("recipeId",id);
    currentUrl.search = queryParams.toString();
    cl(currentUrl.search);

    let recipeRedirectUrl = `${currentUrl.origin}/singleRecipeInfo.html${currentUrl.search}`;
    window.location.href = recipeRedirectUrl;
}


const toggleCollapse = () => {
    navCollapseBtn.classList.toggle("d-none");
    navOpenBtn.classList.toggle("d-none");
}


const onFooterFormSubmit =async (eve)=>{
    try{
        eve.preventDefault();
    let newEmail = {
        email : footerEmail.value
    }
    let res = await makeApiCall(newsLetterUrl,"POST",newEmail);
    cl(res);
    snackBarMsg("Thank You for Subscribing Braise!!!","success",2000)
    }
    catch(err){
        cl(err);
    }
    finally{
        footerForm.reset();
    }
}


navCollapseBtn.addEventListener("click", toggleCollapse);
navOpenBtn.addEventListener("click", toggleCollapse);
footerForm.addEventListener("submit",onFooterFormSubmit);