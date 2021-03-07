/* Declaration Section */

let AddBtn = document.getElementById('AddBtn');
let LendBtn = document.getElementById('LendBtn');
let returnBtn = document.getElementById('returnBtn');
let addBookForm = document.getElementById('addBookForm');
let lendBookForm = document.getElementById('lendBookForm');
let returnBookForm = document.getElementById('returnBookForm');
let checkStatus = document.getElementById('checkStatus');
let tableContent = document.getElementById('tableContent');
let completeTable = document.getElementById('completeTable');
let mainHr = document.getElementById('mainHr');
let body = document.querySelector('body');

/* Class Section */

class Library{
    constructor(BookName, BookID, Timing){
        this.BookName = BookName;
        this.BookID = BookID;
        this.Timing = Timing;
    }
    AddStore(){
        let BookObject = {
            "name"  : this.BookName,
            "id"    : this.BookID,
            "time"  : this.Timing
        }
        let ClassLibrary = localStorage.getItem("ClassLibrary");
        if(ClassLibrary!=null || ClassLibrary!=undefined){
            var BookList = JSON.parse(ClassLibrary);
        }
        else{
            var BookList = [];
        }
        BookList.push(BookObject);
        localStorage.setItem("ClassLibrary", JSON.stringify(BookList));
    }
}

class Transaction{
    getRealTime(){
        let IssuedDate = new Date();
        let dd = IssuedDate.getDate();
        let mm = IssuedDate.getMonth();
        let yy = IssuedDate.getFullYear();
        let ExactTime = dd+"-"+mm+"-"+yy;
        return ExactTime;
    }
    showBooks(){
        completeTable = document.getElementById('completeTable');
        let ClassLibrary = localStorage.getItem("ClassLibrary");
        let htmlFile = "<h1 style='color:red;'>No Book To Show.</h1>";
        if(ClassLibrary!=null || ClassLibrary!=undefined){
            let allBooksList = JSON.parse(ClassLibrary);
            htmlFile = `<h1>Available Books</h1>
                            <table class="table" >
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Customize</th>
                                    </tr>
                                </thead>
                                <tbody id="tableContent">`;
            allBooksList.forEach(function(element, index){
                htmlFile += `<tr>
                                <td>${index+1}</td>
                                <td>${element["name"]}</td>
                                <td>${element["id"]}</td>
                                <td>${element["time"]}</td>
                                <td>
                                    <button class="btn btn-primary mx-1 my-1" onclick="instTransaction.editBook(${index});instTransaction.showBooks()" id="edit${index}">Edit</button>
                                    <button class="btn btn-danger mx-1 my-1" onclick="instTransaction.deleteBook(${index});instTransaction.showBooks()" id="del${index}">Delete</button>
                                </td>
                            </tr>`;
            });
            htmlFile += `</tbody></table>`;
        }
        completeTable.innerHTML  = htmlFile;
    }
    clearForm(formId){
        formId.reset();
    }
    deleteBook(indexnum){
        let value = confirm("Are you sure?");
        if(value){
            let ClassLibrary = localStorage.getItem("ClassLibrary");
            let allBooks = JSON.parse(ClassLibrary);
            allBooks.splice(indexnum, 1);
            localStorage.setItem("ClassLibrary", JSON.stringify(allBooks));
        }
    }
    editBook(indexnum){
        let ClassLibrary = localStorage.getItem("ClassLibrary");
        let allBooks = JSON.parse(ClassLibrary);
        let neededBook = allBooks[indexnum];
        let aBookName = document.getElementById('aBookName');
        let aBookinputID = document.getElementById('aBookinputID');
        aBookName.value = neededBook["name"];
        aBookinputID.value = neededBook["id"];
        allBooks.splice(indexnum, 1);
        localStorage.setItem("ClassLibrary", JSON.stringify(allBooks));
    }
    showAddForm(){
        body.style.backgroundColor = "beige";
        mainHr.classList = 'd-block my-5';
        addBookForm.className = 'd-block';
        lendBookForm.className = 'd-none';
        returnBookForm.className = 'd-none';
    }
    showLendForm(){
        body.style.backgroundColor = "rgb(230, 240, 201)";
        mainHr.classList = 'd-block my-5';
        addBookForm.className = 'd-none';
        lendBookForm.className = 'd-block';
        returnBookForm.className = 'd-none';
    }
    showReturnForm(){
        body.style.backgroundColor = "rgb(200, 250, 230)";
        mainHr.classList = 'd-block my-5';
        addBookForm.className = 'd-none';
        lendBookForm.className = 'd-none';
        returnBookForm.className = 'd-block';
    }
    showStatus(){
        mainHr.classList = 'd-none';
        addBookForm.className = 'd-none';
        lendBookForm.className = 'd-none';
        returnBookForm.className = 'd-none';
        let HtmLfile = `<h1>Registered Books</h1><table class="table" ><thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Book Name</th>
                                <th scope="col">Book ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Registered</th>
                            </tr>
                        </thead>
                        <tbody id="tableContent">`;
        let RegisteredBookList = localStorage.getItem("RegisteredBookList");
        if(RegisteredBookList!=null || RegisteredBookList!=undefined){
            RegisteredBookList = JSON.parse(RegisteredBookList);
            RegisteredBookList.forEach(function(element, index){
                HtmLfile += `<tr>
                                <td>${index+1}</td>
                                <td>${element["bookname"]}</td>
                                <td>${element["id"]}</td>
                                <td>${element["timing"]}</td>
                                <td>${element["lender"]}</td>
                            </tr>`;
            });
            HtmLfile += `</tbody></table>`;
        }
        else{
            HtmLfile = `<h1 class="text-danger">No Books Registered!</h1>`;
        }
        completeTable.innerHTML = HtmLfile;
    }
    LendBook(BookId, PersonName, timing){
        let ClassLibrary = localStorage.getItem("ClassLibrary");
        if(ClassLibrary!=null || ClassLibrary!=undefined){
            let allBooks = JSON.parse(ClassLibrary);
            let availability = false;
            allBooks.forEach(function(element, index){
                if(element.id==BookId){
                    let GetRegistered = localStorage.getItem("RegisteredBookList");
                    var RegisteredBookList = []
                    if(GetRegistered!=null || GetRegistered!=undefined){
                        RegisteredBookList = JSON.parse(GetRegistered);
                    }
                    availability = true;
                    let registeredBookObj = {
                        "bookname"  : element.name,
                        "id"        : element.id,
                        "lender"    : PersonName,
                        'timing'    : timing
                    }
                    RegisteredBookList.push(registeredBookObj);
                    localStorage.setItem("RegisteredBookList", JSON.stringify(RegisteredBookList));
                    allBooks.splice(index, 1);
                    localStorage.setItem("ClassLibrary", JSON.stringify(allBooks));
                }
            });
            if(!availability){
                alert("Book Not Available or Possibly already Registered!")
            }
        }
        else{
            alert("No Books Available")
        }
    }
    returnBook(Book_id, timing){
        let RegisteredBook = localStorage.getItem("RegisteredBookList");
        if(RegisteredBook!=null || RegisteredBook!=undefined){
            let AvailableBooks = [];
            let registeredBookObject = {};
            let availability = false;
            RegisteredBook = JSON.parse(RegisteredBook);
            RegisteredBook.forEach(function(element, index){
                if(element.id==Book_id){
                    availability = true;
                    let ClassLibrary = localStorage.getItem("ClassLibrary");
                    if(ClassLibrary!=null || ClassLibrary!=undefined){
                        AvailableBooks = JSON.parse(ClassLibrary);
                    }
                    registeredBookObject = {
                        "name"  : element.bookname,
                        "id"    : Book_id,
                        "time"  : timing
                    }
                    AvailableBooks.push(registeredBookObject);
                    localStorage.setItem("ClassLibrary", JSON.stringify(AvailableBooks));
                    RegisteredBook.splice(index,1);
                    localStorage.setItem("RegisteredBookList", JSON.stringify(RegisteredBook));
                }
            });
            if(!availability){
                alert("Book ID did not Match!");
            }
        }
        else{
            alert("No Book available of this ID.");
        }
    }
}

