function onLoad(){
    phone = document.getElementById("phone");
    mobile = document.getElementById("mobile");
    address = document.getElementById("address");
    email = document.getElementById("email");
    fullname = document.getElementById("fullname");
    specialization = document.getElementById("specialization");
    country = document.getElementById("country");
    //retreiving data from the database
    let number = localStorage.getItem("NUMBER");
    firebase.database().ref(`users/${number}`).on("value", snapshot => {
      const user = snapshot.val();
      console.log(user);
      phone.innerHTML = "<br>"+ "(60)" + user.number;
      address.innerHTML = "<br>"+ user.reside;
      email.innerHTML = "<br>"+ user.email;
      specialization.innerHTML = user.specialization;
      fullname.innerHTML = user.f_name+ " "+  user.l_name;
      country.innerHTML = "<br>"+ user.nationality;
    })

    resumeURL = document.getElementById("resume");
    firebase.database().ref(`resumes/${number}`).on("value", snapshot => {
      const resume = snapshot.val();
      url ="Here"
      console.log(resume)
      resumeURL.innerHTML = url.link(resume.resumeURL);

    })

    website = document.getElementById("website");
    github = document.getElementById("github");
    gmail = document.getElementById("gmail");

    skill = document.getElementById("skill");
    proficiency = document.getElementById("proficiency");
    skillList = []
    skills = document.getElementById("skills");

    //listing jobs that are applied

  firebase.database().ref(`jobs/${number}`).on("value", snapshot => {
    let jobList = document.getElementById("jobs");
      for (let company in snapshot.val()){
        firebase.database().ref(`jobs/${number}/${company}`).on("value", companyName => {
          console.log("it goes here");
          firebase.database().ref(`companies/${companyName.val().company_name}`).on("value", companyInfo => {
            console.log(companyInfo.val());
            jobList.innerHTML += `<div style="width=100%;">
            <div class="row">
                <a href="#">
                    <div class="col-xs-6  col-md-3 col-lg-2" >
                        <img class="img-responsive" id="${companyName.val().company_name}" src=${companyInfo.val().image} alt="">
                    </div>

                    <div class="col-xs-6 col-md-9 col-lg-10 " style="color: black; font-size=12;">
                        <p style="color: black; font-size=12;">${companyName.val().company_name}</p>
                    </div>
                </a>

            </div>
            </div>
            <hr>`;});
        });
      };
    });



}
//Function to update the social media links
function updateLinks(){
    let disWebsite = document.getElementById("disWebsite");
    let disGithub = document.getElementById("disGithub");
    let disTwitter = document.getElementById("disTwitter");
    let disInstagram = document.getElementById("disInstagram");
    let disGmail = document.getElementById("disGmail");

    disWebsite.innerText = website.value;
    disGithub.innerText = github.value;
    disGmail.innerText = gmail.value;
}
//Function to update the skills
function updateSkills(){
    let item = {skill:skill.value,proficiency:proficiency.value};
    skillList.push(item);
    let output = "";
    output += `<h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">assignment</i>Skills</h6>`;
    for(let i = 0; i < skillList.length; i++){
        output += `<small>${skillList[i].skill}</small><div class="progress mb-3" style="height: 5px"><div class="progress-bar bg-primary" role="progressbar" style="width: ${skillList[i].proficiency}%" aria-valuenow="${skillList[i].proficiency}" aria-valuemin="0" aria-valuemax="100"></div></div>`;
    }
    skills.innerHTML = output;
}
//Function to update the personal info
function updateInfo(){
    let phoneText = document.getElementById("textPhone");
    let mobileText = document.getElementById("textMobile");
    let addressText = document.getElementById("textAddress");

    phone.innerHTML = "<br>" + phoneText.value;
    mobile.innerHTML = "<br>" + mobileText.value;
    address.innerHTML = "<br>"+ addressText.value;
}

onLoad()
