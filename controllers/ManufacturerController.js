const asynHandler = require("../middleware/async");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");

exports.ADD_MANUFACTURER = asynHandler(async (req, res, next) => {
  let { body, user } = req;

  var updateURL = process.env.DB_BASE_URL + "product/add-manufacturer";

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
    message: "Manufacturer details added successfully",
    data: newUserUpdate.data,
  };

  return UtilityHelper.sendResponse(res, 200, resp.message, resp);
});

exports.ALL_MANUFACTURERS = asynHandler(async (req, res, next) => {
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
    "product/all-manufacturers" +
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
    meta: newUserUpdate.meta,
  };

  return UtilityHelper.sendResponse(res, 200, resp.message, resp);
});
