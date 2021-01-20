const db = require("../models");
const task = db.Task;

exports.index = (req, res) => {
  task
    .findAll({
      attributes: ["set"],
      where: { base: 0, result: "" },
      raw: true,
      nest: true,
    })
    .then((tasks) => {
      // GET set list of remained tasks
      const taskSets = tasks.reduce((sets, item) => {
        return sets.includes(item.set) ? sets : sets.concat(item.set);
      }, []);

      res.send({
        sets: taskSets,
        imgCnt: tasks.length + taskSets.length, // considering base images
      });
    });
};

exports.getTaskBySetId = (req, res) => {
  task
    .findAll({
      attributes: ["id", "image", "base", "set"],
      where: { set: req.params.id },
    })
    .then((items) => {
      res.send(items);
    });
};

exports.updateTaskBySetId = async (req, res) => {
  const { tasks } = req.body;
  try {
    const promises = tasks.map(async ({ result, id }) => {
      await task.update({ result }, { where: { id } });
    });
    const response = await Promise.all(promises);
    res.send("OK!");
  } catch (error) {
    res.status(500).send(error);
  }
};
