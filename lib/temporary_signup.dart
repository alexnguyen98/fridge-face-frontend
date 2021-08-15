import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:fridge_face_v1/db.dart';
import 'package:fridge_face_v1/facenet.dart';
import 'package:google_ml_kit/google_ml_kit.dart';
import 'camera_view.dart';
import 'face_detector_painter.dart';

class TemporarySignupView extends StatefulWidget {
  @override
  _TemporarySignupViewState createState() => _TemporarySignupViewState();
}

class _TemporarySignupViewState extends State<TemporarySignupView> {
  FaceDetector faceDetector = GoogleMlKit.vision.faceDetector(
      FaceDetectorOptions(
          enableTracking: true, mode: FaceDetectorMode.accurate));
  FaceNet facenet = FaceNet();
  Database db = Database();
  bool isBusy = false;
  bool _isRegistering = false;
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
      title: 'Signup',
      customPaint: customPaint,
      onImage: (inputImage, cameraImage) {
        processImage(inputImage, cameraImage);
      },
      onClick: () {
        setState(() {
          _isRegistering = true;
        });
      },
      initialDirection: CameraLensDirection.front,
    );
  }

  Future<void> processImage(
      InputImage inputImage, CameraImage cameraImage) async {
    if (isBusy) return;
    print("face detecting...");
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
      if (faces.length == 0 || !_isRegistering) return;
      predictFace(cameraImage, faces[0]);
    }
  }

  void predictFace(CameraImage cameraImage, Face face) async {
    if ((face.headEulerAngleY! > HEAD_THRESHOLD) ||
        (face.headEulerAngleY! < -HEAD_THRESHOLD)) return;
    if ((face.headEulerAngleZ! > HEAD_THRESHOLD) ||
        (face.headEulerAngleZ! < -HEAD_THRESHOLD)) return;
    if (face.leftEyeOpenProbability! < EYE_THRESHOLD) return;
    if (face.rightEyeOpenProbability! < EYE_THRESHOLD) return;
    List res = facenet.setCurrentPrediction(cameraImage, face);
    print(res);
    await db.saveData(res);
    print("registered!");
    Navigator.of(context).pop();
  }
}
