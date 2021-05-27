require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const app = express();
app.use(express.json());

const pool = new Pool();

const spendsSelectQuery = `SELECT expense_area, expense_type, supplier, date, description, amount FROM spends
INNER JOIN expense_areas ON expense_areas.id=spends.expense_area_id
INNER JOIN expense_types ON expense_types.id=spends.expense_type_id
INNER JOIN suppliers ON suppliers.id=spends.supplier_id`;

const suppliersSelectQuery = `SELECT supplier FROM suppliers`;

app.get("/spends", (req, res) =>
  pool.query(spendsSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);

app.get("/supplier", (req, res) =>
  pool.query(suppliersSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);

app.listen(3001, () => console.log("Running on port 3001"));
