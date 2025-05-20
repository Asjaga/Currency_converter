let dropdown = document.querySelectorAll("select");
let baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
let fromCurr  = document.querySelector("#from");
let toCurr  = document.querySelector("#to");
let amt = document.querySelector("input");
let msg = document.querySelector(".msg");
let btn = document.querySelector(".btn");
let exicon = document.querySelector("i");

let update_flag = (element) =>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.closest("div").parentElement.querySelector(".flag");
    img.src = newsrc;
}

let excurr = () =>{
    temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    update_flag(fromCurr);
    update_flag(toCurr);
    exchange();
}

let exchange = async () =>{
    if (amt.value ==="" || amt.value < 1){
        amt.value = 1;
        amt.value = "1";
    }
    let response = await fetch(`${baseurl}/${fromCurr.value.toLowerCase()}.json`);
    let data = await response.json();
    let actualdata = data[fromCurr.value.toLowerCase()];
    let actualvalue = actualdata[toCurr.value.toLowerCase()];
    let amt_value = amt.value;
    let calc = amt_value * actualvalue;
    msg.innerText = `${amt_value} ${fromCurr.value} = ${calc} ${toCurr.value}`;

}

for(select of dropdown){
    for(currCode in countryList){
        let new_option = document.createElement("option");
        new_option.value = currCode;
        new_option.innerText = currCode;
        select.append(new_option); 

        if (currCode  === "USD" && select.id === "from"){
            new_option.selected = true;
            update_flag(select);
            exchange();
        }
        else if (currCode  === "INR" && select.id === "to"){
            new_option.selected = true;
            update_flag(select);
            exchange();
        }
    }

    select.addEventListener("change",(evt)=>{
        update_flag(evt.target);
        exchange();

    })

}





btn.addEventListener("click",()=>{
    exchange();
})

exicon.addEventListener("click", ()=>{
    excurr();
})
