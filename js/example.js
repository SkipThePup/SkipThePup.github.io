// ADD NEW ITEM TO END OF LIST
var lista = document.getElementsByTagName("UL");
var last = document.createElement("LI");
last.innerText = "cream";
lista[0].appendChild(last);

// ADD NEW ITEM START OF LIST
var first = document.createElement("LI");
first.innerText = "kale";
lista[0].prepend(first);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listaElements = document.getElementsByTagName("LI");
for (let i = 0; i < listaElements.length; i++) {
    listaElements[i].setAttribute("class", "cool");

}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

//I used span because the provided css file has a nice h2 span format =)
var number = document.createElement("SPAN");
number.innerText = listaElements.length;

document.getElementsByTagName("H2")[0].appendChild(number);

