let base_url ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let selector = document.querySelectorAll(".selector select");
let fromCurr = document.querySelector(".from select");
let toCurrselect = document.querySelector(".to select");
let fromCurrselect = document.querySelector(".from select");
let amt = document.querySelector("input");
let msg = document.querySelector(".msg");
let btn = document.querySelector("button");
let exc = document.querySelector("i");




exc.addEventListener("click", ()=>{
    let temp = fromCurrselect.value;
    fromCurrselect.value = toCurrselect.value;
    toCurrselect.value = temp;
    updateFlag(fromCurrselect); 
    updateFlag(toCurrselect); 
    msg_change();

})

const updateFlag = (element) =>{
    let currCode= element.value;
    let countryCode = countryList[currCode];
    let img = element.closest("div").parentElement.querySelector("img.flag");
    let newsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    img.src=newsrc
};

let msg_change = async () =>{
    let amt_value = amt.value
    let response = await fetch(`${base_url}/${fromCurrselect.value.toLowerCase()}.json`);
    let data = await response.json();
    let from_data = data[fromCurrselect.value.toLowerCase()];
    calc = amt_value * from_data[toCurrselect.value.toLowerCase()];
    msg.innerText = `${amt_value} ${fromCurrselect.value} = ${calc} ${toCurrselect.value}`; 
}


for(let select of selector){
    for(currCode in countryList){
        let new_option = document.createElement("option");
        new_option.innerText = currCode;
        new_option.value = currCode;
        select.append(new_option);

        if (select.id === "from" && currCode === "USD") {
            new_option.selected = "true";
            updateFlag(new_option);
            msg_change();

        }
        else if (select.id === "to" && currCode === "INR") {
            new_option.selected = "true";
            updateFlag(new_option);
            msg_change();

        }

    }
    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
    select.addEventListener("change", () => {
        msg_change();
    })
}




let exchange = async () =>{
    let amt_value = amt.value
    if (amt_value == "" || amt_value < 1){
        amt_value = 1;
        amt.value = "1"; 
    }
    let response = await fetch(`${base_url}/${fromCurrselect.value.toLowerCase()}.json`);
    let data = await response.json();
    let from_data = data[fromCurrselect.value.toLowerCase()];
    calc = amt_value * from_data[toCurrselect.value.toLowerCase()];
    msg.innerText = `${amt_value} ${fromCurrselect.value} = ${calc} ${toCurrselect.value}`;  
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchange();
});




