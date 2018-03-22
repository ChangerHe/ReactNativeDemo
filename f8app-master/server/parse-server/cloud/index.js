"use strict";
/* global Parse */

// Cloud code status check
Parse.Cloud.define("cloudcode_status", function(request, response) {
  response.success("👌");
});

// Cloud functions
import "./functions";

// Parse Jobs
import "./jobs";

// Class triggers (beforeSave & afterSave)
import "./triggers";
