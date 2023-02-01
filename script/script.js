let optionModelSelected = false;
let optionCollarSelected = false;
let optionFabricSelected = false;
let inputLinkWritted = false;
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

function linkValidation(){
    let valueInputReferenceLink = document.getElementById("referenceInputLink").value;
    let endLinkReversed = "";
    for(let i = (valueInputReferenceLink.length - 1); i>(valueInputReferenceLink.length - 6); i--){
        endLinkReversed += valueInputReferenceLink[i];
    }    
    let endLink =  endLinkReversed.split('').reverse().join('');
    inputLinkWritted = endLink.includes(".jpeg") || endLink.includes(".png") || endLink.includes(".jpg");
}

function finishButtonValidation(){
    openFinishButton = optionModelSelected && optionCollarSelected && optionFabricSelected && inputLinkWritted;
}


function finishOrder(){
    linkValidation();
    finishButtonValidation();
    // console.log(openFinishButton);
    if(openFinishButton){
        alert("Seu pedido foi enviado!");
    }
    else {
        alert("Por favor, escolha o modelo, a gola, o tecido e insira um link valido");
    }

}