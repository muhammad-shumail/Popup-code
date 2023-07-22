// Use an immediately invoked function expression (IIFE) to avoid polluting the global scope
(function (global, factory) {
  // Use a ternary operator to check the module system and call the factory function accordingly
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('cropperjs')) :
    typeof define === 'function' && define.amd ? define(['jquery', 'cropperjs'], factory) :
      // If no module system, use the global jQuery and Cropper objects
      (global = global || self, factory(global.jQuery, global.Cropper));
}(this, function ($, Cropper) {
  'use strict';

  // Use destructuring assignment to get the default exports of jQuery and Cropper
  $ = $?.default ?? $;
  Cropper = Cropper?.default ?? Cropper;

  // Check if jQuery and Cropper are available
  if ($ && $.fn && Cropper) {
    // Save the original cropper plugin in case of conflict
    var AnotherCropper = $.fn.cropper;
    // Define a namespace for the plugin
    var NAMESPACE = 'cropper';

    // Define the plugin function
    $.fn.cropper = function jQueryCropper(option, ...args) {
      // Initialize the result variable
      var result;
      // Loop over each element in the jQuery collection
      this.each(function (i, element) {
        // Get the jQuery object of the element
        var $element = $(element);
        // Check if the option is 'destroy'
        var isDestroy = option === 'destroy';
        // Get the cropper instance from the element data
        var cropper = $element.data(NAMESPACE);

        // If no cropper instance, create one or skip if destroying
        if (!cropper) {
          if (isDestroy) {
            return;
          }

          // Merge the default options, the element data and the option object
          var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);
          // Create a new cropper instance with the element and the options
          cropper = new Cropper(element, options);
          // Store the cropper instance in the element data
          $element.data(NAMESPACE, cropper);
        }

        // If the option is a string, treat it as a method name
        if (typeof option === 'string') {
          // Get the method from the cropper instance
          var fn = cropper[option];

          // If the method is a function, call it with the arguments
          if ($.isFunction(fn)) {
            // Call the method and store the result
            result = fn.apply(cropper, args);

            // If the result is the cropper instance, set it to undefined
            if (result === cropper) {
              result = undefined;
            }

            // If destroying, remove the cropper instance from the element data
            if (isDestroy) {
              $element.removeData(NAMESPACE);
            }
          }
        }
      });
      // Return the result or the jQuery collection
      return result !== undefined ? result : this;
    };

    // Expose the Cropper constructor and static methods on the plugin function
    $.fn.cropper.Constructor = Cropper;
    $.fn.cropper.setDefaults = Cropper.setDefaults;

    // Define a noConflict method to restore the original cropper plugin
    $.fn.cropper.noConflict = function noConflict() {
      $.fn.cropper = AnotherCropper;
      return this;
    };
  }

}));
