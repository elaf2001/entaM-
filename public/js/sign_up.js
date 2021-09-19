function nextBtn() {
  let number = document.getElementById("num").value;
  userData = {
    f_name: document.getElementById("fname").value,
    l_name: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
    experience: true,
    nationality: "",
    number: number,
    reside: "",
    specialization: ""
  };
  firebase.database().ref("users/" + number).set(userData);

  localStorage.setItem("User_Key", JSON.stringify(userData));
  localStorage.setItem("NUMBER", number);

  setInterval(function () {
    window.location = "signup_2.html"
  }, 2000);
}


function submitBtn() {
  let number = localStorage.getItem("NUMBER");
  let dbRef = firebase.database().ref('users');
  // updating the data
  dbRef.child(number).update({
    nationality: document.getElementById("country").value,
    reside: document.getElementById("city").value,
    specialization: document.getElementById("specialization").value,
    experience: document.querySelector('input[name="radio"]:checked').value
  });
  userData.nationality = document.getElementById("country").value;
  userData.reside = document.getElementById("city").value;
  localStorage.setItem("User_Key", JSON.stringify(userData));


  // uploading the file
  var fileSelector = document.getElementById('file').files[0];

  var storageRef = firebase.storage().ref('resumes/' + fileSelector.name);
  var uploadTask = storageRef.put(fileSelector).then(data => {
    data.ref.getDownloadURL().then(url => {
      console.log(url)
      firebase.database().ref("resumes/" + number).set({
        number: number,
        resumeURL: url
      });
    });
  });
  setInterval(function () {
    window.location = "profile_page.html"
  }, 5000);
};

let userData = {};
