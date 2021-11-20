const sql = require("./db.js")

//constructor
const Room = function(room) {
    this.number = room.number;
    this.description = room.description;
    this.picture = room.picture;
    this.type = room.type;
    this.status = room.status;
    this.capacity = room.capacity;
    this.price = room.price;
    this.square = room.square;
    this.service = room.service;
}

Room.create = (newRoom, result) => {
    sql.query("INSERT INTO room SET ?", newRoom, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created room: ", { number: res.insertNumber, ...newRoom });
        result(null, { number: res.insertNumber, ...newRoom });
    });
};
  
Room.findByNumber = (number, result) => {
    sql.query(`SELECT * FROM room WHERE number = ${number}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found room: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Room with the number
        result({ kind: "not_found" }, null);
    });
};

Room.getAll = (title, result) => {
    let query = "SELECT * FROM room";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("rooms: ", res);
        result(null, res);
    });
};
    
Room.delete = (number, result) => {
    sql.query("DELETE FROM room WHERE number = ?", number, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
        // not found Room with number
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("deleted room with number: ", number);
        result(null, res);
    });
};

Room.deleteAll = result => {
    sql.query("DELETE FROM room", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} rooms`);
        result(null, res);
    });
};

module.exports = Room;