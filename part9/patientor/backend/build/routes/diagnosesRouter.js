"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesRouter = express_1.default.Router();
diagnosesRouter.get('/', (_req, res) => {
    res.send('Fetching all diagnoses!');
});
diagnosesRouter.post('/', (_req, res) => {
    res.send('Saving a diagnose!');
});
exports.default = diagnosesRouter;
