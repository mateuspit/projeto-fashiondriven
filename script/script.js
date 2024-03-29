let optionModelSelected = false;
let optionCollarSelected = false;
let optionFabricSelected = false;
let inputLinkWritted = false;
let openFinishButton = false;
let sendedOrder = false;
let vallidButon = false;

let objectWithChoices;
let stringModelChosen, stringCollarChosen, stringFabricChosen;
let author, owner, link;
// author = "tset";
// owner = "test";

function justButtonsValidation(){
    vallidButon = (document.getElementById("referenceInputLink").value !== "") && optionModelSelected && optionCollarSelected && optionFabricSelected;
    return vallidButon;
}

function buttonHighLight(){
    let elementButtonFinishOrder = document.querySelector(".buttonFinishOrder");
    if(justButtonsValidation()){
        // console.log(elementButtonFinishOrder);
        elementButtonFinishOrder.classList.add("buttonFinishOrderReady");
        return;
    }
    elementButtonFinishOrder.classList.remove("buttonFinishOrderReady");

}




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
    // debugger;
    buttonHighLight();
    
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
    // debugger;
    buttonHighLight();
    
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
    buttonHighLight();
}

function linkValidation(){
    let valueInputReferenceLink = document.getElementById("referenceInputLink").value;
    // let endLinkReversed = "";
    // for(let i = (valueInputReferenceLink.length - 1); i>(valueInputReferenceLink.length - 6); i--){
    //     endLinkReversed += valueInputReferenceLink[i];
    // }    
    // let endLink =  endLinkReversed.split('').reverse().join('');
    valueInputReferenceLink = document.getElementById("referenceInputLink").value; 
    inputLinkWritted = valueInputReferenceLink.includes(".jpeg") || valueInputReferenceLink.includes(".png") || valueInputReferenceLink.includes(".jpg") || valueInputReferenceLink.includes(".bmp") || valueInputReferenceLink.includes("?") || valueInputReferenceLink.includes("file");
    link = document.getElementById("referenceInputLink").value;  
    document.getElementById("referenceInputLink").value = "";
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

    postPromisse.catch(request => alert("Por favor, escolha o modelo, a gola, o tecido e insira um link valido"));

    return postPromisse.then(function sendRequest(){
        sendedOrder = true;
    });

    
}

async function receiveLastDataOrders(){
    const getPromisse = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');    

    return getPromisse.then(function (response) {
        return response.data;
    });
}

// receiveLastDataOrders();





async function finishOrder(){
    // console.log("test1");
    linkValidation();
    // console.log("test2");
    finishButtonValidation();
    // console.log("test3");
    // console.log(openFinishButton);
    await sendInfosToApi();
    // console.log("test4");
    if(openFinishButton && sendedOrder){
        alert("Seu pedido foi enviado!");
        sendedOrder = false;
        objectWithChoices = await receiveLastDataOrders();
        renderMainPage();
    }
    else {
        // console.log("test");
        alert("Por favor, escolha o modelo, a gola, o tecido e insira um link valido");
    }
}

function renderMainPage(){
    let elementLastOrderSpot = document.querySelector(".lastOrderSpot");

    elementLastOrderSpot.innerHTML = "";

    for(let i = 0; i < 6; i++){
        elementLastOrderSpot.innerHTML += `
        <div class="lastOrderOption">
            <div class="lastOrderOptionImg">
                <img src="${objectWithChoices[i].image}" alt="Last order ${i+1}">
            </div>
            <div class="lastOrderOptionTitle">
                <span>Criador:</span> ${objectWithChoices[i].owner}                        
            </div>
        </div>
        `;      
    }

    let elementLoadingPage = document.querySelector(".loadingPage");
    let elementMainPage = document.querySelector(".mainPage");
    elementLoadingPage.classList.add("hide");
    elementMainPage.classList.remove("hide");

}

async function goToLoadingScreen(){
    
    const elementLoginPage = document.querySelector(".loginPage");
    const  elementLoadingPage = document.querySelector(".loadingPage");
    elementLoginPage.classList.add("hide");
    elementLoadingPage.classList.remove("hide");

    objectWithChoices = await receiveLastDataOrders();
    renderMainPage();
    document.getElementById("referenceInputLink").value = ""
}

document.querySelector('#loginInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      author = owner = document.getElementById("loginInput").value;
      goToLoadingScreen();
      document.getElementById("loginInput").value = "";
    }
    
});

function buttonLoginPress(){
    author = owner = document.getElementById("loginInput").value;
    goToLoadingScreen();
    document.getElementById("loginInput").value = "";
}

document.querySelector('#referenceInputLink').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        finishOrder();
    }
    buttonHighLight();
});



