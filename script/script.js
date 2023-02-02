let optionModelSelected = false;
let optionCollarSelected = false;
let optionFabricSelected = false;
let inputLinkWritted = false;
let openFinishButton = false;

let stringModelChosen, stringCollarChosen, stringFabricChosen;
let author, owner, link;
author = "tset";
owner = "test";




function selectingOptionModel(elementSelected){
    let elementModel = elementSelected.querySelector('[class*="Img"]');
    let elementModelOptions = elementSelected.parentNode;
    let unselectOption = elementModelOptions.querySelector(".selected");
    if(unselectOption !== null){
        unselectOption.classList.remove("selected");
    }    
    elementModel.classList.toggle("selected");  
    optionModelSelected = true;
    stringModelChosen = elementSelected.querySelector('[class*="Text"]').innerHTML;
    switch (stringModelChosen) {
        case "T-shirt":
            stringModelChosen = "t-shirt";
            break;    
        case "Camiseta":
            stringModelChosen = "top-tank";
            break;            
        case "Manga Longa":
            stringModelChosen = "long";
            break;
    }
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
    stringCollarChosen = elementSelected.querySelector('[class*="Text"]').innerHTML;
    switch (stringCollarChosen) {
        case "Gola V":
            stringCollarChosen = "v-neck";        
            break;    
        case "Gola Redonda":
            stringCollarChosen = "round"; 
            break;            
        case "Gola Polo":
            stringCollarChosen = "polo";
            break;
    }
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
    stringFabricChosen = elementSelected.querySelector('[class*="Text"]').innerHTML;
    switch (stringFabricChosen) {
        case "Seda":
            stringFabricChosen = "silk";        
            break;    
        case "Algodão":
            stringFabricChosen = "cotton"; 
            break;            
        case "Poliéster":
            stringFabricChosen = "polyester";
            break;
    }
}

function linkValidation(){
    let valueInputReferenceLink = document.getElementById("referenceInputLink").value;
    let endLinkReversed = "";
    for(let i = (valueInputReferenceLink.length - 1); i>(valueInputReferenceLink.length - 6); i--){
        endLinkReversed += valueInputReferenceLink[i];
    }    
    let endLink =  endLinkReversed.split('').reverse().join('');
    inputLinkWritted = endLink.includes(".jpeg") || endLink.includes(".png") || endLink.includes(".jpg");
    link = document.getElementById("referenceInputLink").value;      
}

function finishButtonValidation(){
    openFinishButton = optionModelSelected && optionCollarSelected && optionFabricSelected && inputLinkWritted;
}

function sendInfosToApi(){
    const sendableObjectWithChoices = {
        model: stringModelChosen,
        neck: stringCollarChosen,
        material: stringFabricChosen,
        image: link,
        owner: owner,
        author: author
    }

    const postPromisse = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", sendableObjectWithChoices);

    postPromisse.then(request => console.log("deu bom"));
    postPromisse.catch(request => console.log("deu ruim"));
}
function receiveLastDataOrders(){
    const getPromisse = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');    

    getPromisse.then(function (response) {
        console.log(response.data);
        return response.data;
    });
    // getPromisse.then(request => receiveObjectWithChoices = request);
    // getPromisse.catch(request => receiveObjectWithChoices = request);

}

receiveLastDataOrders();



function finishOrder(){
    linkValidation();
    finishButtonValidation();
    // console.log(openFinishButton);
    if(openFinishButton){
        alert("Seu pedido foi enviado!");
        sendInfosToApi();
    }
    else {
        alert("Por favor, escolha o modelo, a gola, o tecido e insira um link valido");
    }    
    document.getElementById("referenceInputLink").value = "";
}

