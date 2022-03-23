import { User } from "../models/usermodel.js";
import { userdetail } from "../models/userdetail.js";
import asyncHandler from "express-async-handler";

const getuserbyid = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
     id:user.id,
     name:user.name,
     email:user.email    
    });
  } else {
      console.log('hello')
    res.sendStatus(404);
  }
});

const getallusers = asyncHandler(async(req, res) => {
  const user = await User.find({});
  res.json(user);
});

const userdetailbyid = asyncHandler(async(req,res)=>{
  const {userid} = await req.body
  const user = await userdetail.create({
    userid:userid,
    name:req.body.name,
    age:req.body.age,
    gender:req.body.gender,
    bio:req.body.bio,
    request_friends:req.body.request_friends,
    friends:req.body.friends,
    additional_timestamp:req.body.additional_timestamp
  })

  const user_saved = user.save()
  if(user_saved){
    res.json(user_saved)
  }else{
    res.sendStatus(404)
  }
})

const updateuserdetails =  asyncHandler(async(req,res)=>{
  const {userid} = await req.body
  const user = await userdetail.findOne({userid:userid})
  //console.log('user',user)
  if(user){
    if(req.body.request_friends)
    {
      if(await user.request_friends.length === 0)
      {
        //console.log('empty length')
        await user.request_friends.push(req.body.request_friends)
      }
      else{
        for(let x in await user.request_friends)
        {
          if(user.request_friends[x].userid === req.body.request_friends.userid )
           {
             //console.log('main operation')
            user.request_friends[x].status = req.body.request_friends.status 
           } // updated here
        }      
      }
    }else{
      user.request_friends = user.request_friends
    }
    if(req.body.friends)
    {
      user.friends.push(req.body.friends)
    }else{
      user.friends = user.friends
    }
    user.additional_timestamp=req.body.additional_timestamp ||  user.additional_timestamp
  }else{
    res.sendStatus(404)
  }

  await userdetail.updateOne({userid:userid},{$set:{request_friends:user.request_friends}})
 // await userdetail.save();
  const updated_user_saved = await user.save()
  if(updated_user_saved)
  {
    res.json(updated_user_saved)
  }else{
    res.sendStatus(404)
  }
})


const pendinguserdetails = async(req,res) =>{
  const {userid} = await req.body
  const user = await userdetail.findOne({userid:userid})
  //console.log('user',user)
  user.request_friends.push(req.body.request_friends)
  try{
    const saved_user = await user.save()
    if(saved_user)
    {
      res.json(saved_user)
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    res.sendStatus(404)
  }
} 


const getallusersdetails = asyncHandler(async(req,res)=>{
  const userdetails  =  await userdetail.find({})
  res.json(userdetails)
})


const getemptyusersdetails = asyncHandler(async(req,res)=>{
  const emptyuserdetails  =  await userdetail.find({})
  const alldetails=[]
  for(let details in emptyuserdetails)
  {
    if(emptyuserdetails[details].request_friends.length==0 && emptyuserdetails[details].friends.length == 0)
    {
      alldetails.push(emptyuserdetails[details])   
    }
  }
  res.json(alldetails)
  //console.log(emptyuserdetails)
})


const getusersdetailsbyid = asyncHandler(async(req, res) => {
  const user = await userdetail.find({userid:req.params.id});
  res.json(user);
});


const mutualfriends = asyncHandler(async(req,res)=>{

  const user = await userdetail.find({})
  const myuser = await userdetail.find({userid:req.body.userid}) 

  const myuserarr=[]
  const mutualarr=[]
  const finalmutualarr=[]

  if(myuser[0])
  {
    for(let obj in myuser[0].friends)
    {
      myuserarr.push(myuser[0].friends[obj])
    }
  }
  
  for(let obj in user)
  {
    for(let frd in user[obj].friends)
    {
    if( user[obj].friends[frd].userid === req.body.userid )
      { 
       // mutualarr.push(user[obj].name,user[obj].friends)
       // console.log(user[obj].name,user[obj].friends)
        mutualarr.push({name:user[obj].name,friends:user[obj].friends})
      }
    }
  }
  
  for(let a in myuserarr)
    {
      for(let b in mutualarr)
      {
        for(let c in mutualarr[b].friends )
        {
          if(myuserarr[a].userid === mutualarr[b].friends[c].userid)
          {
            finalmutualarr.push({name:mutualarr[b].name,mutualfriend:mutualarr[b].friends[c].name,mutualfriendid:mutualarr[b].friends[c].userid})
          }
        }
      }
    }
      // if(myuserarr[a].userid  === mutualarr[b].userid)
      // { 

      // }
   // }
 // }

  //console.log('my',mutualarr)
  res.send(finalmutualarr)
})


const suggestions = asyncHandler(async(req,res)=>{
  const user =  await userdetail.find({})
  const myuser = await userdetail.find({userid:req.body.userid})
  //console.log('myuser',myuser[0].request_friends)
  let unique=[]
  let arr=[]
  let anotherarr=[]

  if(myuser[0])
  {
    for(let obj in myuser[0].request_friends)
    {
      //console.log('hellomy',myuser[0].request_friends[obj])
      anotherarr.push(myuser[0].request_friends[obj])
    }
  }
  

  for( let x in user)
  { 
    for(let y in user[x].request_friends)
    {
      if(user[x].request_friends.length>0)
      {
        
        if(user[x].request_friends[y].userid == req.body.userid  )
        {
          anotherarr.push({userid:user[x].userid.toString(),name:user[x].name,})
          //console.log(user[x].friends[y])
        }
      }  
    }
    for(let y in user[x].friends)
    {
      if(user[x].friends.length>0)
      {
        
        if(user[x].friends[y].userid == req.body.userid  )
        {
          arr.push(user[x].friends)
          //console.log(user[x].friends[y])
        }
      }
    }
  }

 // console.log('unique',unique)
  for(let k in arr)
  {
    for (let j in arr[k])
    {
      unique.push(arr[k][j])
      //console.log('j',arr[k][j])
    }
  }

  var allunique=[]
  var duplicate = []
  for( let x=0;x<unique.length;x++)
  {
    let flag = 0
    for(let y=0;y<unique.length;y++)
    {
      if(unique[x].userid === unique[y].userid )
      {
        flag = flag+1
      }
    }
    if(flag == 1)
    {
      allunique.push(unique[x])
    }
    if(flag == 2)
    {
      duplicate.push(unique[x])
    }
  }

  for(let i=0;i<duplicate.length;i++)
  {
    for(let j=i+1;j<duplicate.length;j++)
    {
      if(duplicate[i].userid == duplicate[j].userid )
      {
        allunique.push(duplicate[i])
        //console.log('hello',duplicate[i])
      }
    }
  }

  //console.log('another',anotherarr)
  //console.log('allunique',allunique)
  var finalarr=[]

  for( let h in allunique)
  {
    var mainflag=0
    for(let g in anotherarr)
    {
     if(allunique[h].userid  === anotherarr[g].userid)
     {
        mainflag =mainflag+1
     }
    }
    if(mainflag==0)
    {
      finalarr.push(allunique[h])
    }
  }

  //console.log('final',finalarr)
  res.send(finalarr)
})


const removeusers = asyncHandler(async(req,res)=>{
  const user = await User.deleteMany()
  res.json(user)
})

export { getuserbyid,mutualfriends, getallusers,removeusers,userdetailbyid,getallusersdetails,getusersdetailsbyid, suggestions ,updateuserdetails,pendinguserdetails,getemptyusersdetails };
