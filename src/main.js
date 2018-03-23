import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doctor } from './doctor-api.js';


$(document).ready(function() {
  $("#doctorName-search").submit(function(event) {
    event.preventDefault();
    let doctorName = $("#name").val();
    let firstSearch = new Doctor();
    let promise = firstSearch.doctorByLocation(doctorName);
    promise.then(function(response) {
      if (response.length == 0) {
        $('#doctorNameResults').append(`There are no doctors in your area with that name.`)
      } else {
      let results = JSON.parse(response);
        for(let i = 0; i < results.data.length; i++) {
          let docFirstName = results.data[i].profile.first_name;
          let docLastName = results.data[i].profile.last_name;
          let streetAddress = results.data[i].practices[0].visit_address.street;
          let docCity = results.data[i].practices[0].visit_address.city;
          let zipcode = results.data[i].practices[0].visit_address.zip;
          let phoneNumber = results.data[i].practices[0].phones[0].number;
          let website = results.data[i].practices[0].website || "no website";
          let newPatients = results.data[i].practices[0].accepts_new_patients;
          $('#doctorNameResults').append(`<h5>Doctor Name: ${docLastName}, ${docFirstName}</h5>Address: <br>${streetAddress}, ${docCity}, ${zipcode}<br> Phone Number: <br>${phoneNumber} <br> Website: <br>${website} <br> Accepting New Patients: <br>${newPatients} `);
        }
      }
      }),function(statusText) {
        $('#doctorNameError').text(`There was an error processing your request: ${error.message}`);
      };
  })
});
