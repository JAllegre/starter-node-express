"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const statusRoute_1 = __importDefault(require("./routes/statusRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use('/api/status/', statusRoute_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// Error management, MUST have 4 parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
    res.status(500);
    res.render('error', { error: err });
});
