import 'dart:io';
import 'package:flutter/material.dart';
import 'package:fridge_face_v1/barcode_scanner_view.dart';
import 'package:fridge_face_v1/db.dart';
import 'package:fridge_face_v1/face_detector_view.dart';
import 'package:fridge_face_v1/facenet.dart';
import 'package:fridge_face_v1/temporary_signup.dart';

class HomeView extends StatefulWidget {
  @override
  _HomeViewState createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  FaceNet facenet = FaceNet();
  Database db = Database();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _startup();
  }

  void _startup() async {
    await facenet.loadModel();
    await db.loadDatabase();

    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? Center(
            child: CircularProgressIndicator(),
          )
        : Scaffold(
            appBar: AppBar(
              title: Text('Google ML Kit Demo App'),
              centerTitle: true,
              elevation: 0,
            ),
            body: SafeArea(
              child: Center(
                child: SingleChildScrollView(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    child: Column(
                      children: [
                        CustomCard(
                          'Face Detector - Sign in',
                          FaceDetectorView(),
                          featureCompleted: true,
                        ),
                        CustomCard(
                          'Face Detector - Sign up',
                          TemporarySignupView(),
                          featureCompleted: true,
                        ),
                        CustomCard(
                          'Barcode Scanner',
                          BarcodeScannerView(),
                          featureCompleted: true,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          );
  }
}

class CustomCard extends StatelessWidget {
  final String _label;
  final Widget _viewPage;
  final bool featureCompleted;

  const CustomCard(this._label, this._viewPage,
      {this.featureCompleted = false});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      margin: EdgeInsets.only(bottom: 10),
      child: ListTile(
        tileColor: Theme.of(context).primaryColor,
        title: Text(
          _label,
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        onTap: () {
          if (Platform.isIOS && !featureCompleted) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: const Text(
                    'This feature has not been implemented for iOS yet')));
          } else
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => _viewPage));
        },
      ),
    );
  }
}
