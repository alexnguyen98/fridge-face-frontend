import 'dart:io';
import 'dart:math';
import 'dart:typed_data';
import 'package:camera/camera.dart';
import 'package:fridge_face_v1/db.dart';
import 'package:fridge_face_v1/image_converter.dart';
import 'package:google_ml_kit/google_ml_kit.dart';
import 'package:tflite_flutter/tflite_flutter.dart';
import 'package:image/image.dart' as imglib;

class FaceNet {
  static final FaceNet _faceNet = FaceNet._internal();

  FaceNet._internal();

  factory FaceNet() {
    return _faceNet;
  }

  Database db = Database();
  late Interpreter _interpreter;
  static const double THRESHOLD = 1.0;

  Future<void> loadModel() async {
    Delegate delegate;
    try {
      if (Platform.isIOS) {
        delegate = GpuDelegate(
          options: GpuDelegateOptions(true, TFLGpuDelegateWaitType.active),
        );
        var interpreterOptions = InterpreterOptions()..addDelegate(delegate);
        _interpreter = await Interpreter.fromAsset('mobilefacenet.tflite',
            options: interpreterOptions);
        print('model loaded successfully');
      }
    } catch (err) {
      print(err);
    }
  }

  List setCurrentPrediction(CameraImage image, Face face) {
    List input = _preProcess(image, face);

    /// then reshapes input and ouput to model format 🧑‍🔧
    input = input.reshape([1, 112, 112, 3]);
    List output = List.generate(1, (index) => List.filled(192, 0));

    /// runs and transforms the data 🤖
    this._interpreter.run(input, output);
    output = output.reshape([192]);

    return List.from(output);
  }

  /// _preProess: crops the image to be more easy
  /// to detect and transforms it to model input.
  /// [cameraImage]: current image
  /// [face]: face detected
  List _preProcess(CameraImage image, Face face) {
    // crops the face 💇
    imglib.Image croppedImage = _cropFace(image, face);
    imglib.Image img = imglib.copyResizeCropSquare(croppedImage, 112);

    // transforms the cropped face to array data
    Float32List imageAsList = _imageToByteListFloat32(img);
    return imageAsList;
  }

  /// crops the face from the image 💇
  /// [cameraImage]: current image
  /// [face]: face detected
  imglib.Image _cropFace(CameraImage image, Face faceDetected) {
    imglib.Image convertedImage = _convertCameraImage(image);
    double x = faceDetected.boundingBox.left - 10.0;
    double y = faceDetected.boundingBox.top - 10.0;
    double w = faceDetected.boundingBox.width + 10.0;
    double h = faceDetected.boundingBox.height + 10.0;
    return imglib.copyCrop(
        convertedImage, x.round(), y.round(), w.round(), h.round());
  }

  /// converts ___CameraImage___ type to ___Image___ type
  /// [image]: image to be converted
  imglib.Image _convertCameraImage(CameraImage image) {
    var img = convertToImage(image);
    var img1 = imglib.copyRotate(img, -90);
    return img1;
  }

  Float32List _imageToByteListFloat32(imglib.Image image) {
    /// input size = 112
    var convertedBytes = Float32List(1 * 112 * 112 * 3);
    var buffer = Float32List.view(convertedBytes.buffer);
    int pixelIndex = 0;

    for (var i = 0; i < 112; i++) {
      for (var j = 0; j < 112; j++) {
        var pixel = image.getPixel(j, i);

        /// mean: 128
        /// std: 128
        buffer[pixelIndex++] = (imglib.getRed(pixel) - 128) / 128;
        buffer[pixelIndex++] = (imglib.getGreen(pixel) - 128) / 128;
        buffer[pixelIndex++] = (imglib.getBlue(pixel) - 128) / 128;
      }
    }
    return convertedBytes.buffer.asFloat32List();
  }

  Future<String> predictFace(List predictedData) async {
    List? data = await db.getData();
    double minDist = 999;
    double curDist = 0.0;

    if (data != null) {
      curDist = _euclideanDistance(data, predictedData);
      if (curDist <= THRESHOLD && curDist < minDist) {
        minDist = curDist;
        return "alex";
      }
    }

    return "nic";
  }

  double _euclideanDistance(List e1, List e2) {
    double sum = 0.0;
    for (int i = 0; i < e1.length; i++) {
      sum += pow((e1[i] - e2[i]), 2);
    }
    return sqrt(sum);
  }
}