/* Instance Section */

let instTransaction = new Transaction();
instTransaction.showBooks();

/* EvenListener Section */

AddBtn.addEventListener('click', instTransaction.showAddForm);
LendBtn.addEventListener('click', instTransaction.showLendForm);
returnBtn.addEventListener('click', instTransaction.showReturnForm);
checkStatus.addEventListener('click', instTransaction.showStatus);
AddBtn.addEventListener('click', instTransaction.showBooks);
LendBtn.addEventListener('click', instTransaction.showBooks);
returnBtn.addEventListener('click', instTransaction.showBooks);

addBookForm.addEventListener('submit', function(event){
    event.preventDefault();
    let aBookName = document.getElementById('aBookName');
    let aBookinputID = document.getElementById('aBookinputID');
    let instLibrary1 = new Library(aBookName.value, aBookinputID.value, instTransaction.getRealTime());
    instLibrary1.AddStore();
    instTransaction.showBooks();
    instTransaction.clearForm(addBookForm);
});
lendBookForm.addEventListener('submit', function(event){
    event.preventDefault();
    let lBookinputID = document.getElementById('lBookinputID');
    let lenderName = document.getElementById('lenderName');
    instTransaction.LendBook(lBookinputID.value, lenderName.value, instTransaction.getRealTime());
    instTransaction.showBooks();
    instTransaction.clearForm(lendBookForm);
});
returnBookForm.addEventListener('submit', function(event){
    event.preventDefault();
    let rBookinputID = document.getElementById('rBookinputID');
    instTransaction.returnBook(rBookinputID.value, instTransaction.getRealTime());
    instTransaction.showBooks();
    instTransaction.clearForm(returnBookForm);
});




