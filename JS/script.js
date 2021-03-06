const $country =$('#country');
const $author=$('#author');
const $title=$('#title');
const $description=$('#description');
const $image=$('#title');
const $input = $('input[type="text"]');
const $myTableId = $('tbody');
let oldResult = " "

let newsData, userInput;

$('form').on('submit',handleGetData);

function handleGetData(event){
    //Remove all table rows
    event.preventDefault();
    
    function removeTableData(){
       $('#myTableData td').empty();
      }
    function removeTableBody(){
      $('#myTableId tbody').empty();
    }
    userInput = $input.val();
    if (oldResult !== userInput) {
        removeTableBody();
        oldResult=userInput
    }
    $.ajax ({
      url:'https://api.mediastack.com/v1/news?access_key=6c336f3fb514f8fef958a78a2372fb03&countries= ' + userInput
    }) .then (
        (data) => {
            newsData = data;
            readJson();
        },
        (error) => {
            console.log('bad request', error);
        }
    );
}
//creating loop to go over data, identifyiung it and sorting it by the titles 
function readJson(){

    $("#delete").click(function(){
        $myTableId.empty()
    })
    for (let i = 0 ; i < newsData.data.length ; i++)
    {
        row = newsData.data[i];
        render(row.title, row.description, row.url, row.author,row.country, row.source)    
    }
    

}
//dynamic retrival of data and insertaion of data into  table
function render(title, desc, url, author, country, source){

    newsItem="<tr><td>"+country+"</td><td>"+source+
    "</td><td>"+author+"</td><td>  <a href='"+ url +"' target='_blank'>"+ title +"</a>"
    +"</td><td>"+desc+"</td>";
          $("table tbody").append(newsItem);
    
}

//let dataTable = $('#example')

//$("#delete").click(function(){
    //$myTableId.empty()
    //dataTable.clear();
    // dataTable.row.add([
    //     'new country',
    //     'new source',
    //     'new author',
    //     'new url',
    //     'new desc'
    // ]).draw()
