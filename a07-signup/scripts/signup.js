// Katherine Gao and Anika Shields 
// Assignment 7

/* global Luhn */

(function (window) {
  'use strict';
  var $ = window.jQuery;
  var FORM_SELECTOR = '[data-role="form"]';
  

  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);
  
  function validator(data,event) {
      var badUsernames = ['admin', 'root','super'];
      var minPassword = 10;
      
      // username validation
      if (badUsernames.includes(data["name"].toLowerCase())) {
        $("#invalid-user").text('Invalid username: ' + data.name);
        event.preventDefault();
      } 
      // password length validation
      if (data["password1"].length < minPassword) {
        $("#invalid-pw1").text('Password is too short.');
        event.preventDefault();
      } 
      // password matching validation
      if (!(data["password1"] === data["password2"])) {
        $("#invalid-pw2").text("Passwords don't match");
        event.preventDefault();
      } 
      // luhn test validation for credit card
      if (!Luhn.is_valid(data["card"])) {
        $("#invalid-card").text('Credit card number is mis-typed');
      }
  }
  
  // function to test the sum function from Luhn.js
  function luhnSumTest() {
    console.log('should be 10: ' + Luhn.sum([1, 2, 3, 4]));
    console.log('should be 7: ' + Luhn.sum([1, 2, 4]));
  } 
  
  luhnSumTest();
  
  formHandler.addSubmitHandler(validator);
  console.log(formHandler);
})(window);