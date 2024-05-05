import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Map "mo:base/HashMap";
import Error "mo:base/Error";
import List "mo:base/List";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";

actor university {
  private stable var mapEntries : [(Text, University)] = [];
  var map = Map.HashMap<Text, University>(0, Text.equal, Text.hash);

  private stable var userEntries : [(Text, Student)] = [];
  var user = Map.HashMap<Text, Student>(0, Text.equal, Text.hash);

  private stable var apiEnteries : [(Text, API)] = [];
  var api = Map.HashMap<Text, API>(0, Text.equal, Text.hash);

  type Student = {
    nationalID : Text;
    password : Text;
    uniqueID : Text;
  };

  public func CreateStudentData(
    nationalID : Text,
    password : Text,
    uniqueID : Text,
  ) : async Text {

    let studentData : Student = {
      nationalID = nationalID;
      password = password;
      uniqueID = uniqueID;
    };
    if (user.get(nationalID) == null) {
      user.put(nationalID, studentData);
      return "Success";
    } else {
      return "Faild: Data Already Exits";
    };

  };

  type API = {
    api_url : Text;
    description : Text;
    duration : Text;
    university : Text;
    country: Text;
    gpaScale: Text;
  };

  public func CreateAPI(
    api_url : Text,
    description : Text,
    duration : Text,
    university : Text,
    country: Text,
    gpaScale: Text
  ) : async Text {

    let API_URL : API = {
      api_url = api_url;
      description = description;
      duration = duration;
      university = university;
      country = country;
      gpaScale = gpaScale;
    };
    if (user.get(api_url) == null) {
      api.put(api_url, API_URL);
      return "Success";
    } else {
      return "Faild: Data Already Exits";
    };

  };

  type Course = {
    course_cod : Text;
    course_credit : Text;
    course_id : Text;
    course_name : Text;
    letter_grade : Text;
    points : Text;
    term_id : Text;
    class_nbr: Text;
  };

  type Term = {
    courses : [Course];
    cumulative_attempted_hours : Text;
    cumulative_earned_hours : Text;
    cumulative_gpa : Text;
    cumulative_gpa_hours : Text;
    cumulative_points : Text;
    program : Text;
    semester_attempted_hours : Text;
    semester_earned_hours : Text;
    semester_gpa : Text;
    semester_gpa_hour : Text;
    semester_points : Text;
    status : Text;
    student_id : Text;
    term_description : Text;
    term_id : Text; // Assuming you have a term ID field'
    student_term_id: Text;
  };
  type University = {
    mergedID : Text;
    studentName : Text;
    studentID : Text;
    major : Text;
    studentStatus : Text;
    nationalID : Text;
    college : Text;
    gpaScale : Text;
    universityName : Text;
    startDate : Text;
    endDate : Text;
    description : Text;
    transcriptID : Text;
    term : [Term];
  };

  public func CreateUniversityInstance(
    mergedID : Text,
    studentName : Text,
    studentID1 : Text,
    major : Text,
    studentStatus : Text,
    nationalID : Text,
    college : Text,
    gpaScale : Text,
    universityName : Text,
    startDate : Text,
    endDate : Text,
    description : Text,
    transcriptID : Text,
    term : [Term],
  ) : async Text {

    let uniData : University = {
      mergedID = mergedID;
      studentName = studentName;
      studentID = studentID1;
      major = major;
      studentStatus = studentStatus;
      nationalID = nationalID;
      college = college;
      gpaScale = gpaScale;
      universityName = universityName;
      startDate = startDate;
      endDate = endDate;
      description = description;
      transcriptID = transcriptID;
      term = term;
    };
    // if (map.get(mergedID) == null) {
      map.put(mergedID, uniData);
      return "Success";
    // } else {
    //   return "Faild: Data Already Exits";
    // };

  };
  public query func QueryUniversity(id : Text) : async ?University {
    map.get(id);
  };

  public query func QueryStudent(password : Text) : async ?Student {
    user.get(password);
  };

  public query func QueryAPI(api_url : Text) : async ?API {
    api.get(api_url);
  };

  public query func QueryALLAPI() : async [API] {
    // Explicitly specify the type of the key-value pair in the lambda function parameter
    let apis : [API] = Array.map(
      Iter.toArray(api.entries()),
      func(pair : (Text, API)) : API {
        return pair.1; // Return the value part of the pair, which is the API data
      },
    );
    return apis;
  };

  system func preupgrade() {
    mapEntries := Iter.toArray(map.entries());
    userEntries := Iter.toArray(user.entries());
  };
  system func postupgrade() {
    map := HashMap.fromIter<Text, University>(mapEntries.vals(), 1, Text.equal, Text.hash);
    user := HashMap.fromIter<Text, Student>(userEntries.vals(), 1, Text.equal, Text.hash);
  };

};
