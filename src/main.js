import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doctor } from './doctor-api.js';


$(document).ready(function() {
  $("#location-search").submit(function(event) {
    event.preventDefault();
    let city = $("#city").val();
    let firstSearch = new Doctor();
    let promise = firstSearch.doctorByLocation(city);
    promise.then(function(response) {
      if (response.length == 0) {
        $('#locationResults').append(`There are no doctors in your area. `)
      } else {
      let results = JSON.parse(response);
        for(let i = 0; i < results.data.length; i++) {
          let docFirstName = results.data[i].profile.first_name;
          let docLastName = results.data[i].profile.last_name;
          let streetAddress = results.data[i].practices[i].visit_address.street;
          let docCity = results.data[i].practices[i].visit_address.city;
          let zipcode = results.data[i].practices[i].visit_address.zip;
          let phoneNumber = results.data[i].practices[i].phones[i].number;
          $('#locationResults').append(`<div class="row"><div class="col-md-12"><h5>Doctor Name: ${docLastName}, ${docFirstName}</h5></div><br><div class="col-md-12">Address: <br>${streetAddress}, ${docCity}, ${zipcode}<br> Phone Number: <br>${phoneNumber} </div></div>`);
        }
      }
      }),function(statusText) {
        $('#locationError').text(`There was an error processing your request: ${error.message}`);
      };
  })
});
