const express = require("express");
const router = express.Router();
require("dotenv").config();
const apiAdapter = require("./apiAdapter");
const jwt = require("jsonwebtoken");
const verifyTioken = require("../middleware/verifyTioken");

const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(process.env.URL_SERVICE_USER);

router.post("/register", async (req, res) => {
  try {
    // return res.json(process.env.URL_SERVICE_USER)
    const user = await api.post(`/users/register`, req.body);
    return res.status(200).json(user.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await api.post("/users/login", req.body);
    const data = user.data.data;

    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    await api.post("/refresh-token", {
      user_id: data.id,
      token: refreshToken,
    });

    return res.status(200).json({
      status: "success",
      data: {
        token,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

router.post("/logout", verifyTioken, async (req, res) => {
  try {
    const id = req.user.data.data.id;
    const user = await api.post("/users/logout", { user_id: id });
    return res.status(200).json(user.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;
