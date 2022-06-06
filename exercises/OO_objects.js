// eslint-disable-next-line max-lines-per-function
function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

let helloVictor = createGreeter('Victor');
helloVictor.greet('morning');
//Good Morning Victor


let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    let discountedPrice = this.price - discount;

    return discountedPrice;
  },
};

console.log(item.discount(20)); //40
console.log(item.discount(50)); //25
console.log(item.discount(25)); //37.5

function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  let keys = Object.keys(obj1);
  if (keys.length !== Object.keys(obj2).length) {
    return false; 
  }

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (!obj2[key]) return false;
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false



// eslint-disable-next-line max-lines-per-function
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${year} year student`);
    },
    listCourses() {
      return this.courses;
    },
    addCourse(courseObj) {
      this.courses.push(courseObj);
    },
    addNote(code, message) {
      let course = this.courses.filter(course => {
        return course.code === code;
      })[0];

      if (course) {
        if (course.note) {
          course.note += `: ${message}`;
        } else {
          course.note = message;
        }
      }
      // let courseName = '';
      // this.courses.forEach(course => {
      //   if (course.code === code) {
      //     courseName = course.name;
      //   }
      // })
      // this.notes[code] = `${courseName}: ${message}`;

    },
    updateNote(code, message) {
      let course = this.courses.filter(course => {
        return course.code === code;
      })[0];

      if (course) {
        course.note = message;
      }
    },
    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name} : ${course.note}`);
        }
      });
    }


  };
}


let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"


// eslint-disable-next-line max-lines-per-function
function createSchool() {
  return {
    students: {},
    addStudent(name, year) {
      if (['1st', '2nd', '3rd', '4th','5th'].includes(year)) {
        let newStudent = new createStudent(name, year);
        this.students[name] = newStudent;
        return newStudent;
      } else {
        console.log("Invalid Year");
      }
    },
    enrollStudent(student, course) {
      this.students[student].addCourse(course);
    },
    addGrade(student, courseCode, grade) {
      let studentObj = this.students[student];
      let course = studentObj.courses.filter(course => {
        return course.code === courseCode;
      });
      course.grade = grade;
    },
    getReportCard(student) {
      let studentObj = this.students[student];
      studentObj.courses.forEach(course => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: in progress`);
        }
      });

    },
    courseReport(courseName) {
      let grades = [];
      console.log(`=${courseName} Grades=`);
      for (let student in this.students) {
        let course = student.courses.filter(course => {
          return course.name === courseName;
        });
        if (course && course.grade) {
          grades.push(course.grade);
          console.log(`${student.name}: ${course.grade}`);
        }
      }
      console.log(`--- \nCourse Average: ${(grades.reduce((sum, current) => sum + current, 0)) / grades.length}`);
    }

  };
}

