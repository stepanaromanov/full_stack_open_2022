"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../data/patients"));
const patientsRouter = express_1.default.Router();
let patients = patients_1.default;
patientsRouter.get('/', (_req, res) => {
    res.send('Fetching all patients!');
    return patients;
});
patientsRouter.post('/', (_req, res) => {
    res.send('Saving a patient!');
});
exports.default = patientsRouter;
