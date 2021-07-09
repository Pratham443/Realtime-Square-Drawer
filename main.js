var NoseX;
var NoseY;
var Difference;
var LeftWristX;
var RightWristX;

function preload() {

}

function setup() {
    canvas = createCanvas(550, 550);
    canvas.position(800, 125);
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(100, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    background("gray");

    fill("pink");
    stroke("pink");
    square(NoseX, NoseY, Difference);

    document.getElementById("square_side").innerHTML = "Width and Height of the square will be " + Difference;
}

function modelLoaded() {
    console.log("Posenet initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;
        console.log("Nose X = " + NoseX +" Nose Y = " + NoseY);
        LeftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        Difference = floor(LeftWristX - RightWristX);

        console.log("Left Wrist X = " + LeftWristX + " Right Wrist X = " + RightWristX + " Difference = " + Difference)
    }
}