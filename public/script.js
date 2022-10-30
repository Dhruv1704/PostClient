let addBtn = document.getElementById("add-btn")
let params = 0
document.querySelector("form").reset()
document.getElementById("response").value = ""

addBtn.addEventListener('click', addParams)
let paramsDiv = document.getElementById('parameter-div')
paramsDiv.innerHTML = ''

function addParams() {
    params++;
    paramsDiv.innerHTML += `<div class="params-divs" id="params-divs ${params}">
                <label for="parameter-1" class="parameter-font">Parameter ${params + 1}</label> 
                <input class="parameter-1" type="text" placeholder="Enter Parameter ${params + 1} Key" id="parameter-${params + 1}">
                <input class="parameter" type="text" placeholder="Enter Parameter ${params + 1} Value" id="paramValue-${params+1}">
                <button type="button" class="sub-btn" id="sub-btn ${params}" onclick="subParams()">-</button>
        </div>`
}


function subParams(){
    let paramDiv = document.getElementById(`params-divs ${params}`)
    paramDiv.remove()
    params--;
}

let customParams = document.getElementById("Custom-type")
let jsonParams = document.getElementById("JSON-type")

customParams.addEventListener("click",()=>{
    document.getElementById("json-field").style.display = 'none'
    document.getElementById("parameter-field").style.display = 'block'
})

jsonParams.addEventListener('click',()=>{
    document.getElementById("json-field").style.display = 'block'
    document.getElementById("parameter-field").style.display = 'none'
    document.getElementById("parameter-div").innerHTML = ''
    params = 0
})

let submitBtn = document.getElementById("submit-btn")

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let responseText =  document.getElementById("response")
    let url = document.getElementById("url").value
    let body
    if(jsonParams.checked){
        body = document.getElementById("json-textarea").value
    }else{
        body = paramKey()
    }
    // document.getElementById("form").reset()
    responseText.value = "Please wait.. Fetching response.. "
    if ( url===""){
        return
    }

    if(document.getElementById("request-get").checked){
        fetch(url,{
            method: "GET"
        }).then((response)=> response.text())
            .then((data)=>responseText.value= data)
    }else{
        fetch(url,{
            method : 'POST',
            body: body,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response)=>response.text())
            .then((data)=>responseText.value=data)
    }
})


function  paramKey(){
    let data = {}
    let Key, Value;
    for (let i = 0; i <= params; i++) {
        Key = document.getElementById(`parameter-${i+1}`).value
        Value = document.getElementById(`paramValue-${i+1}`).value
        data[Key] = Value
    }
    return JSON.stringify(data)
}