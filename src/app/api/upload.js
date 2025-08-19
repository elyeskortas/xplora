import nextConnect from "next-connect"
import multer from "multer"
import path from "path"

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
})

const apiRoute = nextConnect()
apiRoute.use(upload.single("file"))

apiRoute.post((req, res) => {
  res.status(200).json({ filename: req.file.filename })
})

export default apiRoute
export const config = { api: { bodyParser: false } }