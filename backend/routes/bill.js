const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const stock = require("../tables_schema/Stock");
const order = require("../tables_schema/Order");
const outservice = require("../tables_schema/Outservice");
const subscription = require("../tables_schema/Subscription");
//const Razorpay=require('razorpay');
const { body, validationResult } = require("express-validator");
const Inservice = require("../tables_schema/Inservice");
const Order_payment = require("../tables_schema/Order_payment");
const Subscription_payment = require("../tables_schema/subscription_payment");
const Outservice_payment = require("../tables_schema/Outservice_payment");
//Route 1:Order bill payment



router.post(
    "/order_bill/:oid",
    fetchuser,
    [
      body("mode", "Enter a valid Mode").isLength({ min: 3 }),
    ],
    async (req, res) => {
    
      const { mode } = req.body;
      const errors = validationResult(req);
      let o_pay_prefix="OPAY";
      let o_pay_id="";
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        o_pay_id=Math.floor(Math.random() * 1000);
        o_pay_id=o_pay_prefix+o_pay_id;
      let id_bool=await Order_payment.findOne({o_pay_id:o_pay_id});
      console.log(o_pay_id)
      while(id_bool){
        o_pay_id=Math.floor(Math.random() * 1000);
        o_pay_id=o_pay_prefix+o_pay_id;
        console.log(o_pay_id)
        id_bool=await Order_payment.findOne({o_pay_id:o_pay_id});
        
      };
  
        const order_pay = new Order_payment({
          o_pay_id:o_pay_id,
          oid:req.params.oid,
          mode
        });
        const savedOrderbill = await order_pay.save();
        let order_bill_detail = await Order_payment.aggregate([
            { $match: { o_pay_id: savedOrderbill.o_pay_id } },
            
            {
                $lookup: {
                  from: "orders",
                  localField: "oid",
                  foreignField: "oid",
                  pipeline: [{ $project: { oid: 0 ,date:0} },],
                  as: "OrderInfo",
                },
                
              },
              {
                $lookup: {
                    from: "stocks",
                    localField: "OrderInfo.pid",
                    foreignField: "pid",
                    pipeline: [{ $project: { _id: 0, quantity:0,date:0} },],
                    as: "ProductInfo",
                  },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "OrderInfo.uid",
                  foreignField: "uid",
                  pipeline: [{ $project: { _id: 0, password:0 ,date:0, privileges:0} }],
                  as: "UserInfo",
                }
              },
          ]);
         /* let instance = new Razorpay({key_id:"rzp_test_6hpA1Pkp2R0qBD", key_secret: "7lm5BafXUCFQEM96V8uJCzBQ" })
          instance.invoices.create({
          id:savedOrderbill.o_pay_id,
          type: "invoice",
          date: Date.now(),
          customer_details:{ 
            id:order_bill_detail.OrderInfo.UserInfo.uid,
            name:order_bill_detail.UserInfo.name,
            email:order_bill_detail.UserInfo.email,
            contact:order_bill_detail.UserInfo.mobile

          },
        line_items: [
          {
            "item_id": order_bill_detail.OrderInfo.oid,
            "name":order_bill_detail.ProductInfo.product_name,
            "amount":order_bill_detail.ProductInfo.selling_price,

          }
          
        ],
        email_notify:1,
      })
      instance.invoices.issue(order_bill_detail.o_pay_id)*/
        res.json({ order_bill_detail });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );
//Route 2: Subscription bill payment
router.post(
    "/subscription_bill/:subid",
    fetchuser,
    [
      body("mode", "Enter a valid Mode").isLength({ min: 3 }),
    ],
    async (req, res) => {
      const { mode } = req.body;
      const errors = validationResult(req);
      let sub_pay_prefix="SUBPAY";
      let sub_pay_id="";
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        sub_pay_id=Math.floor(Math.random() * 1000);
        sub_pay_id=sub_pay_prefix+sub_pay_id;
      let id_bool=await Subscription_payment.findOne({sub_pay_id:sub_pay_id});
      console.log(sub_pay_id)
      while(id_bool){
        sub_pay_id=Math.floor(Math.random() * 1000);
        sub_pay_id=sub_pay_prefix+sub_pay_id;
        console.log(sub_pay_id)
        id_bool=await Subscription_payment.findOne({sub_pay_id:sub_pay_id});
        
      };
        const subscription_pay = new Subscription_payment({
          sub_pay_id:sub_pay_id,
          subid:req.params.subid,
          mode
        });
        const savedSubscriptionbill = await subscription_pay.save();
        let subscription_bill_detail = await Subscription_payment.aggregate([
            { $match: { sub_pay_id: savedSubscriptionbill.sub_pay_id } },
            
            {
                $lookup: {
                  from: "subscriptions",
                  localField: "subid",
                  foreignField: "subid",
                  pipeline: [{ $project: { _id: 0, start_date:0,next_date:0,service_no:0} },],
                  as: "SubscriptionInfo",
                },
                
              },
              {
                $lookup: {
                  from: "users",
                  localField: "SubscriptionInfo.uid",
                  foreignField: "uid",
                  pipeline: [{ $project: { _id: 0, password:0 ,date:0, privileges:0} }],
                  as: "UserInfo",
                }
              },
          ]);
        res.json({subscription_bill_detail});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );
//Route 3: Outservice bill payment
router.post(
    "/Service_bill/:outserviceid",
    fetchuser,
    [
      body("mode", "Enter a valid Mode").isLength({ min: 3 }),
    ],
    async (req, res) => {
      const { mode } = req.body;
      const errors = validationResult(req);
      let ser_pay_prefix="SERPAY";
      let ser_pay_id="";
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        ser_pay_id=Math.floor(Math.random() * 1000);
        ser_pay_id=ser_pay_prefix+ser_pay_id;
      let id_bool=await Outservice_payment.findOne({ser_pay_id:ser_pay_id});
      console.log(ser_pay_id)
      while(id_bool){
        ser_pay_id=Math.floor(Math.random() * 1000);
        ser_pay_id=ser_pay_prefix+ser_pay_id;
        console.log(ser_pay_id)
        id_bool=await Outservice_payment.findOne({ser_pay_id:ser_pay_id});
        
      };
        const service_pay = new Outservice_payment({
          ser_pay_id:ser_pay_id,
          outsid:req.params.outserviceid,
          mode
        });
        const savedServicebill = await service_pay.save();
        let service_bill_detail = await Outservice_payment.aggregate([
            { $match: { ser_pay_id: savedServicebill.ser_pay_id } },
            
            {
                $lookup: {
                  from: "outservices",
                  localField: "outsid",
                  foreignField: "outsid",
                  pipeline: [{ $project: { _id: 0} },],
                  as: "serviceInfo",
                },
                
              },
              {
                $lookup: {
                  from: "users",
                  localField: "serviceInfo.uid",
                  foreignField: "uid",
                  pipeline: [{ $project: { _id: 0, password:0 ,date:0, privileges:0} }],
                  as: "UserInfo",
                }
              },
          ]);
        res.json({service_bill_detail});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );
module.exports = router;