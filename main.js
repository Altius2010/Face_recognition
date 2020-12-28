Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '" />';
    })
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1oqLFl7Br/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function check() {
    var img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(2) + "%";
        document.getElementById("result_object_accuracy").innerHTML = document.getElementById("result_object_accuracy").innerHTML.replace(".", "");
        document.getElementById("result_object_accuracy").innerHTML.charAt(0)
        document.getElementById("result_object_accuracy").innerHTML.replace(".", "");

        if (document.getElementById("result_object_accuracy").innerHTML.length == 3) {
            document.getElementById("result_object_accuracy").innerHTML = document.getElementById("result_object_accuracy").innerHTML.charAt(0) + document.getElementById("result_object_accuracy").innerHTML.charAt(1) + "0" + "%";
        }
        if (document.getElementById("result_object_accuracy").innerHTML.charAt(0) == "0") {
            document.getElementById("result_object_accuracy").innerHTML = document.getElementById("result_object_accuracy").innerHTML.replace(document.getElementById("result_object_accuracy").innerHTML.charAt(0), "");
        }
    }
}