import os from 'os'
import multer from 'multer'

export const upload = multer({ dest: os.tmpdir() })
