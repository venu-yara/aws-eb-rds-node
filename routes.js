// Initialize express router
let router = require("express").Router();

const taskController = require("./controllers/task");

router
  .get("/task", taskController.index)
  .get("/task/:id", taskController.getTaskBySetId)
  .put("/task/:id", taskController.updateTaskBySetId);

// Export API routes
module.exports = router;
