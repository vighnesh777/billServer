const express=require('express');
const app=express();    
const mongoose=require('mongoose');
const cors=require('cors');

const port=process.env.PORT || 8081;
const Bill=require('./modals/bill');
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOURL,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to mongodb');
    }
}
);


app.post('/',(req,res)=>{   //post request
    const {billDate,billAmount,paidDate,units,paid}=req.body;
    const bill=new Bill({
        billDate,
        billAmount,
        paidDate,
        units,
        paid
    });
    bill.save().then(()=>{
        res.status(200).json({"message":"bill added"});
    }).catch((err)=>{
        res.status(400).json({"messgae":err});
        console.log(err);
    }
    );
});

app.get('/',async (req,res)=>{   //get request
    try
    {
         const Bills=await Bill.find();
         if (Bills.length>0)
         {
             res.status(200).json(Bills);
         }
        else
        {
                res.status(404).json({"message":"no bills found"});
        }

    }
    catch(err)
    {
        res.status(400).json({"messgae":err});
        console.log(err);
    }

});

app.get('/bill/:id',async (req,res)=>{   //get request
    try
    {
         const billFound=await Bill.findById(req.params.id);
         if (billFound)
         {
             res.status(200).json(billFound);
         }
        else
        {
                res.status(404).json({"message":"no bill found with the id"});
        }

    }
    catch(err)
    {
        res.status(400).json({"messgae":err});
        console.log(err);
    }

});

app.put('/:id/edit',async (req,res)=>{   //put request
    try
    {
         const billFound=await Bill.findById(req.params.id);
         if (billFound)
         {
             const {billDate,billAmount,paidDate,units,paid}=req.body;
             billFound.billDate=billDate;
             billFound.billAmount=billAmount;
             billFound.paidDate=paidDate;
             billFound.units=units;
             billFound.paid=paid;
             await billFound.save();
             res.status(200).json({"message":"bill updated successfully"});
         }
        else
        {
                res.status(404).json({"message":"no bill found with the id"});
        }

    }
    catch(err)
    {
        res.status(400).json({"messgae":err});
        console.log(err);
    }

});


app.delete('/delete/:id',async (req,res)=>{   //delete request
    try
    {
         const billFound=await Bill.findById(req.params.id);
         if (billFound)
         {
             await billFound.remove();
             res.status(200).json({"message":"bill deleted successfully"});
         }
        else
        {
                res.status(404).json({"message":"no bill found with the id"});
        }

    }
    catch(err)
    {
        res.status(400).json({"messgae":err});
        console.log(err);
    }

});







app.listen(port,()=>{
    console.log('Server is running on port '+port);
});
