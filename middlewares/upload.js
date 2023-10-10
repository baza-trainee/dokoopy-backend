const multer = require('multer');
const sftpStorage = require('multer-sftp')

var storage = sftpStorage({
    sftp: {
      
    },
    destination: function (req, file, cb) {
      cb(null, "www.uashared15.twinservers.net:2083/cpsess3364396298/frontend/jupiter/filemanager/index.html?dirselect=homedir&dir=/public_html/dokoopy_images")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});

module.exports = upload;