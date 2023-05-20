const popupBtn = document.getElementById('popup-btn');
const popupOverlay = document.getElementById('popup-overlay');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-btn');

function me(){
    popupOverlay.style.display = 'block';
}

popupBtn.addEventListener('click', function () {
    popupOverlay.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
    popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});
let k=0;

function funNews(){
   if(k%2==1)
    document.getElementById('newsInput').style.display = 'none';
    else document.getElementById('newsInput').style.display = 'block';
    k++;
}



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
    console.log("me");
    let allData = await myAjaxGET('/allData');
    allData = allData[0];
    let News = allData.News;
    document.getElementById('News').innerHTML ='';
    News.forEach(news => {
       
        document.getElementById('News').innerHTML +=` <li>${news}</li><br>`
    });
}

async function addNews(){
    let ele = document.getElementById('news');
    let news = ele.value;
    if(news){
        let token = ele.previousElementSibling.value;
        ele.value='';
        let allData = await myAjaxPOST('/addNews',{news:news},token);
        allData = allData[0];
        let News = allData.News;
        document.getElementById('News').innerHTML ='';
        News.forEach(news => {
           
            document.getElementById('News').innerHTML +=` <li>${news}</li><br>`
        });
    }else{
        alert("News Field is Empty!!");
    }
}