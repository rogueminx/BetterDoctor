import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doctor } from './doctor-api.js';


$(document).ready(function() {
  $('#searchLocation').click(function() {
    event.preventDefault();
    const location = $('#location').val();
    let firstSearch = new Doctor();
    let promise = firstSearch.doctorByLocation(location);
    promise.then(function(response) {
      let results = JSON.parse(response);
      for(let i = 0; i < results.data.length; i++) {
        let docName = results.data[i].practices.name;
        let streetAddress = results.data[i].practices.visit_address.street;
        let city = results.data[i].practices.visit_address.city;
        
      }
      $('#locationResults').append(`<div class="row" id="resultrow"><div class="col-md-10"><span id="doctorDetails"> ${docName} </span></div></div>`);
    })
  })
});
