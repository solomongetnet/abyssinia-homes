"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const property_model_1 = __importDefault(require("../models/property.model"));
const users_model_1 = __importDefault(require("../models/users.model"));
const fetchDashboard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertiesCount = yield property_model_1.default.find().countDocuments();
    const adminsCount = yield users_model_1.default.find({
        role: "admin",
    }).countDocuments();
    const agentsCount = yield users_model_1.default.find({
        role: "agent",
    }).countDocuments();
    const usersCount = yield users_model_1.default.find({
        role: "user",
    }).countDocuments();
    res.json({
        propertiesCount,
        adminsCount,
        usersCount,
        agentsCount,
    });
}));
const propertiesAnalysis = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const analysis = yield property_model_1.default.aggregate([
        {
            $facet: {
                priceDistribution: [
                    {
                        $bucket: {
                            groupBy: "$price.amount",
                            boundaries: [
                                0, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
                                400000, 450000, 500000, 1000000,
                            ],
                            default: "500000+",
                            output: {
                                count: { $sum: 1 },
                            },
                        },
                    },
                ],
                propertyTypeDistribution: [
                    {
                        $group: {
                            _id: "$propertyType",
                            count: { $sum: 1 },
                        },
                    },
                ],
                propertyStatusDistribution: [
                    {
                        $group: {
                            _id: "$propertyStatus",
                            count: { $sum: 1 },
                        },
                    },
                ],
                locationDistribution: [
                    {
                        $group: {
                            _id: "$location.city",
                            count: { $sum: 1 },
                        },
                    },
                ],
            },
        },
    ]);
    const propertiesByMonth = yield property_model_1.default.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ]);
    // Initialize months array with 0 counts
    const months = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: 0,
    }));
    // Merge the aggregated results with the months array
    propertiesByMonth.forEach((item) => {
        months[item._id - 1].count = item.count;
    });
    res.json(Object.assign(Object.assign({}, analysis[0]), { propertiesByMonth: months }));
}));
const adminController = {
    fetchDashboard,
    propertiesAnalysis,
};
exports.default = adminController;
