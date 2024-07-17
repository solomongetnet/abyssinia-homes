import multer from "multer";
import fs from "fs";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./src/uploads")) {
      cb(null, "./src/uploads");
    } else {
      fs.mkdir("./src/uploads", (err) => {
        if (err) return;
        cb(null, "./src/uploads");
      });
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + Math.floor(Math.random() * 100 * 200)
    );
  },
});

export const upload = multer({ storage });
