const express = require('express')
const multer = require('multer')
const proxy = require('express-http-proxy')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const DeepSpeech = require('deepspeech')
const Fs = require('fs')
const MemoryStream = require('memory-stream')
const Duplex = require('stream').Duplex
const ffmpeg = require('fluent-ffmpeg')
const wav = require('wav');

const app = express()
const port = process.env.PORT || 3000

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'dist')))

// cors setup for express app
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		console.log('filename')
		cb(null, file.originalname)
	},
	destination: function (req, file, cb) {
		console.log('storage')
		cb(null, './uploads')
	},
})

const upload = multer({ storage })

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(cors(corsOptions))
app.use('/rasa', proxy('http://localhost:3001/'))

async function convert(path) {
	return new Promise(resolve => {
		ffmpeg(path)
			.toFormat('wav')
			.audioChannels(1)
			.withAudioFrequency(16000)
			.on('error', (err) => {
				console.log('An error occurred: ' + err.message);
			})
			.on('progress', (progress) => {
				console.log('Processing: ' + progress.targetSize + ' KB converted');
			})
			.on('end', () => {
				resolve('resolved')
				console.log('Processing finished !');
			})
			.save(path.slice(0, -4) + "wav")
	})
}

function interpret(path) {
	return new Promise(resolve => {
		let desiredSampleRate = 16000;

		let audioStream = new MemoryStream()
		var file = Fs.createReadStream(path)
		var reader = new wav.Reader()
		reader.pipe(audioStream)
		file.pipe(reader)

		let modelPath = './dist/deepspeech-0.9.3-models.pbmm';
		let scorerPath = './dist/deepspeech-0.9.3-models.scorer';
		let model = new DeepSpeech.Model(modelPath);
		model.enableExternalScorer(scorerPath);

		audioStream.on('finish', () => {
			let audioBuffer = audioStream.toBuffer();

			const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
			console.log('audio length', audioLength);

			let result = model.stt(audioBuffer);

			console.log('result:', result);
			resolve(result)
		})
	})
}

app.get('/test-deps', (req, res) => {
	let responseString = "Testing dependencies. <br/><br/>"

	function convert() {
		let track = './dist/test.webm';//your path to source file
		ffmpeg(track)
			.toFormat('wav')
			.audioChannels(1)
			.withAudioFrequency(16000)
			.on('error', (err) => {
				responseString += 'An error occurred: ' + err.message + "\n"
				console.log('An error occurred: ' + err.message);
			})
			.on('progress', (progress) => {
				responseString += 'Processing: ' + progress.targetSize + ' KB converted' + "<br/>"
				// console.log(JSON.stringify(progress));
				console.log('Processing: ' + progress.targetSize + ' KB converted');
			})
			.on('end', () => {
				responseString += 'Processing finished !' + "<br/><br/>"
				res.send(responseString)
				console.log('Processing finished !');
				interpret()
			})
			.save('./dist/test-converted.wav')
	}

	function interpret() {
		let desiredSampleRate = 16000;

		let audioStream = new MemoryStream()
		var file = Fs.createReadStream('./dist/test-converted.wav')
		var reader = new wav.Reader()
		reader.pipe(audioStream)
		file.pipe(reader)

		let modelPath = './dist/deepspeech-0.9.3-models.pbmm';
		let scorerPath = './dist/deepspeech-0.9.3-models.scorer';
		let model = new DeepSpeech.Model(modelPath);
		model.enableExternalScorer(scorerPath);

		audioStream.on('finish', () => {
			let audioBuffer = audioStream.toBuffer();

			const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
			console.log('audio length', audioLength);

			let result = model.stt(audioBuffer);

			console.log('result:', result);
		})
	}

	convert()
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/upload-speech', upload.single('upl'), async (req, res) => {
	console.log(req.file)
	const originalPath = "./uploads/" + req.file.originalname
	const convertedPath = originalPath.slice(0, -4) + "wav"

	await convert("./uploads/" + req.file.originalname)
	const result = await interpret(convertedPath)

	res.send({ message: 'Successfully uploaded files', result: result })
})

app.listen(port, () => {
	console.log(`Chat app listening on port ${port}`)
})
//