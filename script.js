let data = [{
        "name": "apple",
        "expire": "2020-02-23",
        "opened": "false"
    },
    {
        "name": "banana",
        "expire": "2020-02-22",
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
let bdata=[];
let barcodes=[];
let alertcount = 0;
let intv;

$(document).ready(() => {
    //  intv=setInterval(check, 3000);
    check();

});

function check() {
    data2 = data.map((item) => {
        today = new Date();
        edate = parseDate(item.expire);
        //https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
        let oneday = oneDay = 24 * 60 * 60 * 1000;
        diffDays = Math.round(Math.abs((edate - today) / oneDay));
        item['days'] = diffDays;
        return item;
    })

    if (data2.filter(item => item.days <= 3).length > 0) {
        names = []
        exp = data2.filter(item => item.days <= 3);
        for (let i = 0; i < exp.length; i++) {
            names.push(data2[i].name);
        }
        Push.create("Your item " + names + " will expire under 3 days.")
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
        //https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
        let oneday = oneDay = 24 * 60 * 60 * 1000;
        diffDays = Math.round(Math.abs((edate - today) / oneDay));
        item['days'] = diffDays;
        return item;
    })


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
    $('body').empty().append(content);
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
        `    <div id="main">
        <h1>Expiration Check</h1>
        <p>Store expiration date of your food and have notifications sent to you.</p>
    
       
        <form>
            <div class="form-group">
              <label for="name">Food Name</label>
              <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Food">
              <small id="emailHelp" class="form-text text-muted">Input name of your food item</small>
            </div>
            <div class="form-group">
              <label for="datein">Expiration Date</label>
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
    
        <img id="coverphoto" src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?cs=srgb&dl=top-view-photo-of-food-dessert-1099680.jpg&fm=jpg"> 

    
    
        <div id='bc'></div>
    </div>`))
}

function cam() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            // Or '#yourElement' (optional)
            target: document.querySelector('#yourElement')
        },
        decoder: {
            readers: ["code_128_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.decodeSingle({
        decoder: {
            readers: ["code_128_reader"] // List of active readers
        },
        locate: true, // try to locate the barcode in the image
        // You can set the path to the image in your server
        // or using it's base64 data URI representation data:image/jpg;base64, + data
        src: '/barcode_image.jpg'
    }, function (result) {
        if (result.codeResult) {
            console.log("result", result.codeResult.code);
        } else {
            console.log("not detected");
        }
    });
}

var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment"
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
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },

    }, function (err) {
        if (err) {
            console.log(err);
            return
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {
                        x: 0,
                        y: 1
                    }, drawingCtx, {
                        color: "green",
                        lineWidth: 2
                    });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {
                    x: 0,
                    y: 1
                }, drawingCtx, {
                    color: "#00F",
                    lineWidth: 2
                });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {
                    x: 'x',
                    y: 'y'
                }, drawingCtx, {
                    color: 'red',
                    lineWidth: 3
                });
            }
        }
    });


    Quagga.onDetected(function (result) {
        // console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        bdata.push(result.codeResult.code);
         let bcode=result.codeResult.code;
        if (bdata.length>15){
            bcode=mode(bdata);
            Quagga.stop();
            _scannerIsRunning=false;
            bdata=[];
            console.log(bcode);
            barcodes.push({"barcode":bcode});
            $("#bc").empty().append("<h4> barcode: "+bcode+"</h4>");
        }
       
        
       

    });
}

// /0050428430989

function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}




// Start/stop scanner
document.getElementById("scanbtn").addEventListener("click", function (e) {
    e.preventDefault()
    if (_scannerIsRunning) {
        Quagga.stop();
        _scannerIsRunning=false;
    } else {
        $('#main').append('<iframe src="https://www.barcodelookup.com/"></iframe>');
        startScanner();
    }
}, false);

//https://ourcodeworld.com/articles/read/460/how-to-create-a-live-barcode-scanner-using-the-webcam-in-javascript