const express = require('express');
const app = express();//top-level function of express

const path = require('path');
const apiData = require('./plant.json');
const apiData1 = require('./people.json');
const apiData_cars = require('./cars.json');
const apiData_car_owner = require('./car_owner.json');

const port = 3000;

app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url} `);
  next();
})

//used to send a default message before routing
// app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.static('public'));//all files from public folder must be included
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/js', express.static(path.join(__dirname,'public/js')));
app.use('/css', express.static(path.join(__dirname,'public/css')));

// set the route for index.html
app.get('/', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// set the route for about.html
app.get('/about', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/about.html'));
});
//give access to apiData
app.get('/plant', (req,res,)=>{
  res.json(apiData);
});

//give access to apiData1
app.get('/people', (req,res,)=>{
  res.json(apiData1);
});

//give access to apiData_cars
app.get('/cars', (req,res,)=>{
  res.json(apiData_cars);
});

//give access to apiData_car_owner
app.get('/car_owner', (req,res,)=>{
  res.json(apiData_car_owner);
});

//plant.json
// app.get('/plant_family/pf=:plant_family', (req,res)=>{
//   const plantParam = req.params.plant_family;
//   if ((plantParam === 'Fabroniaceae') || (plantParam === 'Zosteraceae')){
//     let filteredArray = [];
//     for(let i = 0; i < apiData.length; i++) {
//       if (plantParam.toLowerCase() === apiData[i].plant_family.toLowerCase()) {
//         filteredArray.push(apiData[i]);
//       }
//     }
//     res.send(filteredArray);
//   } else {
//     res.end('Invalid Parameter');
//   }
// });

//People.json
// app.get('/gender/g=:gender', (req,res)=>{
//   const genderParam = req.params.gender;
//   if ((genderParam === 'male') || (genderParam === 'female')){
//     let filteredArray = [];
//     for(let i = 0; i < apiData1.length; i++) {
//       if (genderParam.toLowerCase() === apiData1[i].gender.toLowerCase()) {
//         filteredArray.push(apiData1[i]);
//       }
//     }
//     res.send(filteredArray);
//   } else {
//     res.end('Invalid Parameter');
//   }
// });

//Checking owner and car make if available
app.get('/carowners/first_name=:first_name/car_make=:car_make',(req,res)=>{
  const nameParam = req.params.first_name;
  const carParam = req.params.car_make; //retrieves the parameter value requested by the user
  // if ((modelParam === 'male') || (genderParam === 'female')){
    let ownersFilteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < apiData_cars.length; i++) {
      if ((nameParam.toLowerCase() === apiData_cars[i].first_name.toLowerCase()) && (carParam.toLowerCase() === apiData_cars[i].car_make.toLowerCase())){
        ownersFilteredArray.push(apiData_car_owner[i]);
      }
    }
    res.send(ownersFilteredArray);
  {
    // res.send('Invalid parameter');
  }
});

app.listen(port, () => console.log(`This app is listening on port ${port}!`));
