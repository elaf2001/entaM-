function onLoad(){
    company = JSON.parse(localStorage.getItem("Company_Key"));
    updateHMTL();
}

function updateHMTL(){
    image = document.getElementById("companyPic");
    description = document.getElementById("Description");
    skills = document.getElementById("Skills");
    preferences = document.getElementById("Preferences");
    extra = document.getElementById("Extra");
    specialization = document.getElementById("Specialization");
    image.innerHTML = `<img src="${company.image}" height="150"width="250" alt=""></img>`
    description.innerHTML = "<br>" +company.description;
    preferences.innerHTML = "<br>" +company.type;
    skills.innerHTML = "<br>" +company.skills;
    extra.innerHTML = "<br>" +company.extra;
    specialization.innerHTML = "<br>" +company.specialization;

}

function applyJob(){
    let number = localStorage.getItem("NUMBER");
    appliedJob = {
      company_name: JSON.parse(localStorage.getItem("Company_Key")).name
    };
    firebase.database().ref("jobs/" + number).push(appliedJob);
    $('.toast').toast(option)
}

onLoad();
