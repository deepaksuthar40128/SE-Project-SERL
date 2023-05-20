let submitbtn=document.getElementById("sbmt");
let myform = document.getElementById('myform');


let fileele = document.getElementById('file');
let img_data = 'img/noAvtar.png'
fileele.addEventListener('change', () => {
    console.log("file changed");
    let userImage = fileele.files[0];
    var filereader = new FileReader();
    filereader.readAsDataURL(userImage);
    filereader.onload = function (event) {
        img_data = event.target.result;
        document.getElementById('userimg').src = img_data;
    }
})

submitbtn.addEventListener('click',async(e)=>{
     e.preventDefault();
     let body = {
        "username":myform.children[0].children[0].children[0].value,
        "email":myform.children[0].children[0].children[1].value,
        "phone":myform.children[0].children[1].children[0].value,
        "website":myform.children[0].children[1].children[1].value,
        "personalEmail":myform.children[0].children[2].children[0].value,
        "position":myform.children[0].children[2].children[1].value,
        "Address":myform.children[0].children[3].children[0].value,
         "profile": img_data,
     }
    //  let dummybody = body;
    data = await myAjaxPOST('/addFaculty',body,myform.children[0].children[4].value);
    document.getElementById('faculty-container').innerHTML =  genFaculty(data)+ document.getElementById('faculty-container').innerHTML;
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
    let allidsFaculty = await myAjaxGET('/allidsFaculty');
    let user = await myAjaxGET('/getUser');
    let x = allidsFaculty.length;
   for(let i=0;i<x;i++){
    let url = '/faculty/'+allidsFaculty[i]._id;
        let FacultyData = await myAjaxGET(url);
        document.getElementById('faculty-container').innerHTML +=  genFaculty(FacultyData,user);
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


async function deleteFaculty(id){
    console.log(id);
    let url = `/deleteFaculty/${id}`
    let data = await myAjaxGET(url);
    if(data=="deleted"){
        document.getElementById(id).remove();
    }

}