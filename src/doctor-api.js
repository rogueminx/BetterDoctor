import $ from 'jquery';
const apiKey = process.env.exports.apiKey

export class Doctor {

  doctorByLocation(docName) {
    return new Promise(function(resolve, reject) {
      let location = "or-portland";
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&location=${location}&skip=0&limit=30&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
          $('#doctorNameError').text(`There was an error processing your request: ${error.message}`);
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  doctorBySymptom(symptom) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let location = "or-portland";
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=${location}&skip=0&limit=10&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
          $('#symptomError').text(`There was an error processing your request: ${request.statusText}`);
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
