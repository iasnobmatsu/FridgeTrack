let data = [{
        "name": "apple",
        "expire": "2020-02-24",
        "opened": "false"
    },
    {
        "name": "banana",
        "expire": "2020-02-25",
        "opened": "false"
    },
    {
        "name": "icecream",
        "expire": "2020-05-25",
        "opened": "false"
    },
    {
        "name": "smoothie",
        "expire": "2020-03-23",
        "opened": "false"
    }
]
let bdata = [];
let barcodes = [];
let alertcount = 0;
let intv;

$(document).ready(() => {
    //  intv=setInterval(check, 3000);
    console.log('ready');
    check();

});

function check() {
    console.log('start checking')
    data2 = data.map((item) => {
        today = new Date();
        edate = parseDate(item.expire);
        //https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
        let oneday = oneDay = 24 * 60 * 60 * 1000;
        diffDays = Math.floor((edate - today) / oneDay)+1;
        item['days'] = diffDays;
        return item;
    })

    console.log(data2);
    if (data2.filter(item => (item.days <= 3)).length > 0) {
        names = []
        exp = data2.filter(item => item.days <= 3);
        console.log(exp);
        for (let i = 0; i < exp.length; i++) {
            names.push(data2[i].name);
        }
        Push.create("Your item " + names + " will expire under 3 days.")
        console.log('check')
        // alertcount++;
    }
    // if (alertcount>0){
    //     clearInterval(intv);
    // }

}
$('body').on('click', '#add', (e) => {
    e.preventDefault();
    console.log("ohweufghj");
    let food = $('#name').val();
    let edate = $('#datein').val();
    let opened = $('#opened').prop('checked');
    console.log(food, edate, opened);


    let item = {
        "name": food,
        "expire": edate,
        "opened": opened

    }

    data.push(item);
    // generate(data);

});

//https://stackoverflow.com/questions/23641525/javascript-date-object-from-input-type-date
function parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
}


function generate(data) {
    data2 = data.map((item) => {
        today = new Date();
        edate = parseDate(item.expire);
        //ref https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
        let oneday = oneDay = 24 * 60 * 60 * 1000;
        diffDays = Math.floor((edate - today) / oneDay)+1;
        item['days'] = diffDays;
        return item;
    })

    data2=data2.filter(item=>item.days>0);
    data2 = data2.sort((item1, item2) => {
        return (item1.days - item2.days)
    });
    console.log(data2)
    data3 = $(`<table class='table' style="width:100%">
    <tr>
      <th>Name</th>
      <th>Days left</th>
      <th>Expiration Date</th>
      <th>Opened</th>
    </tr>
  </table>
    `);
    for (let i = 0; i < data2.length; i++) {
        data3.append($(`<tr><td>${data2[i].name}</td>
        <td>${data2[i].days}</td>
        <td>${data2[i].expire}</td>
        <td>${data2[i].opened}</td>
        </tr>`))

    }

    data3.append($(`<button id='back' class='btn btn-info'>Go back</button>`))
    let content = $(`<div id='data'> </div>`).append(data3);
    $('body').empty().append($(`
    <nav class="navbar navbar-expand-md navbar-dark">
    <!-- brand icon -->
    <img id="logo" src="logo.jpg" style="width: 40px;">
    <h3><a class="navbar-brand" href="/">Frigi-Track</a></h3>

    <!-- Collapse toggle button -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible Navigation Bar -->
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <!-- Navigation bar contents -->
        <ul class="navbar-nav">
            <!-- Whitespace & Separator -->
            <span class="navbar-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>

            <!-- Navigation bar items -->
            <li class="nav-item">
                <a class="nav-link" href="#">Track</a> <!-- TODO -->
            </li>


            <!-- Whitespace & Separator -->
            <span class="navbar-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>

            <!-- Navigation bar items -->
            <li class="nav-item">
                <a class="nav-link" href="#">Foodlist</a> <!-- TODO -->
            </li>


            <!-- Whitespace & Separator -->
            <span class="navbar-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>

            <!-- Navigation bar items -->
            <li class="nav-item">
                <a class="nav-link" href="#">Nutrition Menu</a> <!-- TODO -->
            </li>


            <!-- Whitespace & Separator -->
            <span class="navbar-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>

            <!-- Navigation bar dropdown menu -->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    My Fridge
                </a>
                <!-- Dropdown menu items -->
                <div class="dropdown-menu">
                    <a class="dropdown-item">Fridge 1</a> <!-- TODO -->
                    <!-- My food list -->
                    <a class="dropdown-item">Fridge 2</a> <!-- TODO -->
                    <!-- Settings -->
                    <a class="dropdown-item">Fridge 3</a> <!-- TODO -->
                    <!-- Log out -->
                </div>
            </li>

            <!-- Not Login content -->
            <!-- Whitespace & Separator -->
            <span class="navbar-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>

            <div class="search-container">
                <form>
                    <input type="text" placeholder="Search your food" name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>

        </ul>
    </div>
</nav>`));
    $('body').append(content);
    $('body').append($(`<footer>
    <div class="container-fluid">
        <p><span style='color:black'>Frigi-Track</span></p>
    </div>
</footer>`));
}

