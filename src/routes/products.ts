import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  const { categorie, produit, prix_achat, prix_vente, stock_unite } = req.body;
  const profit = prix_vente - prix_achat;

  try {
    const result = await pool.query(
      `INSERT INTO product (categorie, produit, prix_achat, prix_vente, stock_unite, profit)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [categorie, produit, prix_achat, prix_vente, stock_unite, profit]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
});

export default router;
