import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new product
router.post("/", async (req, res) => {
  const { name, category, prix_achat, prix_vente, stock_unite } = req.body;
  const profit = prix_vente - prix_achat;

  try {
    const result = await pool.query(
      "INSERT INTO product (name, category, prix_achat, prix_vente, stock_unite, profit) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [name, category, prix_achat, prix_vente, stock_unite, profit]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
