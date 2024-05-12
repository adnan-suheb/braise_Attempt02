


const ingredientControl = document.getElementById("ingredient");
const chipsContainer = document.getElementById("chipsContainer");
const titleControl = document.getElementById("title");
const timeControl = document.getElementById("time");
const levelControl = document.getElementById("level");
const descriptionControl = document.getElementById("description");
const bannerImg = document.getElementById("bannerImg");
const recipeForm = document.getElementById("recipeForm");

generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

// chip functionality
let ingredientArr = [];
const addChip = (ele) => {
    // cl(ele);
    chipsContainer.classList.remove("d-none");
    let chipText = ingredientControl.value.trim();
    if (chipText != '') {
        let chip = document.createElement("div");
        chip.className = 'chip';
        chip.id = generateUuid();
        chip.innerHTML = `<p>${chipText} <span onclick="removeChip(this)">
                        <i class="fa-solid fa-xmark"></i></span></p>`;
        // cl(chip);
        chipsContainer.prepend(chip);
        ingredientArr.push(chip);
        // cl(ingredientArr)
        ingredientControl.value = '';
    }
    else {
        snackBarMsg("Please Enter Chip Value!!", "error", 1500)
    }
}



const removeChip = (ele) => {
    let deleteId = ele.closest(".chip").id;
    // cl(deleteId);
    let deleteIndex = ingredientArr.findIndex(ele => ele.id === deleteId);
    // cl(deleteIndex);
    ingredientArr.splice(deleteIndex, 1);
    ele.closest(".chip").remove();
    cl(ingredientArr)
}


//  bannerImg functionality

const fileUploader = async (fileControl) => {
    return new Promise((resolve, reject) => {
        let selectedFile = fileControl.files[0];
        // cl(selectedFile);
        if (selectedFile) {
            let reader = new FileReader();
            reader.onload = function (e) {

                resolve(e.target.result)
            }
            reader.readAsDataURL(selectedFile)
        } else {
            reject("no file selected!!!")
        }

    })
}


const addBannerFile = async (eve) => {
    // cl(eve.target);
    let res = await fileUploader(eve.target);
    // cl(res)
}



const onRecipeFormSubmit = async (eve) => {

    try {
        eve.preventDefault();

        let bannerImgInfo = await fileUploader(bannerImg);
        let newRecipeObj = {
            title: titleControl.value,
            time: timeControl.value,
            level: levelControl.value,
            description: descriptionControl.value,
            imageUrl: bannerImgInfo,
            ingredients: ingredientArr.map(ele => ele.innerText)
        }
        cl(newRecipeObj);
        if (ingredientArr.length > 0) {
            let res = await makeApiCall(recipeUrl, "POST", newRecipeObj);
            cl(res);
            snackBarMsg("Recipe added successfully!!! Check your Recipe in the Recipe Tab.", "success", 3000)
        }
        else {
            snackBarMsg("Please enter ingredients!!", "error", 2000)
        }

    }
    catch (err) {
        cl(err)
        snackBarMsg("Something went wrong while adding recipe!!", "error", 2000)
    }
    finally {
        chipsContainer.innerHTML = "";
        ingredientArr = [];
        recipeForm.reset();
    }


}

const onClear = (eve) => {
    chipsContainer.innerHTML = "";
    ingredientArr = [];
    recipeForm.reset();
    snackBarMsg("Form Cleared!!", "success", 1500)
}










recipeForm.addEventListener("submit", onRecipeFormSubmit);
bannerImg.addEventListener("change", addBannerFile);



