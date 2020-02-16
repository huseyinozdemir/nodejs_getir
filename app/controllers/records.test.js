const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const { postListRecords } = require('../controllers/records');


dotenv.config({ path: './app/config/config.env' });


describe ('The Records of Controllers', () => {
	let connection;

	beforeAll(async () => {
		connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});
	});

	afterAll(async () => {
		await connection.close();
	});

	it('If all things are well so the response should 200 and get record.', async () => {
		const res = {};
		res.send = jest.fn().mockReturnValue(res);
		res.status = jest.fn().mockReturnValue(res);
		res.json = jest.fn().mockReturnValue(res);

		const req = { 
			method: 'POST',
			body: { startDate: '2016-01-01', endDate: '2020-02-02', minCount: 1, maxCount: 1000}
		};

		const next = jest.fn();
		await postListRecords(req, res, next, async () => {
			console.log(next);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res._json.msg).toEqual('Success');
		});
	});

	it('If no records so the response should 404.', async () => {
		const res = {};
		res.send = jest.fn().mockReturnValue(res);
		res.status = jest.fn().mockReturnValue(res);
		res.json = jest.fn().mockReturnValue(res);

		const req = { 
			method: 'POST',
			body: { startDate: '2021-01-01', endDate: '2022-02-02', minCount: 1, maxCount: 1000}
		};

		const next = jest.fn();

		await postListRecords(req, res, next, async () => {
			expect(res.status).toHaveBeenCalledWith(404);
		});
	});
});
