(function() {
  describe('uiDate', function() {
    var selectDate;
    selectDate = function(element, date) {
      element.datepicker('setDate', date);
      return $.datepicker._selectDate(element);
    };
    beforeEach(module('ui.directives'));
    describe('simple use on input element', function() {
      it('should have a date picker attached', function() {
        return inject(function($compile, $rootScope) {
          var element;
          element = $compile("<input ui-date></input>")($rootScope);
          return expect(element.datepicker()).toBeDefined();
        });
      });
      it('should be able to get the date from the model', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<input ui-date ng-model='x'></input>")($rootScope);
          $rootScope.$apply(function() {
            return $rootScope.x = aDate;
          });
          return expect(element.datepicker('getDate')).toEqual(aDate);
        });
      });
      return it('should put the date in the model', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<input ui-date ng-model='x'></input>")($rootScope);
          selectDate(element, aDate);
          return expect($rootScope.x).toEqual(aDate);
        });
      });
    });
    describe('use with ng-required directive', function() {
      it('should be invalid initially', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<input ui-date ng-model='x' ng-required='true' ></input>")($rootScope);
          $rootScope.$apply();
          return expect(element.hasClass('ng-invalid')).toBeTruthy();
        });
      });
      it('should be valid if model has been specified', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<input ui-date ng-model='x' ng-required='true' ></input>")($rootScope);
          $rootScope.$apply(function() {
            return $rootScope.x = aDate;
          });
          return expect(element.hasClass('ng-valid')).toBeTruthy();
        });
      });
      return it('should be valid after the date has been picked', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<input ui-date ng-model='x' ng-required='true' ></input>")($rootScope);
          selectDate(element, aDate);
          return expect(element.hasClass('ng-valid')).toBeTruthy();
        });
      });
    });
    describe('simple use on a div element', function() {
      it('should have a date picker attached', function() {
        return inject(function($compile, $rootScope) {
          var element;
          element = $compile("<div ui-date></div>")($rootScope);
          return expect(element.datepicker()).toBeDefined();
        });
      });
      it('should be able to get the date from the model', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<div ui-date ng-model='x'></div>")($rootScope);
          $rootScope.$apply(function() {
            return $rootScope.x = aDate;
          });
          return expect(element.datepicker('getDate')).toEqual(aDate);
        });
      });
      return it('should put the date in the model', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<div ui-date ng-model='x'></div>")($rootScope);
          selectDate(element, aDate);
          return expect($rootScope.x).toEqual(aDate);
        });
      });
    });
    return describe('use with ng-required directive', function() {
      it('should be invalid initially', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
          $rootScope.$apply();
          return expect(element.hasClass('ng-invalid')).toBeTruthy();
        });
      });
      it('should be valid if model has been specified', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
          $rootScope.$apply(function() {
            return $rootScope.x = aDate;
          });
          return expect(element.hasClass('ng-valid')).toBeTruthy();
        });
      });
      return it('should be valid after the date has been picked', function() {
        return inject(function($compile, $rootScope) {
          var aDate, element;
          aDate = new Date(2010, 12, 1);
          element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
          selectDate(element, aDate);
          return expect(element.hasClass('ng-valid')).toBeTruthy();
        });
      });
    });
  });
}).call(this);
