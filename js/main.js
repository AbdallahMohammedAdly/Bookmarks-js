var bookMarkName = document.getElementById("bookmark")
var bookMarkUrl = document.getElementById("bookmarkurl")
var tbody = document.getElementById("mytbody")
var Btn = document.getElementById("saveBtn")
var mybooks = []
var mainindex;

if(localStorage.getItem("bookmark") != null){
    mybooks =  JSON.parse(localStorage.getItem("bookmark")) ;
    display();
}

function save(){
    if(Btn.value == "Update"){

        mybooks[mainindex].name  =  bookMarkName.value ;
        mybooks[mainindex].url = bookMarkUrl.value ;
        display();
        Btn.value = "save";
        Btn.classList.remove("btn-warning")
        Btn.classList.add("btn-dark");
    }else{
    
        var marks ={
            name : bookMarkName.value ,
            url  : bookMarkUrl.value 
    }
    
        mybooks.push(marks)
        localStorage.setItem("bookmark",JSON.stringify(mybooks));
        display();
        clean();
}
}
function display(){

    var tr= "" ;
     for(var i=0; i<mybooks.length; i++){
        tr += ` <tr>
                  <td>${mybooks[i].name}</td>
                  <td>${mybooks[i].url}</td>
                  <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">delete</button></td>
                    <td><a href="https://${mybooks[i].url}" target="_blank" ><button class="btn btn-primary" onclick="">visit</button></a>
                  </td>
                  <td><button class="btn btn-warning" onclick="update(${i});">update</button></td>
                </tr>` ;
     }
     tbody.innerHTML = tr ;
     
}
function deleteBookMark(indexOfBookMark){
    mybooks.splice(indexOfBookMark ,1 );
    localStorage.setItem("bookmark",JSON.stringify(mybooks));
    display();
}
function clean(){
    bookMarkName.value = "" ;
    bookMarkUrl.value = "" ;
}
function search(word){

    var Books = '';
    for(var i=0 ; i<mybooks.length ; i++){

        if((mybooks[i].name.toLowerCase().includes(word.toLowerCase())) == true){   
            Books += ` <tr>
            <td>${mybooks[i].name}</td>
            <td>${mybooks[i].url}</td>
            <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">delete</button></td>
              <td><a href="https://${mybooks[i].url}" target="_blank" ><button class="btn btn-primary" onclick="">visit</button></a>
            </td>
            <td><button class="btn btn-warning" onclick="update(${i});">update</button></td>
          </tr>` ;
            }
            tbody.innerHTML = Books ;

        }
    }

function update(index){
    mainindex = index ;
    Btn.classList.remove("btn-dark")
    Btn.classList.add('btn-warning');
    Btn.value = "Update";
    bookMarkName.value = mybooks[index].name ;
    bookMarkUrl.value = mybooks[index].url ;
}