const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const stock = require("../tables_schema/Stock");
const order = require("../tables_schema/Order");
const outservice = require("../tables_schema/Outservice");
const subscription = require("../tables_schema/Subscription");
const { body, validationResult } = require("express-validator");
const Inservice = require("../tables_schema/Inservice");

const Subscription = require("../tables_schema/Subscription");

//Route 1: buy an order
router.put(
  "/buyproduct/:pid",
  fetchuser,
  [body("address", "Enter a valid Address").isLength({ min: 10 })],
  async (req, res) => {
    let oid_prefix="O";
    let oid="";
    const { address } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      oid=Math.floor(Math.random() * 1000);
        oid=oid_prefix+oid;
      let id_bool=await order.findOne({oid:oid});
      console.log(oid)
      while(id_bool){
        oid=Math.floor(Math.random() * 1000);
        oid=oid_prefix+oid;
        console.log(oid)
        console.log("waiting1");
        id_bool=await order.findOne({oid:oid});
        console.log("waiting2");
      };
      userId = req.user.id;
      pid = req.params.pid;
      
      const order_request = new order({
        oid:oid,
        uid: userId,
        pid,
        address,
      });
      const savedOrder = await order_request.save();

      let product = await stock.findOne({ pid: pid });
      //res.json(product.quantity);
      const newProduct = {};

      newProduct.quantity = product.quantity - 1;

    /*  product = await stock.findByIdAndUpdate(
        req.params.pid,
        { $set: newProduct },
        { new: true }
      );*/
      product = await stock.findOneAndUpdate(
        {pid:req.params.pid},
        { $set: newProduct },
        { new: true }
      );
      res.json({ savedOrder, product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 2: book a service
router.post(
  "/outservice",
  fetchuser,
  [
    body("product_name", "Enter a valid Name").isLength({ min: 5 }),
    body("company", "Enter a valid comapany").isLength({ min: 2 }),
    body("model_no", "Enter a Model no").isLength({ min: 5 }),
    body("address", "Enter a valid Address").isLength({ min: 10 }),
    body("service_charge", "Enter a valid number").isNumeric(),
  ],
  async (req, res) => {
    const { product_name, model_no, company, address,service_charge } = req.body;
    let outsid_prefix="OS";
    let outsid="";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      outsid=Math.floor(Math.random() * 1000);
        outsid=outsid_prefix+outsid;
      let id_bool=await outservice.findOne({outsid:outsid});
      console.log(outsid)
      while(id_bool){
        outsid=Math.floor(Math.random() * 1000);
        outsid=outsid_prefix+outsid;
        console.log(outsid)
        console.log("waiting1");
        id_bool=await outservice.findOne({outsid:outsid});
        console.log("waiting2");
      };
      userId = req.user.id;

      const outservice_request = new outservice({
        outsid:outsid,
        uid: userId,
        product_name,
        company,
        model_no,
        address,
        service_charge
      });
      const savedOutservice = await outservice_request.save();

      res.json({ savedOutservice });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 3: book a subscription
router.post(
  "/subscription",
  fetchuser,
  [
    body("product_name", "Enter a valid Name").isLength({ min: 5 }),
    body("company", "Enter a valid company").isLength({ min: 2 }),
    body("model_no", "Enter a Model no").isLength({ min: 5 }),
    body("address", "Enter a valid Address").isLength({ min: 10 }),
    body("subscription_fees", "Enter a valid number").isNumeric(),
  ],
  async (req, res) => {
    let subid_prefix="SUB";
    let subid="";
    let insid_prefix="INS";
    let insid="";
    const { product_name, model_no, company, address,subscription_fees} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      subid=Math.floor(Math.random() * 1000);
      subid=subid_prefix+subid;
    let id_bool=await subscription.findOne({subid:subid});
    console.log(subid)
    while(id_bool){
      subid=Math.floor(Math.random() * 1000);
      subid=subid_prefix+subid;
      console.log(subid)
      console.log("waiting1");
      id_bool=await subscription.findOne({subid:subid});
      console.log("waiting2");
    };

    insid=Math.floor(Math.random() * 1000);
      insid=insid_prefix+insid;
    let id1_bool=await Inservice.findOne({insid:insid});
    console.log(insid)
    while(id1_bool){
      insid=Math.floor(Math.random() * 1000);
      insid=insid_prefix+insid;
      console.log(insid)
      console.log("waiting1");
      id1_bool=await Inservice.findOne({insid:insid});
      console.log("waiting2");
    };
      userId = req.user.id;

      const subscription_request = new subscription({
        subid:subid,
        uid: userId,
        product_name,
        model_no,
        company,
        subscription_fees,
        address,
       
      });
      const savedSubscription = await subscription_request.save();
      const inservice_request = new Inservice({
        insid:insid,
        subid: savedSubscription.subid,
      });
      const savedInservice =  await inservice_request.save();

      res.json({ savedSubscription,savedInservice });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 4:Fetch all products

router.get("/fetchallproducts", async (req, res) => {
  try {
    const products = await stock.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
});
//Route 5: get my orders
router.post("/getmyorders", fetchuser, async (req, res) => {
  const myid=req.user.id;
  //console.log("myid",myid)
try {
  // const order_req = await order.find({status:{$ne:"DELIVERED"}}).select();
  let myorders = await order.aggregate([
    { $match: {uid:myid}  },
    {
      $lookup: {
        from: "stocks",
        localField: "pid",
        foreignField: "pid",
        pipeline: [{ $project: { pid: 0 ,quantity:0,date:0} }],
        as: "ProductInfo",
      },
    },
    {
      $lookup: {
        from: "order_pays",
        localField: "oid",
        foreignField: "oid",
        pipeline: [{ $project: { oid: 0 } }],
        as: "PaymentInfo",
      },
    },
  ]);
  //product= await product.find({status:{$ne:"DELIVERED"}})
  res.send(myorders);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
});
//Route 6: get my services
router.post("/getmyservices", fetchuser, async (req, res) => {
  const myid=req.user.id;
 // console.log(myid)
try {
  // const order_req = await order.find({status:{$ne:"DELIVERED"}}).select();
  let myservices = await outservice.aggregate([
    { $match: {uid:myid}  },
    {
      $lookup: {
        from: "outservice_pays",
        localField: "outsid",
        foreignField: "outserviceid",
        pipeline: [{ $project: { _id: 0 } }],
        as: "PaymentInfo",
      },
    },
  ]);
  //product= await product.find({status:{$ne:"DELIVERED"}})
  res.send(myservices);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
});
//Route 7: get my subscriptions
router.post("/getmysubscriptions", fetchuser, async (req, res) => {
  const myid=req.user.id;
try {
  // const order_req = await order.find({status:{$ne:"DELIVERED"}}).select();
  let mysubscriptions = await Subscription.aggregate([
    { $match: {uid:myid}  },
    {
      $lookup: {
        from: "subscription_pays",
        localField: "_id",
        foreignField: "subid",
        pipeline: [{ $project: { _id: 0 } }],
        as: "PaymentInfo",
      },
    },
  ]);
  //product= await product.find({status:{$ne:"DELIVERED"}})
  res.send(mysubscriptions);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
});
/*router.get("/getmyorders", async (req, res) => {
  try {
    const products = await stock.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
});*/
module.exports = router;