$('body').on('click', '#todata', (e) => {
    e.preventDefault();
    generate(data);
});

$('body').on('click', '#back', (e) => {
    e.preventDefault();
    main();
});

function main() {
    $('body').empty().append($(



        `
        <nav class="navbar navbar-expand-md navbar-dark">
                <!-- brand icon -->
                <img id="logo" src="logo.jpg" style="width: 40px;">
                <h3><a class="navbar-brand" href="/">Frigi-Track</a></h3>
    
                <!-- Collapse toggle button -->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <!-- Collapsible Navigation Bar -->
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <!-- Navigation bar contents -->
                    <ul class="navbar-nav">
                        <!-- Whitespace & Separator -->
                        <span class="navbar-text">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
    
                        <!-- Navigation bar items -->
                        <li class="nav-item">
                            <a class="nav-link" href="#">Track</a> <!-- TODO -->
                        </li>
                        
                        
                        <!-- Whitespace & Separator -->
                        <span class="navbar-text">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        
                        <!-- Navigation bar items -->
                        <li class="nav-item">
                            <a class="nav-link" href="#">Foodlist</a> <!-- TODO -->
                        </li>
                        
                        
                        <!-- Whitespace & Separator -->
                        <span class="navbar-text">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        
                                            <!-- Navigation bar items -->
                        <li class="nav-item">
                            <a class="nav-link" href="#">Nutrition Menu</a> <!-- TODO -->
                        </li>
                        
                        
                        <!-- Whitespace & Separator -->
                        <span class="navbar-text">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
    
                        <!-- Navigation bar dropdown menu -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                My Fridge
                            </a>
                            <!-- Dropdown menu items -->
                            <div class="dropdown-menu">
                                <a class="dropdown-item">Fridge 1</a> <!-- TODO --> <!-- My food list -->
                                <a class="dropdown-item">Fridge 2</a> <!-- TODO --><!-- Settings -->
                                <a class="dropdown-item">Fridge 3</a> <!-- TODO --><!-- Log out -->
                            </div>
                        </li>
                        
                        <!-- Not Login content -->
                        <!-- Whitespace & Separator -->
                            <span class="navbar-text">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                        
                          <div class="search-container">
                              <form action="/action_page.php">
                                  <input type="text" placeholder="Search your food" name="search">
                                  <button type="submit"><i class="fa fa-search"></i></button>
                              </form>
                            </div>
                        
                    </ul>
                </div>
            </nav>
    
       
        
        <div id="main">
        <h1>Frigi-Track</h1>
        <p>Store expiration date of your food and have notifications sent to you.</p>
    
       
        <form>
            <div class="form-group">
              <label for="name"><h2>Food Name</h2></label>
              <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Food">
               </div>
            <div class="form-group">
              <label for="datein"><h2>Expiration Date</h2></label>
              <input type="date" class="form-control" id="datein" placeholder="">
            </div>
            <div class="form-check">
              <input id='opened' type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Already Opened</label>
            </div>
            <button id='add' class="btn btn-info">Add</button>
            <button id='todata' class="btn btn-info">See Expiration Dates</button>
            <button id='scanbtn' class="btn btn-info">Scan/Stop</button>
            <div id="scanner-container"></div>
        </form>
    
        <img id="coverphoto" src="coverphoto.jpg">  

    
    
        <div id='bc'></div>

        
    </div>
    
    <footer>
    <div class="container-fluid">
    <p><span style='color:black'>Frigi</span>--Track</p>
    </div>
</footer>`))
}



let _scannerIsRunning = false;

async function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 400,
                height: 300,
            },
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
            ],
        },

    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
        // Set flag to is running
        _scannerIsRunning = true;
    });


    Quagga.onDetected(function (result) {
        // console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        bdata.push(result.codeResult.code);
        let bcode = result.codeResult.code;
        if (bdata.length > 15) {
            bcode = mode(bdata);
            Quagga.stop();
            _scannerIsRunning = false;
            bdata = [];
            console.log(bcode);
            barcodes.push({
                "barcode": bcode
            });
            $("#bc").empty().append("<h4> barcode: " + bcode + "</h4>");
        }




    });
}


//ref https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length -
        arr.filter(v => v === b).length
    ).pop();
}




// Start/stop scanner
$("body").on("click", "#scanbtn", async (e)=>{
    e.preventDefault();

    if (_scannerIsRunning) {
        // console.log('close');
        await Quagga.stop();
        _scannerIsRunning = false;
    } else {

        if ($('iframe')!=null){
            $('#main').append('<iframe src="https://www.barcodelookup.com/"></iframe>');
        }
       
        await startScanner();
    }

    console.log('close');
    console.log(_scannerIsRunning);
});

//https://ourcodeworld.com/articles/read/460/how-to-create-a-live-barcode-scanner-using-the-webcam-in-javascript