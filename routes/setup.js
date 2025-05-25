const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileMiddleware");

//TEST CONTROLLER
const { TestController } = require("../controllers/test");

const { NoneUserCheck } = require("../middleware/NoneUserMiddleware");
const { VALIDATE_TOKEN } = require("../middleware/UserMiddleware");

const {
  ADD_MANUFACTURER,
  ALL_MANUFACTURERS,
} = require("../controllers/ManufacturerController");

const { ADD_BRAND, ALL_BRANDS } = require("../controllers/BrandController");

const { ADD_MODEL, ALL_MODELS } = require("../controllers/ModelController");

const {
  ADD_SPARE_PART,
  UPLOAD_IMAGE,
  ALL_SPARE_PART,
  SPARE_PART_DETAILS_BY_CODE,
} = require("../controllers/SparePartController");

//test routes link
router.route("/testapi").get(TestController);

//manufacturer
router
  .route("/manufacturer/add")
  .post(NoneUserCheck, VALIDATE_TOKEN, ADD_MANUFACTURER);
router
  .route("/manufacturer/all")
  .get(NoneUserCheck, VALIDATE_TOKEN, ALL_MANUFACTURERS);

//brand
router.route("/brand/add").post(NoneUserCheck, VALIDATE_TOKEN, ADD_BRAND);
router.route("/brand/all").get(NoneUserCheck, VALIDATE_TOKEN, ALL_BRANDS);

//Model
router.route("/model/add").post(NoneUserCheck, VALIDATE_TOKEN, ADD_MODEL);
router.route("/model/all").get(NoneUserCheck, VALIDATE_TOKEN, ALL_MODELS);

//Spare part
router
  .route("/spare-part/add")
  .post(NoneUserCheck, VALIDATE_TOKEN, ADD_SPARE_PART);
router
  .route("/spare-part/upload-image")
  .post(NoneUserCheck, VALIDATE_TOKEN, UPLOAD_IMAGE);
router
  .route("/spare-part/all")
  .get(NoneUserCheck, VALIDATE_TOKEN, ALL_SPARE_PART);
router
  .route("/spare-part/details-by-code/:spare_part_code")
  .get(NoneUserCheck, VALIDATE_TOKEN, SPARE_PART_DETAILS_BY_CODE);

module.exports = router;
