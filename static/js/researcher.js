let fileele = document.getElementById('file');
let img_data = 'img/noAvtar.png'
fileele.addEventListener('change',()=>{
    console.log("file changed");
    let userImage = fileele.files[0];
    var filereader = new FileReader();
    filereader.readAsDataURL(userImage);
    filereader.onload = function (event) {
        img_data = event.target.result;
        document.getElementById('userimg').src = img_data;
    }
})
// get data

let submitbtn=document.getElementById("sbmt");
let myform = document.getElementById('myform');

submitbtn.addEventListener('click',async(e)=>{
    e.preventDefault();
    let body = {
       "username":myform.children[0].children[0].children[0].value,
       "email":myform.children[0].children[0].children[1].value,
       "phones":myform.children[0].children[1].children[0].value,
       "enroll":myform.children[0].children[1].children[1].value,
    //    "personalEmail":myform.children[0].children[2].children[0].value,
       "mentor":myform.children[0].children[2].children[1].value,
       "about":myform.children[0].children[3].children[0].value,
       "profile": img_data,
    }
    console.log(body);
    data = await myAjaxPOST('/addResearcher',body,myform.children[0].children[4].value);
    document.getElementById('all-reserchers').innerHTML =  genResearcher(data)+ document.getElementById('all-reserchers').innerHTML;
})
function myAjaxPOST(url,body,token){
    return new Promise((Resolve,Reject)=>{
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': token,
            }
        });
        var request = {
            "url": url,
            "method": "POST",
            "data": body
        }
        $.ajax(request).done(function (response) {
          Resolve(response);
      })
    })
}

function myAjaxGET(url){
    return new Promise((Resolve,Reject)=>{
        var request = {
            "url":url,
            "method":"GET"
        }
        $.ajax(request).done((response)=>{
            Resolve(response);
        })
    })
}

window.onload = async()=>{
    // console.log("me")
    let allidsResearchers = await myAjaxGET('/allidsResearcher');
    let user = await myAjaxGET('/getUser');
    console.log(user);
    let x = allidsResearchers.length;
   for(let i=0;i<x;i++){
    let url = '/researcher/'+allidsResearchers[i]._id;
        let ResearcherDataa = await myAjaxGET(url);
        document.getElementById('all-reserchers').innerHTML +=  genResearcher(ResearcherDataa,user);
        // document.getElementsByClassName('percent')[0].innerHTML = `${Math.floor(((i+1)/x)*100)}%`
        await countNumber((Math.floor(((i+1)/x)*100)));
   }
   setTimeout(() => {
    document.getElementsByClassName('loading')[0].style.display = 'none';
   }, 2000);
   
}

function countNumber(num){
    return new Promise((Resolve,Reject)=>{
        let ele = document.getElementsByClassName('percent')[0];
        let diff =  num - parseInt(((ele.innerHTML).split('%'))[0]);
        let time = diff*50;
        let si = setInterval(() => {
            let val = parseInt(((ele.innerHTML).split('%'))[0])+1;
            ele.innerHTML = `${val}%`;
            document.getElementsByClassName('loadbar')[0].style.width = `${val}%`
        }, 50);
        setTimeout(() => {
            clearInterval(si);
            Resolve();
        }, time);
     })
}


async function c(id){
    console.log(id);
    let url = `/deleteResearcher/${id}`
    let data = await myAjaxGET(url);
    if(data=="deleted"){
        document.getElementById(id).remove();
    }

}

async function researcher_details(id){
let data = await myAjaxGET(`/getResearcher_details/${id}`);
console.log(data);
}