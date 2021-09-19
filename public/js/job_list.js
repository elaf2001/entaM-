function onLoad(){
    userStr = localStorage.getItem("User_Key");
    user = JSON.parse(userStr);
    loadCompanies();
}

function loadCompanies(){
    let companies = {};
    output = "";
    let searchResults = document.getElementById("search_results");
    const dbRef = firebase.database().ref();
    firebase.database().ref('companies').on('value',(snap)=>{
        companies = snap.val();
      });
      setTimeout(function () {
        let changed = false;
        output +=`<div class="well search-result">
        <div class="input-group">
        <input type="text" class="form-control" placeholder="Search"><span class="input-group-btn"><button class="btn btn-info btn-lg" type="button">
        <i class="glyphicon glyphicon-search"></i>Search</button></span></div></div>`;
        for (company in companies){
            let nationality = user.nationality.toUpperCase();
            if (nationality == companies[company].type.slice(0,companies[company].type.length-1).toUpperCase() || companies[company].type == "No preference"){
                output += `<div class="well search-result">
                <div class="row">
                    <a href="#">
                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                            <img class="img-responsive" id="${company}" src=${companies[company].image} alt="">
                        </div>
                        <div class="col-xs-6 col-sm-9 col-md-9 col-lg-10 title">
                            <h3>${company}</h3>
                            <p>${companies[company].description}</p>
                        </div>
                    </a>
                </div>
                </div>`;
                changed = true;
            }
            else if ((!(nationality.toUpperCase() == "MALAYSIA") && companies[company].type == "International") || companies[company].type == "No preference") {
                output += `<div class="well search-result">
                <div class="row">
                    <a href="#">
                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                            <img class="img-responsive" id="${company}" src=${companies[company].image} alt="">
                        </div>
                        <div class="col-xs-6 col-sm-9 col-md-9 col-lg-10 title">
                            <h3>${company}</h3>
                            <p>${companies[company].description}</p>
                        </div>
                    </a>
                </div>
                </div>`;
                changed = true;
            }
        }
        output += `<div class="row">
            <button type="button" class="btn btn-info  btn-block">
                <i class="glyphicon glyphicon-refresh"></i>Load more...
            </button>
        </div>`;
        searchResults.innerHTML = output;
        if (changed){
            for (let company in companies){
                let mainCompany = companies[company];
                companies[company].name = company;
                console.log(mainCompany);
                companyRef = document.getElementById(company);
                if (companyRef != null){
                    companyRef.addEventListener('click',function(){
                        localStorage.setItem("Company_Key",JSON.stringify(mainCompany));
                        window.location = "job_posting.html";
                    })
                }
            }
        }

    }, 1000);


}
onLoad();
