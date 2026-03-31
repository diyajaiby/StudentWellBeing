const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


// GET all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});


// ADD category
router.post("/", async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      image: req.body.image   // ✅ ADD THIS LINE
    });

    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// delete category
router.delete("/:id", async (req,res)=>{
  try{
    await Category.findByIdAndDelete(req.params.id);
    res.json({message:"Category deleted"});
  }
  catch(err){
    res.status(500).json({message:"Delete failed"});
  }
});


module.exports = router;
