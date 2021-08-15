import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class Database {
  static final Database _database = Database._internal();

  factory Database() {
    return _database;
  }

  Database._internal();

  late SharedPreferences _preferences;

  Future<void> loadDatabase() async {
    _preferences = await SharedPreferences.getInstance();
  }

  Future<void> saveData(List modelData) async {
    _preferences.setString("alex", json.encode(modelData));
  }

  Future<List?> getData() async {
    final map = _preferences.getString("alex");
    if (map != null) {
      return json.decode(map) as List;
    }
    return null;
  }
}
