/*File: valueForm.js
Created on: August 3, 2021
GUI Assignment: HW4 Part 2: Tab Jquery
Description: File makes use of JQuery UI. This is an extension of HW3 and HW4-Part 1 where each generated multiplication table is 
             opened on a new tab.
             Also sliders were added to manipulate the input fields of the axis limits. Implements "two-way binding".
NOTE: As said before, this is an extension of HW4 Part 1, so I deleted the comments found on that part, and just left the new ones.
DISCLAIMER: Most of this code was obtained by reading w3schools.com tutorials. Also, we used the readings provided by the professor in these
links: https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/jQueryUI1.8_Ch03_TabsWidget.pdf
       https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/jQueryUI1.8_Ch06_SliderWidget.pdf

Finally, I used the documentation found in https://api.jqueryui.com/


Rodrigo Choque Cardenas, UMass Lowell Computer Science, rodrigo_choquecardenas@student.uml.edu
Updated by RCC on August 8, 2021 at 1: 01PM
*/
$().ready(function () {
    $("#rangeValuesForm").validate({
        rules: {
            xlower: {
                required: true,
                min: -50,
                max: function () {
                    var xu = $("#xupper").val();
                    if (xu != "" && parseInt(xu) <= 50)
                        return parseInt(xu);
                    else
                        return 50;
                },
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
        messages: {
            xlower: {
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
    // START HERE...Sliders

    $(function () {
        var form = $("#rangeValuesForm");

        //We add the sliders to the div named xlowerSlider, etc.
        $("#xlowerSlider").slider();
        $("#xupperSlider").slider();
        $("#ylowerSlider").slider();
        $("#yupperSlider").slider();

        //variable will hold slider properties. Slider will go from -50 to 50, with a step equal to 1
        var sliderOpts = {
            min: -50,
            max: 50,
            step: 1
        };

        //we give said properties to the sliders
        $("#xlowerSlider").slider(sliderOpts);
        $("#xupperSlider").slider(sliderOpts);
        $("#ylowerSlider").slider(sliderOpts);
        $("#yupperSlider").slider(sliderOpts);

        /*
         * Implementation of the 2-way binding starts here...
         * The property "slide" will call the inner function every time the mouse moves the slider
         * The function does two things: it updates the input filed with the value given by the slider;
         * and if the values of the four input fields are valid, it will create the table dynamically.
         * So everytime the slider is moved to a valid range, a table will be auto-generated.
         */ 
        $("#xlowerSlider").slider({
            slide: function (event, ui) {
                $("#xlower").val(ui.value);
                if (form.valid()) {
                    obtainValues();
                }
            }
        });
        //The next three functions do exactly the same
        $("#xupperSlider").slider({
            slide: function (event, ui) {
                $("#xupper").val(ui.value);
                if (form.valid()) {
                    obtainValues();
                }
            }
        });
        $("#ylowerSlider").slider({
            slide: function (event, ui) {
                $("#ylower").val(ui.value);
                if (form.valid()) {
                    obtainValues();
                }
            }
        });
        $("#yupperSlider").slider({
            slide: function (event, ui) {
                $("#yupper").val(ui.value);
                if (form.valid()) {
                    obtainValues();
                }
            }
        });
        /*Second part of the 2-way binding. Every the user inputs a number on the input field,
         * the respective slider will obtain that value and change its own value to the new one, moving the slider to
         * its respective position.
         * A multiplication table will be also auto-generated everytime the user inputs valid table ranges.
         */
        $("#xlower").change(function () {
            $("#xlowerSlider").slider("value", $("#xlower").val());
            if (form.valid()) {
                obtainValues();
            }
        });
        $("#xupper").change(function () {
            $("#xupperSlider").slider("value", $("#xupper").val());
            if (form.valid()) {
                obtainValues();
            }
        });
        $("#ylower").change(function () {
            $("#ylowerSlider").slider("value", $("#ylower").val());
            if (form.valid()) {
                obtainValues();
            }
        });
        $("#yupper").change(function () {
            $("#yupperSlider").slider("value", $("#yupper").val());
            if (form.valid()) {
                obtainValues();
            }
        });

    });

    //Tabs...
    //Function adds tab to div with id myTabs
    $(function () {
        $("#myTabs").tabs();
    });

    //The "auto-generation" is shown in the default/first tab. Whenever the user opens a new tab,
    //this table shown in the default tab will be copied into the new tab.
    //I will use the submit button of my form to signal when to open a new tab.
    $("#rangeValuesForm").submit(function (event) {
        var form = $("#rangeValuesForm");
        //When the user click on the submit button, it will check if the inputs are valid and proceed to generate a new tab
        if (form.valid()) {
            //First we obtain the number of tabs we already
            var num_tabs = $("#myTabs ul li").length + 1;

            //Second, we obtain the current table shown in the first tab
            var currentTable = document.getElementById("table").innerHTML;
            //Third, we obtain the values of each input field and concatane them into a var so it contains the x and y range
            var currentValues = "x:[" + document.getElementById("xlower").value + "," +
                document.getElementById("xupper").value + "] y:[" +
                document.getElementById("ylower").value + "," +
                document.getElementById("yupper").value + "]";

            //Then, we add a reference to the ulist using num_tabs. We also use the previous string to display the range in the tab header.
            $("#myTabs ul").append(
                "<li><a href='#tab" + num_tabs + "'>" + currentValues + "</a></li>"
            );
            //Create the actual tab div and add it to the div#myTabs. We put the previously saved table into the new tab.
            $("#myTabs").append(
                "<div id='tab" + num_tabs + "'>" + currentTable + "</div>"
            );
            $("#myTabs").tabs("refresh");
        }

    });
    $("#deleteSingle").click(function () {
        var active = $("#myTabs").tabs("option", "active");
        active += 1;
        console.log(active);

        if (active >= 2) {
            var activeTab = "tab" + active;
            console.log(activeTab);
            var tabToBeRemoved = document.getElementById(activeTab);
            // Remove the panel
            tabToBeRemoved.remove();



            // Remove the tab
            var hrefStr = "a[href='#" + activeTab + "']"
            $(hrefStr).closest("li").remove()
        }


    });

});
