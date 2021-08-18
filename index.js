var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())               // <-- angularjs sends json data 
app.use(bodyParser.urlencoded({ extended: true }));

var Student = require('./modules/Student.js');  // our Student model

app.use(express.static('public'));       // serve static files


app.use('/showAll', function(req, res) {   // Retrieve all
                                             
    Student.find( function(err, students) {   
		 if (err) {
		     res.status(500).send(err);
		 }
		 else {
			 res.send(students);  
		 }
    });
})


// add student
app.post('/addStudent', function(req, res){    // Create a new student object
	var newStudent = new Student ({               
		sid: req.body.sid,     
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		major: req.body.major,
        midterm: 0,
        final: 0
	});

	newStudent.save( function(err) {       // save the new student
		if (err) {
		    res.status(500).send(err);
		}
		else {
		    res.send("Student successfully added.");  
		}
   }); 
});

// retrieve student for editing
app.get('/getOne', function(req, res) {     // Retrieve student using sid
    sid = req.query.sid
    Student.findOne( {sid: sid}, function(err, student) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(student);
        }
    });
});


// edit student
app.post('/updateStudent', function(req, res) {


    var update_sid = req.body.sid;    // get posted properties
    var updateMajor = req.body.major;
	var updateMidterm = req.body.midterm;
    var updateFinal = req.body.final;

    // updateMidterm = parseInt(updateMidterm);
    // updateFinal = parseInt(updateFinal);

    Student.findOne( {sid: update_sid}, function(err, student) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!student) {
		    res.send('No student with a student id of ' + update_sid);
		}
		else {
			student.major = updateMajor;
			student.midterm = updateMidterm;
            student.final = updateFinal;
            
			student.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
            }); 
		    res.send("Update successful");
	   }
    }); 
    
    //res.send(updateFinal);

});

app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
});