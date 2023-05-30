"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const patientsRouter_1 = __importDefault(require("./routes/patientsRouter"));
const diagnosesRouter_1 = __importDefault(require("./routes/diagnosesRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.use('/api/patients', patientsRouter_1.default);
app.get('/api/ping', (_req, res) => {
    res.send('pong!');
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
