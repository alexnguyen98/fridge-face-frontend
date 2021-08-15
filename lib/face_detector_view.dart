import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_ml_kit/google_ml_kit.dart';
import 'camera_view.dart';
import 'face_detector_painter.dart';

class FaceDetectorView extends StatefulWidget {
  @override
  _FaceDetectorViewState createState() => _FaceDetectorViewState();
}

class _FaceDetectorViewState extends State<FaceDetectorView> {
  FaceDetector faceDetector = GoogleMlKit.vision.faceDetector(
      FaceDetectorOptions(
          enableTracking: true, mode: FaceDetectorMode.accurate));
  bool isBusy = false;
  CustomPaint? customPaint;

  static const double HEAD_THRESHOLD = 5;
  static const double EYE_THRESHOLD = 0.5;

  @override
  void dispose() {
    faceDetector.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CameraView(
      title: 'Face Detector',
      customPaint: customPaint,
      onImage: (inputImage) {
        processImage(inputImage);
      },
      onClick: () {
        print("hello");
      },
      initialDirection: CameraLensDirection.front,
    );
  }

  Future<void> processImage(InputImage inputImage) async {
    if (isBusy) return;
    isBusy = true;
    final faces = await faceDetector.processImage(inputImage);
    if (inputImage.inputImageData?.size != null &&
        inputImage.inputImageData?.imageRotation != null) {
      final painter = FaceDetectorPainter(
          faces,
          inputImage.inputImageData!.size,
          inputImage.inputImageData!.imageRotation);
      customPaint = CustomPaint(painter: painter);
    } else {
      customPaint = null;
    }
    isBusy = false;
    if (mounted) {
      setState(() {});
      if (faces.length == 0) return;
      if ((faces[0].headEulerAngleY! > HEAD_THRESHOLD) ||
          (faces[0].headEulerAngleY! < -HEAD_THRESHOLD)) return;
      if ((faces[0].headEulerAngleZ! > HEAD_THRESHOLD) ||
          (faces[0].headEulerAngleZ! < -HEAD_THRESHOLD)) return;
      if (faces[0].leftEyeOpenProbability! < EYE_THRESHOLD) return;
      if (faces[0].rightEyeOpenProbability! < EYE_THRESHOLD) return;
      print("passed");
      isBusy = true;
    }
  }
}
