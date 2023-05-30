"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPatients = exports.fetchDiagnoses = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.fetchDiagnoses = router.get('/api/diagnoses', (_req, res) => {
    res.send('Fetching all diagnoses!');
});
exports.fetchPatients = router.get('/api/patients', (_req, res) => {
    res.send('Fetching all patients!');
});
exports.default = router;
