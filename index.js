const express = require("express")
const app = express();
const path = require("path")
const port = process.env.PORT|| 3000

app.use(express.json());

var users = [{
    name : 'John',
    kidneys : [{
        healthy : false
    }, {
        healthy : true
    }]
  }]

app.post("/",function(req,res){

  const ask = req.body.isHealthy;
  let obj = {healthy : ask}
  users[0].kidneys.push(obj)
  res.json({
     users
  })
})
app.get("/", function(req,res){
  let joinKidneys = users[0].kidneys;
  let noofkidneys = joinKidneys.length;
  let noofhealthykidneys = 0;
  for(let i=0;i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy){
      noofhealthykidneys++;
    }
  }

  const noofunhealthykidneys = noofkidneys - noofhealthykidneys;
  res.json({
    noofkidneys,
    noofhealthykidneys,
    noofunhealthykidneys
  })
})

app.delete("/", function(req,res){
  let cnt = unhealthycnt();
  if(cnt == 0){
    res.status(411).send({
      "msg": "all the kidneys are healthy"
    })
  }
  else{
    const newKidneys = []
    for(let i=0;i<users[0].kidneys.length;i++){
      if(users[0].kidneys[i].healthy){
        newKidneys.push({healthy : true})
      }
    }
    users[0].kidneys = newKidneys;
}
  res.json({})
})


app.put("/", function(req,res){
  let cnt = unhealthycnt();
  if(cnt==0){
    res.status(411).json({"msg" : "all the kidneys are already healthy"})
  }
  for(let i=0;i<users[0].kidneys.length;i++){
    users[0].kidneys[i].healthy = true;
  }
  res.json({})
})


function unhealthycnt(){
  let cnt = 0;
  for(let i=0;i<users[0].kidneys.length;i++){
    if(!users[0].kidneys[i].healthy){
      cnt++;
    }
  }
  return cnt;
}

app.listen(port , '0.0.0.0', function(){
  console.log(`server started on port ${port}`)
})

