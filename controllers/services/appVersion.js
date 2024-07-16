const { getClient } = require("../../config/db");
const { ObjectId } = require("mongodb");

exports.getVersions = async (req, res) => {
  const platform = req.headers.platform;

  try {
    if (!platform) {
      return res.status(400).json({ message: "Please specify platform" });
    }
    const client = getClient();

    const versionCollection = client.connection.collection("version");

    const versionDocument = await versionCollection.findOne({
      _id: new ObjectId("65eecacb61eee50cb3bd6221"),
    });

    if (!versionDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (platform === "ANDROID") {
      return res.json({
        message: "Success",
        version: versionDocument.android,
      });
    } else if (platform === "IOS") {
      return res.json({
        message: "Success",
        version: versionDocument.ios,
      });
    } else {
      return res.json({
        message: "Failed",
      });
    }
  } catch (error) {
    console.error("Error fetching versions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
