var express = require("express");
var fileUpload = require("express-fileupload");
var router = express.Router();
var mongojs = require("mongojs");
var mongo = require("mongodb");
var fs = require('fs');
var Grid = require('gridfs-stream');
var binary = mongojs.Binary;
var db = mongojs("tasks_main", ["tasks"]);
var moment = require('moment-timezone');

//Get tasks
router.get("/tasks", function(req, res, next) {
    const { id, description, isResolved } = req.query;

    var filters = [];

    if (id)
        filters.push({ "id": { $regex: id + ".*" } });

    if (description)
        filters.push({ "description": { $regex: ".*" + description + ".*" } });

    if (isResolved)
        filters.push({ "isResolved": JSON.parse(isResolved) });

    db.tasks.find({
        $and: filters.length > 0 ? filters : [{}]
    }).sort({ _id: -1 }).toArray(function(err, tasks) {
        if (err) {
            res.send(err);
        }

        res.json(tasks);
    });
});

//Store task
router.post("/task", function(req, res, next) {
    var task = req.body;

    if (!task.description) {
        res.status(400);
        res.json({
            error: "Faltan datos"
        });
    } else {
        db.tasks.find().sort({ _id: -1 }).limit(1).toArray(function(err, doc) {
            if (doc.length > 0) {
                task.id = (parseInt(doc[0].id) + 1).toString();
            } else {
                task.id = '1';
            }

            db.tasks.save(task, function(err, task) {
                if (err) {
                    res.send(err);
                }

                res.json(task);
            });
        });
    }
});

//Update task
router.put("/task", function(req, res) {
    var task = req.body;

    if (!task.description) {
        res.status(400);
        res.json({
            error: "Faltan datos"
        });
    } else {
        var updatedTask = {};
        updatedTask.description = task.description;
        updatedTask.isResolved = task.isResolved;
        updatedTask.id = task.id;
        updatedTask.attached_file = task.attached_file;

        db.tasks.update({ _id: mongojs.ObjectId(req.query.id) }, updatedTask, {}, function(err, task) {
            if (err) {
                res.send(err);
            }

            res.json(task);
        });
    }
});

//Delete task
router.delete("/task", function(req, res) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.query.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }

        res.json(task);
    });
});

module.exports = router;