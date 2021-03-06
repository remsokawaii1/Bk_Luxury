const Room = require("../models/room.model.js");

// Create and Save a new Room
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else if ((isNaN(req.body.number) || req.body.number == '') || 
            (isNaN(req.body.capacity) || req.body.capacity == '') || 
            (isNaN(req.body.square) || req.body.square == '') || 
            (isNaN(req.body.price) || req.body.price == '') ||
            (req.body.name == '') ||
            (req.body.type == '') ||
            (req.body.description == '') ||
            (req.body.picture == '') ||
            (req.body.status != 0 && req.body.status != 1)) {
        
        return res.status(400).send({
            message: "Invalid input!"
        });
    }

    // Create a Room
    const room = new Room({
        number: req.body.number,
        name: req.body.name,
        description: req.body.description,
        picture: req.body.picture,
        capacity: req.body.capacity,
        square: req.body.square,
        price: req.body.price,
        type: req.body.type,
        status: req.body.status
    });
    // Save Room in the database
    Room.create(room, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Room."
            });
        else res.send(data);
    });
    
};

// Retrieve all Rooms from the database (with condition).
exports.findAll = (req, res) => {
    const number = req.query.number;

    Room.getAll(number, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving room."
        });
      else res.send(data);
    });
  };


// Retrieve all Rooms group by name
exports.findAllGroupByName = (req, res) => {
    const name = req.query.name;

    Room.getAllGroupByName(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving room."
        });
      else res.send(data);
    });
  };

// Find a single Room with number
exports.findByNumber = (req, res) => {
    Room.findByNumber(req.params.number, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Room with number ${req.params.number}.`
                });
            } 
            else {
                res.status(500).send({
                message: "Error retrieving Room with number " + req.params.number
                });
            }
        } 
        else res.send(data);
      }); 
};

exports.findByType = (req, res) => {
    Room.findByType(req.params.type, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Room with type ${req.params.type}.`
                });
            } 
            else {
                res.status(500).send({
                message: "Error retrieving Room with type " + req.params.type
                });
            }
        } 
        else res.send(data);
      }); 
};

exports.findByName = (req, res) => {
    Room.findByName(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Room with name ${req.params.name}.`
                });
            } 
            else {
                res.status(500).send({
                message: "Error retrieving Room with name " + req.params.name
                });
            }
        } 
        else res.send(data);
      }); 
};


// Update a Room identified by number in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else if ((isNaN(req.params.number) || req.params.number == '') || 
            (isNaN(req.body.capacity) || req.body.capacity == '') || 
            (isNaN(req.body.square) || req.body.square == '') || 
            (isNaN(req.body.price) || req.body.price == '') ||
            (req.body.name == '') ||
            (req.body.type == '') ||
            (req.body.description == '') ||
            (req.body.picture == '') ||
            (req.body.status != 0 && req.body.status != 1)) {
        
        return res.status(400).send({
            message: "Invalid input!"
        });
    }

    const room = {
        number: req.params.number,
        info: req.body
    };
    

    Room.update(room, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the Room."
            });
        else res.send(data);
    });
};

// Delete a Room with the specified number in the request
exports.delete = (req, res) => {
    Room.delete(req.params.number, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Room with number ${req.params.number}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Could not delete Room with number " + req.params.number
                });
            }
        } 
        else res.send({ message: `Room was deleted successfully!` });
      });  
};

// Delete all Rooms from the database.
exports.deleteAll = (req, res) => {
    Room.deleteAll(req.params.number, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Room with number ${req.params.number}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Could not delete Room with number " + req.params.number
                });
            }
        } 
        else res.send({ message: `Room was deleted successfully!` });
      });
};