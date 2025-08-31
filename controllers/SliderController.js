const asynHandler = require("../middleware/async");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");


exports.ADD_SLIDER = asynHandler(async (req, res, next) => {


   
    let {body,user} = req;

    body.added_By = user.User_ID;
   var updateURL = process.env.DB_BASE_URL +"slider/add"; 

   let newUserUpdate = await UtilityHelper.makeHttpRequest("POST",updateURL, body);



   if(!newUserUpdate)
       {
           var resp = {
               status : RESPONSE_CODES.FAILED,
               message : "Failed to connect to database services"
           };
           return UtilityHelper.sendResponse(res, 200, resp.message, resp);
       }



       if(newUserUpdate.status != RESPONSE_CODES.SUCCESS){
           return UtilityHelper.sendResponse(res, 200, newUserUpdate.message, newUserUpdate);
        }



   var resp = {
    status : RESPONSE_CODES.SUCCESS,
    message : "Slider details added successfully",
    data: newUserUpdate.data
};


   return UtilityHelper.sendResponse(res, 200, resp.message, resp);

})






exports.DEACTIVATE_SLIDER = asynHandler(async (req, res, next) => {


   
    let {body,user} = req;

   // body.added_By = user.User_ID

    let reqBody = {
        slider_id: body.slider_id,
        status: 0,
        updated_By: user.User_ID
          }

   var updateURL = process.env.DB_BASE_URL +"slider/update"; 

   let newUserUpdate = await UtilityHelper.makeHttpRequest("POST",updateURL, reqBody);



   if(!newUserUpdate)
       {
           var resp = {
               status : RESPONSE_CODES.FAILED,
               message : "Failed to connect to database services"
           };
           return UtilityHelper.sendResponse(res, 200, resp.message, resp);
       }



       if(newUserUpdate.status != RESPONSE_CODES.SUCCESS){
           return UtilityHelper.sendResponse(res, 200, newUserUpdate.message, newUserUpdate);
        }



   var resp = {
    status : RESPONSE_CODES.SUCCESS,
    message : "Slider details added successfully",
    data: newUserUpdate.data
};


   return UtilityHelper.sendResponse(res, 200, resp.message, resp);

})








exports.ACTIVATE_SLIDER = asynHandler(async (req, res, next) => {


   
    let {body,user} = req;

   // body.added_By = user.User_ID

    let reqBody = {
        slider_id: body.slider_id,
        status: 1,
        updated_By: user.User_ID
          }

   var updateURL = process.env.DB_BASE_URL +"slider/update"; 

   let newUserUpdate = await UtilityHelper.makeHttpRequest("POST",updateURL, reqBody);



   if(!newUserUpdate)
       {
           var resp = {
               status : RESPONSE_CODES.FAILED,
               message : "Failed to connect to database services"
           };
           return UtilityHelper.sendResponse(res, 200, resp.message, resp);
       }



       if(newUserUpdate.status != RESPONSE_CODES.SUCCESS){
           return UtilityHelper.sendResponse(res, 200, newUserUpdate.message, newUserUpdate);
        }



   var resp = {
    status : RESPONSE_CODES.SUCCESS,
    message : "Slider details added successfully",
    data: newUserUpdate.data
};


   return UtilityHelper.sendResponse(res, 200, resp.message, resp);

})




exports.ALL_SLIDERS = asynHandler(async (req, res, next) => {


   
    //let {body,user} = req;

    //body.added_By = user.User_ID
   var updateURL = process.env.DB_BASE_URL +"slider/all"; 

   let newUserUpdate = await UtilityHelper.makeHttpRequest("GET",updateURL);



   if(!newUserUpdate)
       {
           var resp = {
               status : RESPONSE_CODES.FAILED,
               message : "Failed to connect to database services"
           };
           return UtilityHelper.sendResponse(res, 200, resp.message, resp);
       }



       if(newUserUpdate.status != RESPONSE_CODES.SUCCESS){
           return UtilityHelper.sendResponse(res, 200, newUserUpdate.message, newUserUpdate);
        }



   var resp = {
    status : RESPONSE_CODES.SUCCESS,
    message : "Slider details added successfully",
    data: newUserUpdate.data
};


   return UtilityHelper.sendResponse(res, 200, resp.message, resp);

})




exports.ACTIVE_SLIDERS = asynHandler(async (req, res, next) => {


   
    //let {body,user} = req;

    //body.added_By = user.User_ID
   var updateURL = process.env.DB_BASE_URL +"slider/active"; 

   let newUserUpdate = await UtilityHelper.makeHttpRequest("GET",updateURL);



   if(!newUserUpdate)
       {
           var resp = {
               status : RESPONSE_CODES.FAILED,
               message : "Failed to connect to database services"
           };
           return UtilityHelper.sendResponse(res, 200, resp.message, resp);
       }



       if(newUserUpdate.status != RESPONSE_CODES.SUCCESS){
           return UtilityHelper.sendResponse(res, 200, newUserUpdate.message, newUserUpdate);
        }



   var resp = {
    status : RESPONSE_CODES.SUCCESS,
    message : "Slider details added successfully",
    data: newUserUpdate.data
};


   return UtilityHelper.sendResponse(res, 200, resp.message, resp);

})
