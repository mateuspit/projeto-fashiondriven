let optionModelSelected = false;
let optionCollarSelected = false;
let optionFabricSelected = false;
let openFinishButton = false;


function selectingOptionModel(elementSelected){
    let elementModel = elementSelected.querySelector('[class*="Img"]');
    let elementModelOptions = elementSelected.parentNode;
    let unselectOption = elementModelOptions.querySelector(".selected");
    if(unselectOption !== null){
        unselectOption.classList.remove("selected");
    }    
    elementModel.classList.toggle("selected");  
    optionModelSelected = true;  
}

function selectingOptionCollar(elementSelected){
    let elementCollarOptions = elementSelected.parentNode;
    let unselectOption = elementCollarOptions.querySelector(".selected");
    if(unselectOption !== null){
        unselectOption.classList.remove("selected");
    }
    let elementCollar = elementSelected.querySelector('[class*="Img"]');
    elementCollar.classList.add("selected"); 
    optionCollarSelected = true;
}

function selectingOptionFabric(elementSelected){
    let elementFabricOptions = elementSelected.parentNode;
    let unselectOption = elementFabricOptions.querySelector(".selected");
    if(unselectOption !== null){
        unselectOption.classList.remove("selected");
    }
    let elementFabric = elementSelected.querySelector('[class*="Img"]');
    elementFabric.classList.add("selected"); 
    optionFabricSelected = true;
}