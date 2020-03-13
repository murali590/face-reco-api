const express=require('express');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors())
const database={
	users:[
	{
		id:'123',
		name:'john',
		email:'john@gmail.com',
		password:'cookies',
		entries:0,
		joined:new Date()
	},
	{
		id:'124',
		name:'sally',
		email:'sally@gmail.com',
		password:'bannans',
		entries:0,
		joined:new Date()
	}
	],
	login:[
	{
      id:'987',
      hash:'',
      email:'john@gmail.com'
	}
  ]
}

app.get("/",(req,res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{
	/*bcrypt.compare("apples", '$2a$10$Au2hdMjinakJmzeWJr1t5emnAkDaRwTjAVfgYsq.RL6czSeHoVkzG', function(err, res) {
        console.log("first guess",res)    
});
bcrypt.compare("veggies", '$2a$10$Au2hdMjinakJmzeWJr1t5emnAkDaRwTjAVfgYsq.RL6czSeHoVkzG', function(err, res) {
       console.log('second guess',res)
});*/

	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
	{
		res.json("sucess");
	}else{
	res.status(400).send("signing in error");
    }
})

app.post('/register',(req,res)=>{
	const {email,name,password} = req.body;
	/*bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});*/
	database.users.push(
		{
		id:'125',
		name:name,
		email:email,
		password:password,
		entries:0,
		joined:new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
	const {id} = req.params;
	let found=false;
	database.users.forEach(user =>{
		if(user.id === id){
		found = true
		return res.json(user);
		}
	})
 if(!found){
 	res.status(404).json('not found');
 }
})

app.put('/image',(req,res)=>{
	const {id} = req.body;
	let found=false;
	database.users.forEach(user =>{
		if(user.id === id){
		found = true;
		user.entries++;
		return res.json(user.entries);
		}
	})
 if(!found){
 	res.status(404).json('not found');
 }
})
app.listen(3007,()=>{
	console.log('app is running on port 3007')
})



