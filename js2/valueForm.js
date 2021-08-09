/*File: valueForm.js
Created on: August 3, 2021
GUI Assignment: HW4: Validation plugin
Description: File contains the validate function for our rangeValuesForm. Also contains handles when the table is built.

DISCLAIMER: Most of this code was obtained by reading w3schools.com tutorials.All the use of JQuery implementation was done using
https://jqueryvalidation.org/ documentation.

Rodrigo Choque Cardenas, UMass Lowell Computer Science, rodrigo_choquecardenas@student.uml.edu
Updated by RCC on August 1, 2021 at 1: 01AM
*/
$().ready(function () {
    $("#rangeValuesForm").validate({
        /*
         * Validation rules:
         * required: All fields are required
         * step: All numbers must be integers
         * min: and max: Range is between -50 and 50. Also max cannot be less than min, and viceversa.
         */
        rules: {
            xlower: {
                required: true,
                min: -50,
                /*
                 * Difficult part of the HW. Had to find out how to use field values inside validation rules.
                 * This solution uses a helper function, and inside that function I can use js statements.
                 * It obtains the value of the other field. If it's not empty and is less than 50, then it's a 
                 * valid lower limit. Else the maximum allowed for a lower limit is 50.
                 * The same logic applies to the remaining axis limitfields.
                 */
                max: function () {
                    var xu = $("#xupper").val();
                    if (xu != "" && parseInt(xu) <= 50)
                        return parseInt(xu);
                    else
                        return 50;
                },
                //Only integer will be accepted thanks to this rule
                step: 1
            },
            xupper: {
                required: true,
                min: function () {
                    var xl = $("#xlower").val();
                    if (xl != "" && parseInt(xl) >= -50)
                        return parseInt(xl);
                    else
                        return -50;
                },
                max: 50,
                step: 1
            },
            ylower: {
                required: true,
                min: -50,
                max: function () {
                    var yu = $("#yupper").val();
                    if (yu != "" && parseInt(yu) <= 50)
                        return parseInt(yu);
                    else
                        return 50;
                },
                step: 1
            },
            yupper: {
                required: true,
                min: function () {
                    var yl = $("#ylower").val();
                    if (yl != "" && parseInt(yl) >= -50)
                        return parseInt(yl);
                    else
                        return -50;
                },
                max: 50,
                step: 1
            }
        },
        //Validation error messages
        messages: {
            xlower: {
                //Each validation error has its custom error message.
                required: "Required field. Enter a number",
                min: "Enter -50 or greater",
                max: "Enter number less than 50 AND less than the x-axis UPPER limit",
                step: "Enter an integer"
            },
            xupper: {
                required: "Required field. Enter a number",
                min: "Enter number greater than -50 AND greater than the x-axis LOWER limit",
                max: "Enter 50 or less",
                step: "Enter an integer"
            },
            ylower: {
                required: "Required field. Enter a number",
                min: "Enter -50 or greater",
                max: "Enter number less than 50 AND less than the y-axis UPPER limit",
                step: "Enter an integer"
            },
            yupper: {
                required: "Required field. Enter a number",
                min: "Enter number greater than -50 AND greater than the y-axis LOWER limit",
                max: "Enter 50 or less",
                step: "Enter an integer"
            }
        }

    });
    /*
     * This part handles what happens then the submit input is clicked.
     * The valid() function checks if all the fields in the form are valid.
     * If it's true then we proceed to build the multiplication table,
     * else we don't do anything. This prevents from building a multiplication table with 
     * invalid range values.
     */
    $("#rangeValuesForm").submit(function (event) {
        var form = $("#rangeValuesForm");
        if (form.valid()) {
            obtainValues();
        }

    });
});

