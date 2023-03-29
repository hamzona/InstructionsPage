const Profil = require("../models/authModel");
const getOneUser = async (req, res, next) => {
  const { userName } = req.query;
  try {
    const user = await Profil.findOne({ name: userName });
    if (!user) {
      throw Error("User not found");
    }

    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const rateUser = async (req, res) => {
  const { userName } = req.query;
  const rate = parseInt(req.body.rate);
  try {
    //console.log(userName);
    console.log(rate);

    ME = await Profil.findById({ _id: await req.user.toString() });

    const data = await Profil.findOne(
      { name: userName },
      { rateScore: 1, _id: 0, usersRated: 1 }
    );
    const DataRate =
      (await (data.rateScore + rate)) / (data.usersRated.length + 1);
    console.log(data.rateScore + rate);
    const userRate = await Profil.findOneAndUpdate(
      { name: userName },
      {
        $inc: { rateScore: rate },
        $push: { usersRated: { name: ME.name, rate: rate } },
        $set: { rate: DataRate },
      },
      { returnOriginal: false }
    );

    res.json(userRate);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};
module.exports = { getOneUser, rateUser };
