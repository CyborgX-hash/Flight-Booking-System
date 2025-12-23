const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// GET wallet balance
router.get("/", async (req, res) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { id: 1 },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json({
      success: true,
      balance: wallet.balance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
});

module.exports = router;
