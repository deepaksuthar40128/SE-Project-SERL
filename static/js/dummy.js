function genFaculty(data, user) {
  let add = data['Address'];
  add = add.split(',').join('</br>');
  data['Address'] = add;
  let faculty = `<div class="row" style="padding: 20px; margin: 20px" id="${data._id}" >
    <div class="col-sm-12;">
      <div class="w3-card-4" style="width: 100%; background-color: #ffffff">
        <header class="w3-container w3-grey">
          <div id="btn">
            ${user.role === 'hod' ? `<button id="delete" onclick = "deleteFaculty('${data._id}')" ><img
                src="content/delete.png"
                alt="delete"
                height="30px"
                width="30px"
              />
            </button>`:''}
              
          </div>

          <h3 style="margin: 0px; padding: 0px">
            <a href="http://www.sonaliagarwal.com/">${data.username}</a>
          </h3>
          <p>
            ${data.position} <br />
            IIIT Allahabad<br />
          </p>
        </header>

        <div class="w3-container">
          <br />
          <p>
            <img
              src="${data.profile}"
              alt="${data.username}"
              style="
                width: 300px;
                height: 220px;
                margin-bottom: 20px;
                margin-right: 10px;
              "
              align="left"
            />
            <b>Address:</b><br />
            ${data.Address}</p> </div>
<div style="padding: 0 0 10px 20px;">  
            E Mail: ${data.email} <br />
            ${data.personalEmail} <br /></div>
          
     
      </div>
    </div>
  </div>`
  return faculty;
}


// Researchers

function genResearcher(data, user) {
  let researcher = ` <div class="row" style="padding:20px;margin:20px;">
  <div class="col-sm-12;">
          <div class="w3-card-4" style="width:100%;background-color:#FFFFFF;">
                  <header class="w3-container onclick w3-grey"><br>
                  <div id="btn">
                  ${user.role&&user.role !== 'researcher' ? `<button id="delete2" onclick = "deleteResearcher('${data._id}')" ><img
                    src="content/delete.png"
                    alt="delete"
                    height="30px"
                    width="30px"
                  />
                </button>`:''}
          </div>
                      <h3 style="margin:0px;padding:0px;    cursor: pointer;" onclick="window.open('/profile?id=${data._id}')" >${data.username}</h3><p>${data.enroll}<br>
                          <b>Mentor:</b> ${data.mentor}<br> </p>
                  </header>

                  <div class="w3-container">  <br>
                  <p style="    text-align: justify;text-justify: inter-word;">
                  <img src="${data.profile}" alt="Sonali" style="width:180px;height:220px;margin-bottom:20px;margin-right:10px;" align="left"/>
                 ${data.about}  <br><br>
                      <h4>Contact Details</h4>
                      <b>Mobile Number :</b> ${data.phones}<br>
                      <b>Email ID :</b> ${data.email} <br>
                  </p>
              </div>
          </div>
      </div>
  </div>`
  return researcher;
}






