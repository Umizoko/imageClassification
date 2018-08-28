// chart bar
var myChart;
$(function () {
    myChart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Image classification for MobileNet'
        },
        yAxis: {
            title: {
                text: 'Confidence'
            }
        },
    });
});

// Get img element: show select image 
const image = document.getElementById('image');

// Initialize the Image Classifier method with MoblieNet
const classifer = ml5.imageClassifier('MobileNet', modelLoaded);

// When the model is Loaded
function modelLoaded() {
    console.log('Model Loaded.');
}

// Make a prediction with a selected image
var imagePredict = function () {
    classifer.predict(image, function (err, results) {

        // Update chart
        var options = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'bar'
            },
            title: {
                text: 'Image classification for MobileNet'
            },
            xAxis: {
                categories: [results[0].className, results[1].className, results[2].className]
            },
            yAxis: {
                title: {
                    text: 'Confidence'
                },
                max: 1,
            },
            series: [{
                name: 'probability',
                data: [
                    results[0].probability,
                    results[1].probability,
                    results[2].probability
                ]
            }],
        });
    });
}

// Predict first
imagePredict();

// Select image animation
var selectImageClassToggle = function (curr) {
    pre_item.firstElementChild.classList.toggle('image_selected');
    curr.firstElementChild.classList.toggle('image_selected');
    pre_item = curr;
}

// Select image click
function selectImageClick() {
    // Show select image
    image.src = this.firstElementChild.getAttribute('src');
    // Predict image
    imagePredict();
    // Toggle css
    selectImageClassToggle(this);
}

// Event handler
// Click image 1
const item1 = document.getElementById("item1");
var pre_item = item1;
item1.addEventListener('click', selectImageClick, false);

// Click image 2
const item2 = document.getElementById("item2");
item2.addEventListener('click', selectImageClick, false);

// Click image 3
const item3 = document.getElementById("item3");
item3.addEventListener('click', selectImageClick, false);

// Drop image 4
const item4 = document.getElementById('item4');
const file = document.getElementById('file');
file.onchange = function () {
    // Reading File
    var reader = new FileReader();
    reader.addEventListener('loadend', () => {
        image.src = reader.result;
        imagePredict();
    });
    reader.readAsDataURL(file.files[0]);

    selectImageClassToggle(item4);
}

