/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, fullcalendar, angular, $*/
describe('uiCalendar', function () {
    'use strict';

    var scope, $compile;
    
    beforeEach(function() {
      //create an empty calendar object. 
      angular.module('ui.config').value('ui.config', {calendar: {}});
    });

    beforeEach(module('ui'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
         
    }));

    afterEach(function() {
      angular.module('ui.config').value('ui.config', {}); // cleanup
    });

    function createCalendar(events) {
      scope.events = events || {};
      $compile("<div ui-calendar='calendar' ng-model='events'></div>")(scope);
    }

    describe('compiling this directive and checking for the events', function () {

      //Date Objects needed for event
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      // create an array of events, to pass into the directive. 
      var events = [
        {
          title: 'All Day Event',
          start: new Date(y, m, 1)},
        {
          title: 'Long Event',
          start: new Date(y, m, d - 5),
          end: new Date(y, m, d - 2)},
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d - 3, 16, 0),
          allDay: false},
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d + 4, 16, 0),
          allDay: false}
      ]; //End of Events Array

        //These tests pass because the scope.events object is created by the controller and passed into the directive, where the events are manipulated to fit the certain standards of the calendar.  
        it('should excpect to load 4 events to scope', function () {
            
            createCalendar(events);
            expect(scope.events.length).toBe(4);
        });

        it('should excpect to load 4 events to scope', function () {
            
            createCalendar(events);
            expect(scope.events[0].title).toBe('All Day Event');
        });

         it('should expect the url to = http://www.angularjs.org', function () {
           
            createCalendar(events);
            expect(scope.events[0].url).toBe('http://www.angularjs.org');
        });

         it('should bind fullcalendar object to scope', function() {
           createCalendar(events);
           expect(scope.events).toBeTruthy();
         });

       });

});