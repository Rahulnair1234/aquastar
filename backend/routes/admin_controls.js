const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Stock = require("../tables_schema/Stock");
const { body, validationResult } = require("express-validator");
const Inservice = require("../tables_schema/Inservice");
const Subscription = require("../tables_schema/Subscription");
const order = require("../tables_schema/Order");
const date = require("datejs");
const Outservice = require("../tables_schema/Outservice");
const Order = require("../tables_schema/Order");
const Moment=require("moment")

//Route 1: Stock updation
router.put(
  "/updateProduct/:id",
  fetchuser,
  [
    body("company", "Enter a valid name").isLength({ min: 2 }),
    body("quantity", "Enter a valid number").isNumeric(),
    body("selling_price", "Enter a valid price").isNumeric(),
  ],
  async (req, res) => {
    try {
      if (!req.user.privileges) {
        return res.status(401).send("No Access for normal users");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
    try {
      const { model_no, company, quantity, selling_price, description } =
        req.body;

      let newProduct = {};
      if (model_no) {
        newProduct.model_no = model_no;
      }
      if (company) {
        newProduct.company = company;
      }
      if (quantity) {
        newProduct.quantity = quantity;
      }
      if (selling_price) {
        newProduct.selling_price = selling_price;
      }
      if (description) {
        newProduct.description = description;
      }
      let product = await Stock.findOne({ pid: req.params.id });
      if (!product) {
        return req.status(404).send("Not found");
      }

      product = await Stock.findOneAndUpdate(
        { pid: req.params.id },
        { $set: newProduct },
        { new: true }
      );
      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 2: insert new product
router.post(
  "/addnewproduct",
  fetchuser,
  [
    body("product_name", "Enter a valid name").isLength({ min: 5 }),
    body("company", "Enter a valid name").isLength({ min: 2 }),
    body("quantity", "Enter a valid number").isNumeric(),
    body("selling_price", "Enter a valid price").isNumeric(),
  ],
  async (req, res) => {
    let pid_prefix = "P";
    let pid = "";
    console.log(req.user.privileges);
    if (req.user.privileges === false) {
      return res.status(401).send("No Access for normal users");
    }

    const {
      product_name,
      model_no,
      quantity,
      selling_price,
      company,
      image,
      description,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      pid = Math.floor(Math.random() * 1000);
      pid = pid_prefix + pid;
      let id_bool = await Stock.findOne({ pid: pid });
      console.log(pid);
      while (id_bool) {
        pid = Math.floor(Math.random() * 1000);
        pid = pid_prefix + pid;
        console.log(pid);
        console.log("waiting1");
        id_bool = await Stock.findOne({ pid: pid });
        console.log("waiting2");
      }

      //To validate duplicate model_no from the DB
      let product = await Stock.findOne({ model_no: req.body.model_no });
      if (product) {
        return res
          .status(400)
          .json({ error: "sorry a product with this model no already exists" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
    try {
      const product = new Stock({
        pid,
        product_name,
        model_no,
        company,
        quantity,
        selling_price,
        image,
        description,
      });
      const savedProduct = await product.save();
      res.send(savedProduct);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 3: Delete product
router.delete("/deleteProduct/:id", fetchuser, async (req, res) => {
  if (!req.user.privileges) {
    return res.status(401).send("No Access for normal users");
  }
  try {
    let product = await Stock.findOne({ pid: req.params.id });
    if (!product) {
      return res.status(404).send("Not found");
    }
    product = await Stock.findOneAndDelete({ pid: req.params.id });
    res.send("Product Deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//Route 4: View Order request
router.post("/view_orders", fetchuser, async (req, res) => {
  if (!req.user.privileges) {
    return res.status(401).send("No Access for normal users");
  }
  try {
    // const order_req = await order.find({status:{$ne:"DELIVERED"}}).select();
    let product = await order.aggregate([
      { $match: { status: { $ne: "DELIVERED" } } },
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "uid",
          pipeline: [
            { $project: { _id: 0, password: 0, privileges: 0, date: 0 } },
          ],
          as: "UserInfo",
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "pid",
          foreignField: "pid",
          pipeline: [{ $project: { _id: 0, quantity: 0, date: 0 } }],
          as: "ProductInfo",
        },
      },
      {
        $lookup: {
          from: "order_pays",
          localField: "oid",
          foreignField: "oid",
          pipeline: [{ $project: { _id: 0 } }],
          as: "PaymentInfo",
        },
      },
    ]);
    //product= await product.find({status:{$ne:"DELIVERED"}})
    res.send(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 5: View pending service request
router.get("/view_service_req", fetchuser, async (req, res) => {
  if (!req.user.privileges) {
    return res.status(401).send("No Access for normal users");
  }
  try {
    // const order_req = await order.find({status:{$ne:"DELIVERED"}}).select();
    let ser = await Outservice.aggregate([
      { $match: { status: { $ne: "CLOSED" } } },
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "uid",
          pipeline: [
            { $project: { _id: 0, password: 0, privileges: 0, date: 0 } },
          ],
          as: "UserInfo",
        },
      },
      {
        $lookup: {
          from: "outservice_pays",
          localField: "outsid",
          foreignField: "outsid",
          pipeline: [{ $project: { _id: 0 } }],
          as: "PaymentInfo",
        },
      },
    ]);
    //product= await product.find({status:{$ne:"DELIVERED"}})
    res.send(ser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//Route 6: View current subscriptions ???
router.post("/view_subscriptions", fetchuser, async (req, res) => {
  if (!req.user.privileges) {
    return res.status(401).send("No Access for normal users");
  }
  try {
    // const order_req = await order.find({status:{$ne:"DELIVERED"}}).select();
    let subs = await Subscription.aggregate([
      { $match: { service_no: { $lt: 3 } } },
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "uid",
          pipeline: [
            { $project: { _id: 0, password: 0, privileges: 0, date: 0 } },
          ],
          as: "UserInfo",
        },
      },
      {
        $lookup: {
          from: "subscription_pays",
          localField: "subid",
          foreignField: "subid",
          pipeline: [{ $project: { _id: 0 } }],
          as: "PaymentInfo",
        },
      },
    ]);
    //product= await product.find({status:{$ne:"DELIVERED"}})
    res.send(subs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 7: edit subscriptions:
router.put(
  "/updateSubscription/:id",
  fetchuser,
  [body("status", "Enter a valid status").isLength({ min: 3 })],
  async (req, res) => {
    let insid_prefix = "INS";
    let insid = "";
    if (!req.user.privileges) {
      return res.status(401).send("No Access for normal users");
    }
    try {
      const { status, description } = req.body;

      let newProduct = {};
      if (status) {
        newProduct.status = status;
      }
      if (description) {
        newProduct.description = description;
      }

      let inservice = await Inservice.findOne({ insid: req.params.id });

      inservice = await Inservice.findOneAndUpdate(
        { insid: req.params.id },
        { $set: newProduct },
        { new: true }
      );
      console.log(inservice.subid);
      let subs = await Subscription.findOne({ subid: inservice.subid });
      let savedInservice;

      // let inservice_request = await Inservice({});
      newProduct = {};

      if (status === "CLOSED" && subs.service_no < 3) {
        newProduct.service_no = subs.service_no + 1;
        
        var tempdate = subs.next_date;
        tempdate = Date.parse(tempdate);
        tempdate.addMonths(4);
        tempdate.toISOString();
        newProduct.next_date = tempdate;
      } else if (status === "Cancelled") {
        newProduct.service_no = -1;
      }

      try {
        subs = await Subscription.findOneAndUpdate(
          { subid: inservice.subid },
          { $set: newProduct },
          { new: true }
        );
        if (newProduct.service_no !== -1&& newProduct.service_no!=3) {
          insid = Math.floor(Math.random() * 1000);
          insid = insid_prefix + insid;
          let id1_bool = await Inservice.findOne({ insid: insid });
          console.log(insid);
          while (id1_bool) {
            insid = Math.floor(Math.random() * 1000);
            insid = insid_prefix + insid;
            console.log(insid);
            console.log("waiting1");
            id1_bool = await Inservice.findOne({ insid: insid });
            console.log("waiting2");
          }
          let inservice_request = new Inservice({
            insid: insid,
            subid: subs.subid,
          });
          savedInservice = await inservice_request.save();
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }

      res.json({ subs, inservice, savedInservice });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 8: edit services
router.put(
  "/updateServices/:id",
  fetchuser,
  [body("status", "Enter a valid status").isLength({ min: 3 })],
  async (req, res) => {
    if (!req.user.privileges) {
      return res.status(401).send("No Access for normal users");
    }
    try {
      const { status, description } = req.body;

      let newProduct = {};
      if (status) {
        newProduct.status = status;
      }
      if (description) {
        newProduct.description = description;
      }

      let outservice = await Outservice.findOne({ outsid: req.params.id });

      outservice = await Outservice.findOneAndUpdate(
        { outsid: req.params.id },
        { $set: newProduct },
        { new: true }
      );

      res.json({ outservice });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 9: update order request
router.put(
  "/updateOrder/:id",
  fetchuser,
  [body("status", "Enter a valid status").isLength({ min: 3 })],
  async (req, res) => {
    if (!req.user.privileges) {
      return res.status(401).send("No Access for normal users");
    }
    try {
      const { status } = req.body;

      let newProduct = {};
      if (status) {
        newProduct.status = status;
      }

      let order = await Order.findOne({ oid: req.params.id });

      order = await Order.findOneAndUpdate(
        { oid: req.params.id },
        { $set: newProduct },
        { new: true }
      );

      res.json(order);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 10:view Inservices
router.post("/view_inservices", fetchuser, async (req, res) => {
  if (!req.user.privileges) {
    return res.status(401).send("No Access for normal users");
  }
  try {
    //  const inservice_req = await Inservice.find({status:{$ne:"CLOSED"}}).select();
    let inservice = await Inservice.aggregate([
      { $match: { status: { $ne: "CLOSED" } } },
      {
        $lookup: {
          from: "subscriptions",
          localField: "subid",
          foreignField: "subid",
          pipeline: [{ $project: { subscription_fees: 0, start_date: 0 } }],
          as: "SubscriptionInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "SubscriptionInfo.uid",
          foreignField: "uid",
          pipeline: [
            { $project: { _id: 0, password: 0, privileges: 0, date: 0 } },
          ],
          as: "UserInfo",
        },
      },
    ]);

    //product= await product.find({status:{$ne:"DELIVERED"}})
    res.send(inservice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 11:reports
router.get("/view_report1", fetchuser,async (req, res) => {
  if (!req.user.privileges) {
    return res.status(401).send("No Access for normal users");
  }
  try {
    let ordercount = await Order.aggregate([
      { $count: "mycount" },

      { $match: { status: { $ne: "Cancelled" } } },
    ]);
    let servicecount = await Outservice.aggregate([
      { $count: "mycount" },
      { $match: { status: { $ne: "Cancelled" } } },
    ]);
    let subscount = await Subscription.aggregate([
      { $count: "mycount" },
      { $match: { status: { $ne: "Cancelled" } } },
    ]);
    let total_service_sales = await Outservice.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, sum: { $sum: "$service_charge" } } },
      { $project: { _id: 0 } },
    ]);
    let total_subs_sales = await Subscription.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, sum: { $sum: "$subscription_fees" } } },
      { $project: { _id: 0 } },
    ]);
    let total_order_sales = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      
      {
        $lookup: {
          from: "stocks",
          localField: "pid",
          foreignField: "pid",
          as: "ProductInfo",
        },
      },
      { $project: {
        "total": { $sum: "$ProductInfo.selling_price" }
      }},
      {
        $group:{_id:null,sum:{$sum:"$total"}}
      },
      { $project: { _id: 0 } },

    ]);

    res.send({
      orders: ordercount,
      service: servicecount,
      subscription: subscount,
      service_sales: total_service_sales,
      subs_sales: total_subs_sales,
      order_sales:total_order_sales
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//Route 12:reports2
router.get("/view_report2",async (req, res) => {
 
  try {
    let expiry_list=[];
    let days_left_list=[];
    let subscount = await Subscription.aggregate([
      
      { $match: { service_no:{$eq:3}} },
      { $count: "mycount" },
      
      

    ]);
    let subsexpiry = await Subscription.aggregate([
      
      { $match: { service_no:{$eq:3}} },
      {$project:{_id:0,product_name:0,model_no:0,company:0,subscription_fees:0,address:0,start_date:0}},
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "uid",
          pipeline: [ 
            { $project: { _id: 0, password: 0, privileges: 0, date: 0 ,email:0,__v:0} },
          ],
          as: "UserInfo",
        },
      },

    ]);
    subsexpiry.forEach(element => {
    let expiry=element.next_date;
    expiry=new Date(expiry);
    expiry=expiry.getTime();
    console.log(expiry);
    let today=Date.now();
    console.log(today)
    // time difference
    var timeDiff = Math.abs(expiry - today);

    // days difference
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    today=Moment(today).format("DD-MM-YYYY");
    console.log(today)
    expiry =  Moment(expiry).format("DD-MM-YYYY");
    console.log(expiry);    
    expiry_list.push(expiry);
    console.log(expiry_list);
    days_left_list.push(diffDays);
    console.log(days_left_list);
    });
     
    res.send({
  
      subscription: subsexpiry,
      days_left:days_left_list,
      expiry:expiry_list,
      count:subscount
    
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
