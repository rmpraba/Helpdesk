var express    = require("express");
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'admin',
   database : 'transport'
 });
var bodyParser = require('body-parser');
 var app = express();

app.use(express.static('app'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
   res.sendFile("app/index.html" );
})
//select the username and password from login table
app.post('/login-card',  urlencodedParser,function (req, res)
{

	var username={"username":req.query.username};
    var password={"password":req.query.password};
       connection.query('SELECT role_name  from role where id=(select role_id from employee where ? and ? )',[username,password],
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
      	//console.log(rows);
			res.status(200).json({'returnval': rows});
		}
		else
		{
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
	});

//select the route

app.post('/getroute' ,  urlencodedParser,function (req, res)
{	
	    connection.query('select route_name from route',
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
				//console.log(rows);
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});



app.post('/getroutedetail' ,  urlencodedParser,function (req, res)
{
	var routename={"route_name":req.query.routename};
	var trip={"trip":req.query.tripnos};
	//console.log('in server...');
	//console.log('hello route'+routename);
	//console.log('hello trip...'+trip);
	connection.query('select * from point where route_id=(select id from route where ?) and ?',[routename,trip],
   	function(err, rows){
		if(!err){
			if(rows.length>0){
				//console.log(rows);
				res.status(200).json({'returnval': rows});
			} else {
				res.status(200).json({'returnval': 'invalid'});
			}
		} else{
				console.log('No data Fetched'+err);
			}
		});
});


app.post('/insertpoint' ,  urlencodedParser,function (req, res)
{
		
		var rouname={"id":req.query.id,"point_name":req.query.points,"route_id":req.query.routes,"trip":req.query.trip,"pickup_time":req.query.pick,"drop_time":req.query.drop};
		//console.log('in server...'+routename);
		//console.log(rouname);
	    connection.query('insert into point set ?',[rouname],
       	function(err, rows)
       	{
		if(!err)
		{
			console.log('inserted');
			res.status(200).json({'returnval': 'success'});
		}
		else
		{
			console.log("error");
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
		
	
});
	});


app.post('/routeid' ,  urlencodedParser,function (req, res)
{
		
		 var routename={"route_name":req.query.routename};
	    connection.query('select * from route where ?',[routename], 
       	function(err, rows)
       	{
		if(!err)
		{
			if(rows.length>0)
			{
				console.log(rows);
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
		
		
	
});
	});


app.post('/gradediscount' ,  urlencodedParser,function (req, res)
{
		
		 var gradename={"grade_type":req.query.grade};
	    connection.query('select discount_percent from md_discount where ?',[gradename], 
       	function(err, rows)
       	{
		if(!err)
		{
			if(rows.length>0)
			{
				console.log(rows);
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
		
		
	
});
	});
app.post('/sequence' ,  urlencodedParser,function (req, res)
{
	
	    connection.query('select count(id) as count from point',
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
				
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});

app.post('/getzone' ,  urlencodedParser,function (req, res)
{
	    connection.query('select * from md_zone',
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});



app.post('/getfee' ,  urlencodedParser,function (req, res)
{
	var zone={"zone_name":req.query.zone};
	    connection.query('select fees from md_distance where id=(select distance_id from md_zone where ? )',[zone],
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});


app.post('/addcalc' ,  urlencodedParser,function (req, res)
{
	var gradeid={"grade_id":req.query.id};
	    connection.query('select * from md_discount where ? ',[gradeid],
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
				console.log(rows);
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});



app.post('/setzone' ,  urlencodedParser,function (req, res)
{
	var stdzone={"student_id":req.query.studid,"zone_id":req.query.zone,"installment_1":0,"installment_2":0,"fees":req.query.fee};
	    connection.query('insert into student_fee set ? ',[stdzone],
       	function(err, rows)
       	{
      	
		
			if(!err)
			{
			res.status(200).json({'returnval': 'success'});
			}
			else
			{
				console.log(err);
			res.status(200).json({'returnval': 'invalid'});
			}
		
});
	});

app.post('/getstd' ,  urlencodedParser,function (req, res)
{	
	    connection.query('select distinct class from class_details ',
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});



app.post('/getsec' ,  urlencodedParser,function (req, res)
{
		var std={"class":req.query.std};
	    connection.query('select section from class_details where ?',[std],
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});



app.post('/getname' ,  urlencodedParser,function (req, res)
{
		var std={"class":req.query.std};
		var sec={"section":req.query.sec};
		var trans_req={"transport_required":"yes"};
	    connection.query('select student_name from student_details where class_id=(select id from class_details where ? and ?) and? ',[std,sec,trans_req],
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
				
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});


app.post('/getstudetail' ,  urlencodedParser,function (req, res)
{
		var id={"student_name":req.query.studid};
	    connection.query('select * from student_details where ?',[id],
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
				
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});



app.post('/getroute' ,  urlencodedParser,function (req, res)
{	
	    connection.query('select route_name from md_route',
       	function(err, rows)
       	{
      	if(!err)
		{
			if(rows.length>0)
			{
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
});
	});

app.post('/report-card',  urlencodedParser,function (req, res)
{

	var stu_id={"id":req.query.studid};
	var class_id={"class_id":req.query.studid};
	var stu_name={"student_name":req.query.studid};
       connection.query('SELECT s.id,s.student_name,s.class_id,s.photo,s.dob,s.transport_required,z.zone_id,z.fees ,z.installment_1,z.installment_2 as total, z.fees-z.installment_1+z.installment_2 as due,(select point_name from point where id=(select pickup_point from student_point where student_id=s.id)) as pick,(select point_name from point where id=(select drop_point from student_point where student_id=s.id)) as drop1  from student_details s left join student_fee z on s.id=z.student_id where id in(select id from student_details where ? or ? or ? )',[stu_id,class_id,stu_name],
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
console.log(rows);
			res.status(200).json({'returnval': rows});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
	});





app.post('/selectclass',  urlencodedParser,function (req, res)
{

       connection.query('SELECT distinct school_type from student_details',
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
			res.status(200).json({'returnval': rows});
		}
		else
		{
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
	});
app.post('/classpick',  urlencodedParser,function (req, res)
{
	var class_id={"school_type":req.query.classes};
	var trans_req={"transport_required":"yes"};
	//console.log('in server...');
       connection.query('SELECT id, student_name from student_details where ? and ?',[class_id,trans_req],
       	function(err, rows)
       	{ 
		if(!err)
		{
		if(rows.length>0)
		{
			//console.log(rows);
			res.status(200).json({'returnval': rows});
		}
		else
		{
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
});

app.post('/pickpoints',  urlencodedParser,function (req, res)
{
		var route_id={"route_id":req.query.routept};
		
       connection.query('SELECT id, point_name from point where ?',[route_id],
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
			res.status(200).json({'returnval': rows});
		}
		else
		{
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
});
app.post('/routedroppoint',  urlencodedParser,function (req, res)
{
		var route_id={"route_id":req.query.routedroppt};

       connection.query('SELECT id, point_name from point where ?',[route_id],
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
			res.status(200).json({'returnval': rows});
		}
		else
		{
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
});
app.post('/routepoint',  urlencodedParser,function (req, res)
{
       connection.query('SELECT * from route', 
       	function(err, rows) 
       	{
		if(!err)
		{
		if(rows.length>0)
		{
			 
			res.status(200).json({'returnval': rows});
			
		}
		else
		{
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
});

app.post('/submiturl',  urlencodedParser,function (req, res)
{
		var mappointtostudent={"student_id":req.query.studentid,"school_type":req.query.class_id,"pickup_route_id":req.query.pickroute,"pickup_point":req.query.pickpoint,"drop_route_id":req.query.droproute, "drop_point":req.query.droppoint};
		//console.log(mappointtostudent);
	    connection.query('insert into student_point set ?',[mappointtostudent],
       	function(err, rows) 
       	{
		if(!err)
		{
			res.status(200).json({'returnval': 'success'});
		}
		else
		{
			//console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	
});    
	});


app.post('/gettrip' ,  urlencodedParser,function (req, res)
{
		
		 var routen={"route_name":req.query.triproute};
		 //console.log('in server...');
		 //console.log(routen);
	    connection.query('select distinct trip from point where route_id=(select id from route where ?)',[routen],
       	function(err, rows)
       	{
		if(!err)
		{
			if(rows.length>0)
			{
				//console.log(rows);
			res.status(200).json({'returnval': rows});
			}
			else
			{
			res.status(200).json({'returnval': 'invalid'});
			}
		}
		else
		{
			console.log('No data Fetched'+err);
		}
		
	
});
	});
app.post('/cancellation',  urlencodedParser,function (req, res)
{

	var stu_id={"id":req.query.studid};
	var class_id={"class_id":req.query.studid};
	var stu_name={"student_name":req.query.studid};
       connection.query('SELECT s.id,s.student_name,s.class_id,s.school_type,s.photo,s.dob,s.transport_required,z.zone_id,z.fees ,z.installment_1,z.installment_2 as total, z.fees-z.installment_1+z.installment_2 as due,(select point_name from point where id=(select pickup_point from student_point where student_id=s.id)) as pick,(select point_name from point where id=(select drop_point from student_point where student_id=s.id)) as drop1  from student_details s left join student_fee z on s.id=z.student_id where id in(select id from student_details where ? or ? or ? )',[stu_id,class_id,stu_name],
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
			res.status(200).json({'returnval': rows});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
});
app.post('/cancel',  urlencodedParser,function (req, res){
	var school_type={"school_type":req.query.school_type};
	var student_id={"student_id":req.query.student_id};
	var end_transport=req.query.end_date;

	var queryy="SELECT DATEDIFF(STR_TO_DATE('"+end_transport+"', '%m/%d/%Y'),start_date) AS Days_used, DATEDIFF(end_date,start_date) AS Total_days, fees FROM transport_details join student_fee where ? and  ?";
    connection.query(queryy,[end_transport,school_type, student_id],
		function(err, rows){
       	if(err){
       		console.log(err);
       	}
			if(!err){
				if(rows.length>0){
					console.log(JSON.stringify(rows));
					res.status(200).json({'returnval': rows});
				} else {
					console.log(err);
					res.status(200).json({'returnval': 'invalid'});
				}
			}
		});
});
app.post('/proceedcancel',  urlencodedParser,function (req, res){
	var collection={"student_id":req.query.student_id,"student_name":req.query.student_name,"months_used":req.query.months_used,"refund_amount":req.query.refund_amount};
    connection.query('insert into cancellation set ?',[collection],
	function(err, rows){
		if(!err){
			if(rows.length>0){
				res.status(200).json({'returnval': rows});
			} else {
				console.log(err);
				res.status(200).json({'returnval': 'invalid'});
			}
		}
	});
	});
app.post('/transportrequiredstatus',  urlencodedParser,function (req, res)
{
	var student_id = {"id":req.query.student_id};
	var transport_required = {"transport_required":'no'};
    connection.query('update student_details set ? where ? ',[transport_required,student_id],
       	function(err, rows)
       	{
       	if(err){
       		console.log(err);
       	}
		if(!err)
		{
		if(rows.length>0)
		{
			res.status(200).json({'returnval': rows});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
	});


app.post('/reportfee-card',  urlencodedParser,function (req, res)
{

	var stu_id={"id":req.query.studid};
	var class_id={"class_id":req.query.studid};
	var stu_name={"student_name":req.query.studid};
       connection.query('SELECT s.id,s.student_name,s.class_id,s.photo,s.dob,s.transport_required,z.zone_id,z.fees ,z.installment_1,z.installment_2,z.installment_1+z.installment_2 as total, z.fees-(z.installment_1+z.installment_2) as due,z.fees/2 as install,z.installment_1Date,z.installment_2Date,z.modeofpayment1,z.modeofpayment2,(select point_name from point where id=(select pickup_point from student_point where student_id=s.id)) as pick,(select point_name from point where id=(select drop_point from student_point where student_id=s.id)) as drop1  from student_details s left join student_fee z on s.id=z.student_id where id in(select id from student_details where ? or ? or ? )',[stu_id,class_id,stu_name],
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
			res.status(200).json({'returnval': rows});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
	});




app.post('/getnameofstu-card',  urlencodedParser,function (req, res)
{

       connection.query('SELECT student_name from student_details',
       	function(err, rows)
       	{
		if(!err)
		{
		if(rows.length>0)
		{
			res.status(200).json({'returnval': rows});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	}
});
	});


app.post('/payfee-card',  urlencodedParser,function (req, res)
{
		var d = new Date();
		var studid={"student_id":req.query.studid};
		var mode={"modeofpayment1":req.query.paytype};
		var install1={"installment_1":req.query.installfee};
		var install1date={"installment_1Date":d}
	    connection.query('update  student_fee set ?,?,? where ?',[mode,install1,install1date,studid],
       	function(err, rows) 
       	{
		if(!err)
		{
			res.status(200).json({'returnval': 'success'});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	
});    
	});
app.post('/chequedetails',  urlencodedParser,function (req, res)
{
		
		var studid={"student_id":req.query.studid,"name":req.query.name,"cheque_no":req.query.chequenum,"bank_name":req.query.bankname,"cheque_date":req.query.chequedate};
	    connection.query('insert into cheque_details  set ?',[studid],
       	function(err, rows) 
       	{
		if(!err)
		{
			res.status(200).json({'returnval': 'success'});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	
});    
	});



app.post('/payfee2-card',  urlencodedParser,function (req, res)
{
	var d = new Date();
		
		var studid={"student_id":req.query.studid};
		var mode={"modeofpayment2":req.query.paytype};
		var install1={"installment_2":req.query.installfee};
		var install1date={"installment_2Date":d}
	    connection.query('update  student_fee set ?,?,? where ?',[mode,install1,install1date,studid],
       	function(err, rows) 
       	{
		if(!err)
		{
			res.status(200).json({'returnval': 'success'});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	
});    
	});
app.post('/chequedetails2',  urlencodedParser,function (req, res)
{
		
		var studid={"student_id":req.query.studid,"name":req.query.name,"cheque_no":req.query.chequenum,"bank_name":req.query.bankname,"cheque_date":req.query.chequedate};
	    connection.query('insert into cheque_details  set ?',[studid],
       	function(err, rows) 
       	{
		if(!err)
		{
			res.status(200).json({'returnval': 'success'});
		}
		else
		{
			console.log(err);
			res.status(200).json({'returnval': 'invalid'});
		}
	
});    
	});

function setvalue()
{
	console.log("calling setvalue.....");
}

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})