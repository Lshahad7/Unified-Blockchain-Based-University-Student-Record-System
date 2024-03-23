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

  type Course = {
    course_cod : Text;
    course_credit : Nat;
    course_id : Nat;
    course_name : Text;
    letter_grade : Text;
    points : Nat;
    term_id : Nat;
  };

  type Term = {
    courses : [Course];
    cumulative_attempted_hours : Nat;
    cumulative_earned_hours : Nat;
    cumulative_gpa : Nat;
    cumulative_gpa_hours : Nat;
    cumulative_points : Nat;
    program : Text;
    semester_attempted_hours : Nat;
    semester_earned_hours : Nat;
    semester_gpa : Nat;
    semester_gpa_hour : Nat;
    semester_points : Nat;
    status : Nat;
    student_id : Nat;
    term_description : Text;
    term_id : Nat; 
  };
  type University = {
    mergedID : Text;
    studentName : Text;
    studentID : Nat;
    major : Text;
    studentStatus : Nat;
    nationalID : Text;
    college : Text;
    gpaScale : Text;
    universityName: Text;
    startDate: Text;
    endDate: Text;
    description: Text;
    transcriptID: Text;
    term : [Term];
  };

  public func CreateUniversityInstance(
    mergedID : Text,
    studentName : Text,
    studentID1 : Nat,
    major : Text,
    studentStatus : Nat,
    nationalID : Text,
    college : Text,
    gpaScale : Text,
    universityName: Text,
    startDate: Text,
    endDate: Text,
    description: Text,
    transcriptID: Text,
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
    if (map.get(mergedID) == null) {
      map.put(mergedID, uniData);
      return "Success";
    } else {
      return "Faild: Data Already Exits";
    };

  };
  public query func QueryUniversity(id : Text) : async ?University {
    map.get(id);
  };

  public query func QueryStudent(password : Text) : async ?Student {
    user.get(password);
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

