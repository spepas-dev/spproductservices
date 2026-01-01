const asynHandler = require("../middleware/async");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

//TODO Create utitlity data function which will pull all brands manufacturer etc

exports.ADD_SPARE_PART = asynHandler(async (req, res, next) => {
  let { body, user } = req;

  var updateURL = process.env.DB_BASE_URL + "product/add-spare-part";

  let newUserUpdate = await UtilityHelper.makeHttpRequest(
    "POST",
    updateURL,
    body
  );

  if (!newUserUpdate) {
    var resp = {
      status: RESPONSE_CODES.FAILED,
      message: "Failed to connect to database services",
    };
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
  }

  if (newUserUpdate.status != RESPONSE_CODES.SUCCESS) {
    return UtilityHelper.sendResponse(
      res,
      200,
      newUserUpdate.message,
      newUserUpdate
    );
  }

  var resp = {
    status: RESPONSE_CODES.SUCCESS,
    message: "Spare part details added successfully",
    data: newUserUpdate.data,
  };

  return UtilityHelper.sendResponse(res, 200, resp.message, resp);
});

exports.UPLOAD_IMAGE = asynHandler(async (req, res, next) => {
  //TODO Add added by to gopa registration
  //TODO Validate file to only accept PDF

  let { user, body } = req;
  let SparePart_ID = body.SparePart_ID;

  try {
    let deliverDetails = {
      SparePart_ID: SparePart_ID,
      image_url: body.result.secure_url,
      image_ob: body.result,
    };

    var updateURL = process.env.DB_BASE_URL + "product/add-image";

    let sellerRespObj = await UtilityHelper.makeHttpRequest(
      "POST",
      updateURL,
      deliverDetails
    );

    if (!sellerRespObj) {
      var resp = {
        status: RESPONSE_CODES.FAILED,
        message: "Failed to connect to database services",
      };
      return UtilityHelper.sendResponse(res, 200, resp.message, resp);
    }

    if (sellerRespObj.status != RESPONSE_CODES.SUCCESS) {
      return UtilityHelper.sendResponse(
        res,
        200,
        sellerRespObj.message,
        sellerRespObj
      );
    }

    var resp = {
      status: RESPONSE_CODES.SUCCESS,
      message: "image uploaded",
      data: sellerRespObj.data,
    };

    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
  } catch (error) {
    console.error(error);
    console.log(error);
    var resp = {
      status: RESPONSE_CODES.FAILED,
      message: "Unkown error",
    };
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
  }
});

exports.ALL_SPARE_PART = asynHandler(async (req, res, next) => {
  let { user } = req;
  let { page, limit, search, startDate, endDate } = req.query;

  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 10;
  }

  if (!search) {
    search = "";
  }

  if (!startDate) {
    startDate = "";
  }

  if (!endDate) {
    endDate = "";
  }

  var updateURL =
    process.env.DB_BASE_URL +
    "product/all-spare-parts" +
    "?page=" +
    page +
    "&limit=" +
    limit +
    "&search=" +
    search +
    "&startDate=" +
    startDate +
    "&endDate=" +
    endDate;

  let newUserUpdate = await UtilityHelper.makeHttpRequest("GET", updateURL);

  if (!newUserUpdate) {
    var resp = {
      status: RESPONSE_CODES.FAILED,
      message: "Failed to connect to database services",
    };
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
  }

  if (newUserUpdate.status != RESPONSE_CODES.SUCCESS) {
    return UtilityHelper.sendResponse(
      res,
      200,
      newUserUpdate.message,
      newUserUpdate
    );
  }

  var resp = {
    status: RESPONSE_CODES.SUCCESS,
    message: "Sucessful",
    data: newUserUpdate.data,
  };

  return UtilityHelper.sendResponse(res, 200, resp.message, resp);
});

exports.SPARE_PART_DETAILS_BY_CODE = asynHandler(async (req, res, next) => {
  let { user } = req;
  let { spare_part_code } = req.params;
  let codeOnly = UtilityHelper.extractNumber(spare_part_code);

  var updateURL =
    process.env.DB_BASE_URL + "product/spare-part-details-by-code/" + codeOnly;

  let newUserUpdate = await UtilityHelper.makeHttpRequest("GET", updateURL);

  if (!newUserUpdate) {
    var resp = {
      status: RESPONSE_CODES.FAILED,
      message: "Failed to connect to database services",
    };
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
  }

  if (newUserUpdate.status != RESPONSE_CODES.SUCCESS) {
    return UtilityHelper.sendResponse(
      res,
      200,
      newUserUpdate.message,
      newUserUpdate
    );
  }

  var resp = {
    status: RESPONSE_CODES.SUCCESS,
    message: "Sucessful",
    data: newUserUpdate.data,
    meta: newUserUpdate.meta,
  };

  return UtilityHelper.sendResponse(res, 200, resp.message, resp);
});
