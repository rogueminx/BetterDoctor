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
      let results = JSON.parse(response);
      for(let i = 0; i < results.data.length; i++) {
        let docFirstName = results.data[i].profile.first_name;
        // let streetAddress = results.data[i].practices.visit_address.street;
        // let city = results.data[i].practices.visit_address.city;
        $('#locationResults').append(`Doctor Name: ${docFirstName}<p>`);
      }
    }), function(statusText) {
      $('#locationError').text(`There was an error processing your request: ${error.message}`);
    };
  })
});
